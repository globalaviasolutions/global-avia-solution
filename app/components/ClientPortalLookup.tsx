"use client";

import { FormEvent, useState } from "react";

type RequestRecord = {
  reference: string; status: string; service: string; urgency: string; country: string; location: string;
  requiredDate?: string; people?: string; createdAt: string; updatedAt: string; nextStep: string; notes?: string;
};

const stages=["Received","Under Review","Proposal Sent","Confirmed","Completed"];

export default function ClientPortalLookup(){
  const [record,setRecord]=useState<RequestRecord|null>(null);
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setLoading(true); setMessage(""); setRecord(null);
    const data=Object.fromEntries(new FormData(e.currentTarget).entries());
    try{
      const res=await fetch("/api/client-portal/status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      const json=await res.json(); if(!res.ok) throw new Error(json.message||"Unable to retrieve the request.");
      setRecord(json.request);
    }catch(err){setMessage(err instanceof Error?err.message:"Unable to retrieve the request.");}
    finally{setLoading(false);}
  }
  const active=record?Math.max(0,stages.indexOf(record.status)):0;
  return <div className="portalShell">
    <form className="portalLogin" onSubmit={submit}>
      <p className="eyebrow">Secure request lookup</p><h2>Access your request.</h2>
      <label><span>Reference number</span><input name="reference" placeholder="ASS-20260802-A1B2C3" required maxLength={40}/></label>
      <label><span>Email used in the request</span><input name="email" type="email" required maxLength={160}/></label>
      <button className="button primary" disabled={loading}>{loading?"Checking…":"View request status"}</button>
      <p className="portalPrivacy">Both fields must match the original request. No operationally sensitive information is displayed.</p>
      {message&&<p className="formMessage error" role="alert">{message}</p>}
    </form>
    {record&&<section className="portalDashboard" aria-live="polite">
      <div className="portalTop"><div><span>Request reference</span><h2>{record.reference}</h2></div><strong>{record.status}</strong></div>
      <div className="portalTimeline">{stages.map((s,i)=><div className={i<=active?"complete":""} key={s}><i/><span>{s}</span></div>)}</div>
      <div className="portalCards">
        <article><span>Service</span><strong>{record.service}</strong></article><article><span>Urgency</span><strong>{record.urgency}</strong></article>
        <article><span>Location</span><strong>{record.location}, {record.country}</strong></article><article><span>Required date</span><strong>{record.requiredDate||"To be confirmed"}</strong></article>
        <article><span>Personnel</span><strong>{record.people||"Not specified"}</strong></article><article><span>Last updated</span><strong>{new Date(record.updatedAt).toLocaleDateString("en-GB")}</strong></article>
      </div>
      <div className="portalNext"><p className="eyebrow">Next step</p><h3>{record.nextStep}</h3>{record.notes&&<p>{record.notes}</p>}<a href={`mailto:info@security-solutions.africa?subject=${encodeURIComponent(record.reference)}`}>Contact operations about this request →</a></div>
    </section>}
  </div>;
}
