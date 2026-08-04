"use client";

import { FormEvent, useEffect, useState } from "react";

type TimelineEvent = {
  id: string;
  reference: string;
  event_type: string;
  author: string;
  details?: string;
  event_at: string;
  created_at: string;
};

const eventTypes = [
  "Assignment created",
  "Team assigned",
  "Vehicle dispatched",
  "Team arrived",
  "Operation started",
  "Checkpoint update",
  "Incident noted",
  "Operation completed",
  "Document uploaded",
  "General update",
];

function toLocalInput(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function OperationsTimeline({ reference, accessKey }: { reference: string; accessKey: string }) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [eventAt, setEventAt] = useState(toLocalInput());

  async function load() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/operations-dashboard/timeline?reference=${encodeURIComponent(reference)}`, {
        headers: { "x-operations-key": accessKey },
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to load timeline.");
      setEvents(result.events || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load timeline.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [reference, accessKey]);

  async function addEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/operations-dashboard/timeline", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-operations-key": accessKey },
        body: JSON.stringify({ reference, eventType: data.eventType, author: data.author, details: data.details, eventAt: data.eventAt }),
      });
      const result = await response.json();
      if (!response.ok || !result.event) throw new Error(result.message || "Unable to add timeline entry.");
      setEvents(current => [result.event, ...current].sort((a, b) => new Date(b.event_at).getTime() - new Date(a.event_at).getTime()));
      form.reset();
      setEventAt(toLocalInput());
      setMessage("Timeline entry added successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to add timeline entry.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this timeline entry?")) return;
    const response = await fetch(`/api/operations-dashboard/timeline?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-operations-key": accessKey },
    });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.message || "Unable to delete timeline entry.");
      return;
    }
    setEvents(current => current.filter(item => item.id !== id));
    setMessage("Timeline entry deleted.");
  }

  return <section className="operationsTimeline">
    <div className="timelineHeading">
      <div><p className="eyebrow">Internal activity log</p><h3>Operations Timeline</h3></div>
      <button type="button" onClick={load} disabled={loading}>{loading ? "Refreshing…" : "Refresh timeline"}</button>
    </div>

    <form className="timelineForm" onSubmit={addEvent}>
      <div className="timelineFormGrid">
        <label><span>Event type</span><select name="eventType" required>{eventTypes.map(type => <option key={type}>{type}</option>)}</select></label>
        <label><span>Event date and time</span><input name="eventAt" type="datetime-local" value={eventAt} onChange={e => setEventAt(e.target.value)} required /></label>
        <label><span>Recorded by</span><input name="author" placeholder="Name or Operations Team" /></label>
      </div>
      <label><span>Internal event details</span><textarea name="details" rows={3} placeholder="What happened, what was confirmed, or what action is required next?" /></label>
      <button className="button primary" disabled={saving}>{saving ? "Adding…" : "Add timeline entry"}</button>
    </form>

    {message && <p className={message.includes("successfully") || message.includes("deleted") ? "formMessage success" : "formMessage error"}>{message}</p>}

    <div className="timelineEntries">
      {events.map(item => <article key={item.id}>
        <i />
        <div className="timelineEntryBody">
          <div><span>{new Date(item.event_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span><button type="button" onClick={() => remove(item.id)}>Delete</button></div>
          <h4>{item.event_type}</h4>
          <small>Recorded by {item.author || "Operations Team"}</small>
          {item.details && <p>{item.details}</p>}
        </div>
      </article>)}
      {!loading && !events.length && <p className="timelineEmpty">No operational events have been recorded yet.</p>}
    </div>
  </section>;
}
