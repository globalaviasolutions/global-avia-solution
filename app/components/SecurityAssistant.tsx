"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "Executive Protection",
  "Airport & Crew Security",
  "Secure Transportation",
  "Journey Management",
  "Request a quotation",
];

const welcome: Message = {
  role: "assistant",
  content: "Welcome to Africa Security Solutions. I can explain our services, help structure an operational request, or direct you to the right team. What support do you need?",
};

export default function SecurityAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, sending]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || sending) return;
    const next = [...messages, { role: "user" as const, content: value }].slice(-10);
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/security-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await response.json()) as { reply?: string; message?: string };
      if (!response.ok) throw new Error(data.message || "Assistant unavailable.");
      setMessages((current) => [...current, { role: "assistant", content: data.reply || "Please contact our operations team." }]);
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        content: "The AI assistant is temporarily unavailable. Please use the request form or email info@security-solutions.africa.",
      }]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  return <div className={`securityAssistant ${open ? "assistantOpen" : ""}`}>
    {open && <section className="assistantPanel" aria-label="AI Security Assistant">
      <header>
        <div><span className="assistantStatus"/><strong>AI Security Assistant</strong><small>Planning guidance · Not an emergency service</small></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
      </header>
      <div className="assistantMessages" aria-live="polite">
        {messages.map((message, index) => <div className={`assistantMessage ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}
        {sending && <div className="assistantMessage assistant assistantTyping">Thinking…</div>}
        <div ref={endRef}/>
      </div>
      {messages.length < 3 && <div className="assistantQuickPrompts">{quickPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => void send(prompt)}>{prompt}</button>)}</div>}
      <form onSubmit={submit} className="assistantComposer">
        <textarea value={input} onChange={(event) => setInput(event.target.value)} maxLength={1000} rows={2} placeholder="Describe the city, date and support required…" aria-label="Message"/>
        <button type="submit" disabled={sending || !input.trim()}>Send</button>
      </form>
      <footer><a href="/contact">Submit a formal request</a><span>·</span><a href="/emergency-response">Urgent guidance</a></footer>
    </section>}
    <button className="assistantLauncher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Open AI Security Assistant"><span>AI</span><b>{open ? "Close" : "Security Assistant"}</b></button>
  </div>;
}
