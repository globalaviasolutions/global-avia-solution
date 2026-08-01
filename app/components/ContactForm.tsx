"use client";

import { FormEvent, useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

type ContactResult = {
  message?: string;
  reference?: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const startedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");
    setReference("");

    const form = event.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResult;
      if (!response.ok) throw new Error(result.message || "Unable to send the request.");

      form.reset();
      startedAt.current = Date.now();
      setStatus("success");
      setReference(result.reference || "");
      setMessage(result.message || "Thank you. Your request has been sent to our operations team.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send the request.");
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit} noValidate={false}>
      <p className="formSectionTitle">Contact details</p>
      <label><span>Name *</span><input name="name" required maxLength={100} autoComplete="name" /></label>
      <label><span>Company / Organisation</span><input name="company" maxLength={120} autoComplete="organization" /></label>
      <label><span>Business Email *</span><input type="email" name="email" required maxLength={160} autoComplete="email" /></label>
      <label><span>Phone / WhatsApp</span><input name="phone" maxLength={50} autoComplete="tel" /></label>

      <p className="formSectionTitle">Operational requirement</p>
      <label><span>Request Type *</span><select name="requestType" required defaultValue=""><option value="" disabled>Select request type</option><option>New security assignment</option><option>Urgent operational review</option><option>Corporate consultation</option><option>Partnership enquiry</option><option>General enquiry</option></select></label>
      <label><span>Urgency *</span><select name="urgency" required defaultValue="Routine"><option>Routine</option><option>Within 7 days</option><option>Within 72 hours</option><option>Urgent — within 24 hours</option></select></label>
      <label className="full"><span>Service *</span><select name="service" required><option>Executive Protection</option><option>Airport & Crew Security</option><option>Secure Transportation</option><option>Corporate Security</option><option>Journey Management</option><option>Security Consulting</option><option>Multiple Services</option></select></label>
      <label><span>Country *</span><input name="country" required maxLength={100} placeholder="e.g. Nigeria" autoComplete="country-name" /></label>
      <label><span>City / Location *</span><input name="location" required maxLength={120} placeholder="e.g. Lagos" autoComplete="address-level2" /></label>
      <label><span>Required Start Date</span><input type="date" name="date" /></label>
      <label><span>Number of Travellers / Personnel</span><input type="number" name="people" min={1} max={10000} inputMode="numeric" /></label>
      <label className="full"><span>Assignment Details *</span><textarea name="details" rows={8} required maxLength={5000} placeholder="Include itinerary, routes, arrival time, locations, traveller profile and any known constraints." /></label>

      <label className="consentLabel">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I confirm that the information supplied may be processed to assess and respond to this request, in accordance with the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>. *</span>
      </label>

      <label className="formHoneypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button primary full" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending Request…" : "Submit Security Request"}</button>
      {reference && <div className="requestReference" role="status"><strong>Request received</strong><span>Your reference number is </span><code>{reference}</code></div>}
      {message && <p className={`formMessage ${status}`} role="status" aria-live="polite">{message}</p>}
    </form>
  );
}
