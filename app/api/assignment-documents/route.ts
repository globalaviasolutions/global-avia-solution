import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const BUCKET = "assignment-documents";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function authorised(request: Request) {
  const expected = process.env.OPERATIONS_DASHBOARD_KEY;
  const supplied = request.headers.get("x-operations-key") || "";
  return Boolean(expected && supplied && supplied === expected);
}

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

function clean(value: unknown, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}

function headers(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

function safeFileName(name: string) {
  const normalized = name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-");
  return normalized.replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 120) || "document";
}

async function signedUrl(url: string, key: string, path: string) {
  const response = await fetch(`${url}/storage/v1/object/sign/${BUCKET}/${encodeURI(path)}`, {
    method: "POST",
    headers: { ...headers(key), "Content-Type": "application/json" },
    body: JSON.stringify({ expiresIn: 900 }),
    cache: "no-store",
  });
  if (!response.ok) return "";
  const result = await response.json();
  const signed = String(result.signedURL || result.signedUrl || "");
  return signed ? `${url}/storage/v1${signed}` : "";
}

export async function GET(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const cfg = config();
  if (!cfg) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });
  const reference = clean(new URL(request.url).searchParams.get("reference"), 60);
  if (!reference) return NextResponse.json({ message: "Reference is required." }, { status: 400 });

  const response = await fetch(
    `${cfg.url}/rest/v1/assignment_documents?reference=eq.${encodeURIComponent(reference)}&select=*&order=created_at.desc`,
    { headers: headers(cfg.key), cache: "no-store" },
  );
  if (!response.ok) return NextResponse.json({ message: "Unable to load documents." }, { status: 502 });
  const documents = await response.json();
  const enriched = await Promise.all(documents.map(async (item: Record<string, unknown>) => ({
    ...item,
    download_url: await signedUrl(cfg.url, cfg.key, String(item.storage_path || "")),
  })));
  return NextResponse.json({ documents: enriched });
}

export async function POST(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const cfg = config();
  if (!cfg) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });

  const form = await request.formData();
  const reference = clean(form.get("reference"), 60);
  const category = clean(form.get("category"), 80) || "Other";
  const clientVisible = clean(form.get("clientVisible"), 10) === "yes";
  const file = form.get("file");
  if (!reference || !(file instanceof File)) return NextResponse.json({ message: "Reference and file are required." }, { status: 400 });
  if (!file.size || file.size > MAX_FILE_SIZE) return NextResponse.json({ message: "File must be smaller than 10 MB." }, { status: 400 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ message: "Unsupported file type." }, { status: 400 });

  const fileName = safeFileName(file.name);
  const storagePath = `${reference}/${Date.now()}-${randomUUID().slice(0, 8)}-${fileName}`;
  const upload = await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${encodeURI(storagePath)}`, {
    method: "POST",
    headers: { ...headers(cfg.key), "Content-Type": file.type, "x-upsert": "false" },
    body: await file.arrayBuffer(),
  });
  if (!upload.ok) return NextResponse.json({ message: "Unable to upload the document." }, { status: 502 });

  const metadata = {
    reference,
    file_name: file.name.slice(0, 255),
    storage_path: storagePath,
    file_type: file.type,
    file_size: file.size,
    category,
    client_visible: clientVisible,
  };
  const insert = await fetch(`${cfg.url}/rest/v1/assignment_documents`, {
    method: "POST",
    headers: { ...headers(cfg.key), "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify(metadata),
  });
  if (!insert.ok) {
    await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${encodeURI(storagePath)}`, { method: "DELETE", headers: headers(cfg.key) });
    return NextResponse.json({ message: "Unable to save document metadata." }, { status: 502 });
  }
  const document = (await insert.json())[0];
  return NextResponse.json({ document: { ...document, download_url: await signedUrl(cfg.url, cfg.key, storagePath) } });
}

export async function DELETE(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const cfg = config();
  if (!cfg) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });
  const id = clean(new URL(request.url).searchParams.get("id"), 80);
  if (!id) return NextResponse.json({ message: "Document ID is required." }, { status: 400 });

  const lookup = await fetch(`${cfg.url}/rest/v1/assignment_documents?id=eq.${encodeURIComponent(id)}&select=storage_path&limit=1`, {
    headers: headers(cfg.key), cache: "no-store",
  });
  if (!lookup.ok) return NextResponse.json({ message: "Unable to find the document." }, { status: 502 });
  const record = (await lookup.json())[0];
  if (!record) return NextResponse.json({ message: "Document not found." }, { status: 404 });

  const removeObject = await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${encodeURI(record.storage_path)}`, {
    method: "DELETE", headers: headers(cfg.key),
  });
  if (!removeObject.ok) return NextResponse.json({ message: "Unable to remove the stored file." }, { status: 502 });

  const removeRow = await fetch(`${cfg.url}/rest/v1/assignment_documents?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE", headers: { ...headers(cfg.key), Prefer: "return=minimal" },
  });
  if (!removeRow.ok) return NextResponse.json({ message: "Stored file removed, but metadata cleanup failed." }, { status: 502 });
  return NextResponse.json({ deleted: true });
}
