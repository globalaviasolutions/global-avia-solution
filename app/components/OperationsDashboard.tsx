"use client";

import { FormEvent, useMemo, useState } from "react";

type RequestRecord = {
  reference: string; email: string; name: string; company?: string; phone?: string; request_type: string;
  urgency: string; service: string; country: string; location: string; required_date?: string; people?: string;
  details: string; status: string; next_step: string; client_notes?: string; created_at: string; updated_at: string;
};

const statuses = ["Received", "Under Review", "Proposal Sent", "Confirmed", "Completed"];

export default function OperationsDashboard() {
  const [key, setKey] = useState("");
  const [requests, setRequests] = useState<RequestRecord[]>([]);
  const [selected, setSelected] = useState<RequestRecord | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadRequests(event?: FormEvent) {
    event?.preventDefault();
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/operations-dashboard", { headers: { "x-operations-key": key }, cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to load requests.");
      setRequests(result.requests || []);
      if (selected) setSelected((result.requests || []).find((item: RequestRecord) => item.reference === selected.reference) || null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load requests.");
    } finally { setLoading(false); }
  }

  async function saveRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true); setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/operations-dashboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-operations-key": key },
        body: JSON.stringify({ reference: selected.reference, status: data.status, nextStep: data.nextStep, clientNotes: data.clientNotes }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update request.");
      const updated = result.request as RequestRecord;
      setSelected(updated);
      setRequests(current => current.map(item => item.reference === updated.reference ? updated : item));
      setMessage("Request updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update request.");
    } finally { setSaving(false); }
  }

  const filtered = useMemo(() => requests.filter(item => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const haystack = `${item.reference} ${item.name} ${item.company || ""} ${item.email} ${item.service} ${item.country} ${item.location}`.toLowerCase();
    return matchesStatus && haystack.includes(query.toLowerCase());
  }), [requests, query, statusFilter]);

  const counts = useMemo(() => statuses.map(status => ({ status, count: requests.filter(item => item.status === status).length })), [requests]);

  if (!requests.length) return <section className="opsAdminLogin">
    <div><p className="eyebrow">Internal operations</p><h1>Operations Dashboard</h1><p>Enter the private dashboard key configured in Vercel. The key remains in this browser session only.</p></div>
    <form onSubmit={loadRequests}><label><span>Operations access key</span><input type="password" value={key} onChange={event => setKey(event.target.value)} required autoComplete="current-password" /></label><button className="button primary" disabled={loading}>{loading ? "Connecting…" : "Open dashboard"}</button>{message && <p className="formMessage error">{message}</p>}</form>
  </section>;

  return <section className="opsAdminShell">
    <header className="opsAdminHeader"><div><p className="eyebrow">Internal operations</p><h1>Request Management</h1></div><div><button type="button" onClick={() => loadRequests()} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button><button type="button" onClick={() => { setRequests([]); setSelected(null); setKey(""); }}>Lock dashboard</button></div></header>

    <div className="opsAdminStats">{counts.map(item => <article key={item.status}><span>{item.status}</span><strong>{item.count}</strong></article>)}</div>

    <div className="opsAdminWorkspace">
      <aside className="opsAdminList">
        <div className="opsAdminFilters"><input placeholder="Search reference, client or location" value={query} onChange={event => setQuery(event.target.value)} /><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}><option>All</option>{statuses.map(status => <option key={status}>{status}</option>)}</select></div>
        <div className="opsAdminRows">{filtered.map(item => <button type="button" className={selected?.reference === item.reference ? "active" : ""} onClick={() => setSelected(item)} key={item.reference}><div><strong>{item.reference}</strong><span>{item.name}{item.company ? ` · ${item.company}` : ""}</span></div><div><b>{item.status}</b><small>{item.location}, {item.country}</small></div></button>)}{!filtered.length && <p className="opsAdminEmpty">No requests match the current filters.</p>}</div>
      </aside>

      <main className="opsAdminDetail">
        {!selected ? <div className="opsAdminPlaceholder"><p className="eyebrow">Request detail</p><h2>Select a request</h2><p>Choose an item from the list to review its details and update the client-visible status.</p></div> : <form onSubmit={saveRequest}>
          <div className="opsAdminTitle"><div><span>Reference</span><h2>{selected.reference}</h2></div><b>{selected.urgency}</b></div>
          <div className="opsAdminMeta"><article><span>Client</span><strong>{selected.name}</strong><small>{selected.company || "No company provided"}</small></article><article><span>Contact</span><strong>{selected.email}</strong><small>{selected.phone || "No phone provided"}</small></article><article><span>Service</span><strong>{selected.service}</strong><small>{selected.request_type}</small></article><article><span>Location</span><strong>{selected.location}, {selected.country}</strong><small>{selected.required_date || "Date not specified"}</small></article></div>
          <div className="opsAdminDetails"><span>Assignment details</span><p>{selected.details}</p></div>
          <label><span>Client-visible status</span><select name="status" defaultValue={selected.status} key={`${selected.reference}-status`}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label>
          <label><span>Next step shown in Client Portal</span><textarea name="nextStep" rows={4} defaultValue={selected.next_step} key={`${selected.reference}-next`} /></label>
          <label><span>Client-visible notes</span><textarea name="clientNotes" rows={5} defaultValue={selected.client_notes || ""} key={`${selected.reference}-notes`} placeholder="Optional update visible in the client portal." /></label>
          <div className="opsAdminActions"><button className="button primary" disabled={saving}>{saving ? "Saving…" : "Save status update"}</button><a className="button secondary" href={`mailto:${selected.email}?subject=${encodeURIComponent(selected.reference + " — Africa Security Solutions")}`}>Email client</a></div>
          {message && <p className={`formMessage ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
        </form>}
      </main>
    </div>
  </section>;
}
