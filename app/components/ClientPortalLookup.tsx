"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type HistoryEvent={status:string;next_step?:string;client_note?:string;event_type:string;created_at:string};
type RequestRecord={reference:string;status:string;service:string;urgency:string;country:string;location:string;requiredDate?:string;people?:string;createdAt:string;updatedAt:string;nextStep:string;notes?:string;history?:HistoryEvent[]};
type PortalTab="overview"|"messages"|"documents"|"invoices";

const stages=["Received","Under Review","Proposal Sent","Confirmed","Team Assigned","Operation Active","Completed"];
const stageCopy:Record<string,string>={
  "Received":"Your request has been recorded for initial review.",
  "Under Review":"The operations team is assessing scope, timing and feasibility.",
  "Proposal Sent":"A proposed scope or clarification has been issued for review.",
  "Confirmed":"The agreed assignment has been confirmed in writing.",
  "Team Assigned":"An operational team has been assigned and mobilisation is being coordinated.",
  "Operation Active":"The confirmed assignment is currently active.",
  "Completed":"The request is marked complete. Further work requires a new brief."
};

export default function ClientPortalLookup(){
  const [record,setRecord]=useState<RequestRecord|null>(null);
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const [tab,setTab]=useState<PortalTab>("overview");
  const [reference,setReference]=useState("");
  const [email,setEmail]=useState("");

  useEffect(()=>{const params=new URLSearchParams(window.location.search);setReference(params.get("reference")||"");setEmail(params.get("email")||"");},[]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setLoading(true);setMessage("");setRecord(null);setTab("overview");
    const data=Object.fromEntries(new FormData(e.currentTarget).entries());
    try{const res=await fetch("/api/client-portal/status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const json=await res.json();if(!res.ok)throw new Error(json.message||"Unable to retrieve the request.");setRecord(json.request);}catch(err){setMessage(err instanceof Error?err.message:"Unable to retrieve the request.");}finally{setLoading(false);}
  }

  const active=record?Math.max(0,stages.indexOf(record.status)):0;
  const mailHref=useMemo(()=>record?`mailto:info@security-solutions.africa?subject=${encodeURIComponent(record.reference+" — Client portal message")}&body=${encodeURIComponent("Reference: "+record.reference+"\n\nPlease add your message below:\n")}`:"#",[record]);
  const stageTime=(stage:string)=>record?.history?.find(event=>event.status===stage)?.created_at;
  function signOut(){setRecord(null);setMessage("");setTab("overview");}

  return <div className="portalShell">
    <form className="portalLogin" onSubmit={submit}><p className="eyebrow">Secure request lookup</p><h2>Access your request.</h2><label><span>Reference number</span><input name="reference" value={reference} onChange={e=>setReference(e.target.value.toUpperCase())} placeholder="ASS-20260802-A1B2C3" required maxLength={40} autoComplete="off"/></label><label><span>Email used in the request</span><input name="email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required maxLength={160} autoComplete="email"/></label><button className="button primary" disabled={loading}>{loading?"Checking…":"View request dashboard"}</button><p className="portalPrivacy">Both fields must match the original request. The portal deliberately excludes sensitive operational instructions, routes and personal identity documents.</p>{message&&<p className="formMessage error" role="alert">{message}</p>}</form>

    {record&&<section className="portalDashboard portalDashboardV2" aria-live="polite">
      <div className="portalTop"><div><span>Request reference</span><h2>{record.reference}</h2><small>Last updated {new Date(record.updatedAt).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"})}</small></div><div className="portalTopActions"><strong>{record.status}</strong><button type="button" onClick={signOut}>Close dashboard</button></div></div>
      <nav className="portalTabs" aria-label="Request dashboard sections">{(["overview","messages","documents","invoices"] as PortalTab[]).map(item=><button type="button" key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item[0].toUpperCase()+item.slice(1)}</button>)}</nav>

      {tab==="overview"&&<div className="portalTabPanel">
        <div className="portalStatusSummary"><span>Current stage</span><h3>{record.status}</h3><p>{stageCopy[record.status]||"Your request is being managed according to the latest confirmed status."}</p></div>
        <div className="portalTimeline" aria-label="Request progress">{stages.map((stage,index)=>{const state=index<active?"completed":index===active?"current":"upcoming";const time=stageTime(stage);return <div className={state} key={stage} title={time?`${stage}: ${new Date(time).toLocaleString("en-GB")}`:stage}><i aria-hidden="true">{index<active?"✓":""}</i><span>{stage}</span>{time&&<small>{new Date(time).toLocaleDateString("en-GB",{day:"2-digit",month:"short"})}</small>}</div>})}</div>
        <div className="portalCards"><article><span>Service</span><strong>{record.service}</strong></article><article><span>Urgency</span><strong>{record.urgency}</strong></article><article><span>Location</span><strong>{record.location}, {record.country}</strong></article><article><span>Required date</span><strong>{record.requiredDate||"To be confirmed"}</strong></article><article><span>Personnel</span><strong>{record.people||"Not specified"}</strong></article><article><span>Submitted</span><strong>{new Date(record.createdAt).toLocaleDateString("en-GB")}</strong></article></div>
        <div className="portalNext"><p className="eyebrow">Next step</p><h3>{record.nextStep}</h3>{record.notes&&<p>{record.notes}</p>}<a href={mailHref}>Contact operations about this request →</a></div>
        <div className="portalHistory"><p className="eyebrow">Request history</p><h3>Recorded updates</h3>{record.history?.length?<div>{record.history.map((event,index)=><article key={`${event.created_at}-${index}`}><i/><div><span>{new Date(event.created_at).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"})}</span><strong>{event.event_type}: {event.status}</strong>{event.next_step&&<p>{event.next_step}</p>}{event.client_note&&<small>{event.client_note}</small>}</div></article>)}</div>:<p className="portalHistoryEmpty">No additional updates have been recorded yet.</p>}</div>
      </div>}

      {tab==="messages"&&<div className="portalTabPanel portalEmptyState"><span>Secure communications</span><h3>Continue the conversation by email.</h3><p>For this MVP, messages are exchanged through the verified email address used for the request. Always keep the reference number in the subject line.</p><a className="button primary" href={mailHref}>Message Operations Team</a><small>Do not send card details, passwords or unnecessary identity documents.</small></div>}
      {tab==="documents"&&<div className="portalTabPanel portalEmptyState"><span>Documents</span><h3>No portal documents are available yet.</h3><p>Proposals, scopes and operational documents will only appear here after a secure document workflow is activated and your request reaches the appropriate stage.</p><a className="button secondary" href={mailHref}>Ask about a document</a></div>}
      {tab==="invoices"&&<div className="portalTabPanel portalEmptyState"><span>Invoices</span><h3>No invoice has been issued in the portal.</h3><p>Payment information will never be created automatically from an enquiry. Any commercial terms must be confirmed separately through an authorised company communication.</p><a className="button secondary" href={mailHref}>Contact Accounts / Operations</a></div>}
    </section>}
  </div>;
}
