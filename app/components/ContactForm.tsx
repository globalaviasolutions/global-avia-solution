"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send the request.");

      form.reset();
      setStatus("success");
      setMessage("Thank you. Your request has been sent to our operations team.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send the request.");
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <label><span>Name *</span><input name="name" required maxLength={100} /></label>
      <label><span>Company</span><input name="company" maxLength={120} /></label>
      <label><span>Email *</span><input type="email" name="email" required maxLength={160} /></label>
      <label><span>Phone / WhatsApp</span><input name="phone" maxLength={50} /></label>
      <label className="full"><span>Service</span><select name="service"><option>Executive Protection</option><option>Airport & Crew Security</option><option>Secure Transportation</option><option>Corporate Security</option><option>Journey Management</option><option>Security Consulting</option></select></label>
      <label><span>City / Location</span><input name="location" maxLength={120} /></label>
      <label><span>Required Date</span><input type="date" name="date" /></label>
      <label className="full"><span>Assignment Details *</span><textarea name="details" rows={7} required maxLength={5000} /></label>
      <label className="formHoneypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button primary full" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending Request…" : "Send Security Request"}</button>
      {message && <p className={`formMessage ${status}`} role="status">{message}</p>}
    </form>
  );
}
