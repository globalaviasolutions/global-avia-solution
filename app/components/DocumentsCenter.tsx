"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type DocumentRecord = {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  category: string;
  client_visible: boolean;
  created_at: string;
  download_url?: string;
};

const categories = ["Proposal", "Contract", "NDA", "Risk Assessment", "Flight / Travel", "Identity Document", "Invoice", "Photograph", "Other"];

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsCenter({ reference, accessKey }: { reference: string; accessKey: string }) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function loadDocuments() {
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`/api/assignment-documents?reference=${encodeURIComponent(reference)}`, {
        headers: { "x-operations-key": accessKey }, cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to load documents.");
      setDocuments(result.documents || []);
    } catch (cause) {
      setError(true); setMessage(cause instanceof Error ? cause.message : "Unable to load documents.");
    } finally { setLoading(false); }
  }

  useEffect(() => { loadDocuments(); }, [reference]);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");
    if (!(file instanceof File) || !file.size) return;
    data.set("reference", reference);
    setUploading(true); setMessage(""); setError(false);
    try {
      const response = await fetch("/api/assignment-documents", {
        method: "POST", headers: { "x-operations-key": accessKey }, body: data,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to upload document.");
      setDocuments(current => [result.document, ...current]);
      setMessage("Document uploaded securely.");
      form.reset();
    } catch (cause) {
      setError(true); setMessage(cause instanceof Error ? cause.message : "Unable to upload document.");
    } finally { setUploading(false); }
  }

  async function remove(id: string, fileName: string) {
    if (!window.confirm(`Delete ${fileName}? This cannot be undone.`)) return;
    setMessage(""); setError(false);
    try {
      const response = await fetch(`/api/assignment-documents?id=${encodeURIComponent(id)}`, {
        method: "DELETE", headers: { "x-operations-key": accessKey },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to delete document.");
      setDocuments(current => current.filter(item => item.id !== id));
      setMessage("Document deleted.");
    } catch (cause) {
      setError(true); setMessage(cause instanceof Error ? cause.message : "Unable to delete document.");
    }
  }

  return <section className="documentsCenter">
    <div className="documentsHeader">
      <div><p className="eyebrow">Secure file workspace</p><h3>Documents Center</h3><p>Internal files are stored in a private Supabase bucket. Download links expire after 15 minutes.</p></div>
      <strong>{documents.length} file{documents.length === 1 ? "" : "s"}</strong>
    </div>

    <form className="documentsUpload" onSubmit={upload}>
      <label className="documentsDrop" onDragOver={event => event.preventDefault()} onDrop={event => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && inputRef.current) {
          const transfer = new DataTransfer(); transfer.items.add(file); inputRef.current.files = transfer.files;
        }
      }}>
        <input ref={inputRef} name="file" type="file" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" />
        <span>Drop a document here or click to select</span>
        <small>PDF, DOC, DOCX, JPG, PNG or WEBP · maximum 10 MB</small>
      </label>
      <div className="documentsOptions">
        <label><span>Category</span><select name="category" defaultValue="Other">{categories.map(category => <option key={category}>{category}</option>)}</select></label>
        <label className="documentsVisible"><input type="checkbox" name="clientVisible" value="yes"/><span><strong>Client-visible later</strong><small>Marks the file for a future Client Portal document release workflow.</small></span></label>
        <button className="button primary" disabled={uploading}>{uploading ? "Uploading…" : "Upload document"}</button>
      </div>
    </form>

    {message && <p className={`formMessage ${error ? "error" : "success"}`}>{message}</p>}
    {loading ? <p className="documentsEmpty">Loading documents…</p> : documents.length ? <div className="documentsList">
      {documents.map(document => <article key={document.id}>
        <div className="documentIcon">{document.file_type.includes("pdf") ? "PDF" : document.file_type.includes("image") ? "IMG" : "DOC"}</div>
        <div className="documentInfo"><strong>{document.file_name}</strong><span>{document.category} · {formatBytes(document.file_size)} · {new Date(document.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>{document.client_visible && <small>Marked for client visibility</small>}</div>
        <div className="documentActions">{document.download_url && <a href={document.download_url} target="_blank" rel="noreferrer">Download</a>}<button type="button" onClick={() => remove(document.id, document.file_name)}>Delete</button></div>
      </article>)}
    </div> : <p className="documentsEmpty">No documents have been uploaded for this assignment.</p>}
  </section>;
}
