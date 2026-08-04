"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";
type ContactResult = { message?: string; reference?: string };
type BriefSummary = { mission?: string; market?: string; location?: string; timing?: string; service?: string };

const serviceValues = ["Executive Protection","Airport & Crew Security","Secure Transportation","Corporate Security","Journey Management","Security Consulting","Multiple Services"];
function mapUrgency(value:string){const v=value.toLowerCase();if(v.includes("24")||v.includes("time-sensitive"))return "Urgent — within 24 hours";if(v.includes("72"))return "Within 72 hours";if(v.includes("7 day"))return "Within 7 days";return "Routine"}
function suggestedService(mission:string){const v=mission.toLowerCase();if(v.includes("crew")||v.includes("airport"))return "Airport & Crew Security";if(v.includes("executive")||v.includes("vip"))return "Executive Protection";if(v.includes("delegation"))return "Corporate Security";if(v.includes("energy")||v.includes("ngo"))return "Journey Management";return "Multiple Services"}

export default function ContactForm(){
  const [status,setStatus]=useState<FormStatus>("idle");
  const [message,setMessage]=useState("");
  const [reference,setReference]=useState("");
  const [submittedEmail,setSubmittedEmail]=useState("");
  const [copied,setCopied]=useState(false);
  const [brief,setBrief]=useState<BriefSummary>({});
  const startedAt=useRef(Date.now());
  const formRef=useRef<HTMLFormElement>(null);

  useEffect(()=>{
    const form=formRef.current;if(!form)return;
    const params=new URLSearchParams(window.location.search);
    const mission=params.get("mission")||params.get("scenario")||"";
    const market=params.get("market")||params.get("country")||"";
    const location=params.get("location")||params.get("city")||"";
    const timing=params.get("timing")||params.get("urgency")||"";
    const requestedService=params.get("service")||(mission?suggestedService(mission):"");
    const setValue=(name:string,value:string)=>{if(!value)return;const field=form.elements.namedItem(name) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|null;if(field)field.value=value};
    setValue("country",market);setValue("location",location);setValue("urgency",mapUrgency(timing));
    if(requestedService&&serviceValues.includes(requestedService))setValue("service",requestedService);
    if(mission||market||location||timing)setValue("requestType",timing.toLowerCase().includes("urgent")||timing.toLowerCase().includes("time-sensitive")?"Urgent operational review":"New security assignment");
    const details=form.elements.namedItem("details") as HTMLTextAreaElement|null;
    if(details&&!details.value&&(mission||market||location||timing))details.value=[mission&&`Mission: ${mission}`,market&&`Country / market: ${market}`,location&&`Location: ${location}`,timing&&`Timing: ${timing}`,"","Please add itinerary, dates, traveller profile, routes and any known constraints."].filter(Boolean).join("\n");
    setBrief({mission:mission||undefined,market:market||undefined,location:location||undefined,timing:timing||undefined,service:requestedService||undefined});
  },[]);

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(status==="sending")return;
    setStatus("sending");setMessage("");setReference("");setCopied(false);
    const form=event.currentTarget;const data=new FormData(form);const email=String(data.get("email")||"");
    const payload={...Object.fromEntries(data.entries()),startedAt:startedAt.current};
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const result=(await response.json()) as ContactResult;if(!response.ok)throw new Error(result.message||"Unable to send the request.");
      setSubmittedEmail(email);setStatus("success");setReference(result.reference||"");setMessage(result.message||"Your request has been sent to our operations team.");
      form.reset();startedAt.current=Date.now();window.scrollTo({top:form.getBoundingClientRect().top+window.scrollY-120,behavior:"smooth"});
    }catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"Unable to send the request.")}
  }

  async function copyReference(){if(!reference)return;try{await navigator.clipboard.writeText(reference);setCopied(true)}catch{setCopied(false)}}
  const hasBrief=Object.values(brief).some(Boolean);

  if(status==="success")return <section className="requestSuccess" role="status" aria-live="polite">
    <div className="requestSuccessMark" aria-hidden="true">✓</div>
    <p className="eyebrow">Request received</p>
    <h2>Your operational request is now under review.</h2>
    <p>{message}</p>
    <div className="requestSuccessReference"><span>Reference number</span><strong>{reference}</strong><button type="button" onClick={copyReference}>{copied?"Copied":"Copy"}</button></div>
    <div className="requestSuccessSteps">
      <article><span>01</span><div><h3>Initial review</h3><p>The information supplied is checked for scope, timing and location.</p></div></article>
      <article><span>02</span><div><h3>Clarification</h3><p>Our team may request additional itinerary or traveller details.</p></div></article>
      <article><span>03</span><div><h3>Confirmation</h3><p>Availability, lawful delivery, scope and commercial terms are confirmed separately.</p></div></article>
    </div>
    <p className="requestSuccessEmail">A confirmation has been sent to <strong>{submittedEmail}</strong>. Check spam or junk folders if it does not appear.</p>
    <div className="requestSuccessActions"><a className="button primary" href="/client-portal">Open client portal</a><a className="button secondary" href={`mailto:info@security-solutions.africa?subject=${encodeURIComponent(`Request ${reference}`)}`}>Email operations team</a><button type="button" className="textButton" onClick={()=>{setStatus("idle");setReference("");setSubmittedEmail("");setMessage("")}}>Submit another request</button></div>
    <p className="requestSuccessDisclaimer">Submission does not confirm deployment, response time or service availability.</p>
  </section>;

  return <form ref={formRef} className="contactForm" onSubmit={handleSubmit} noValidate={false}>
    {hasBrief&&<div className="prefilledBrief" role="status"><div><span>Prepared request</span><strong>Your selections have been transferred</strong></div><dl>{brief.mission&&<><dt>Mission</dt><dd>{brief.mission}</dd></>}{brief.market&&<><dt>Market</dt><dd>{brief.market}</dd></>}{brief.location&&<><dt>Location</dt><dd>{brief.location}</dd></>}{brief.timing&&<><dt>Timing</dt><dd>{brief.timing}</dd></>}{brief.service&&<><dt>Suggested service</dt><dd>{brief.service}</dd></>}</dl><p>Review and complete the remaining fields before submitting. No availability is confirmed at this stage.</p></div>}
    <p className="formSectionTitle">Contact details</p>
    <label><span>Name *</span><input name="name" required maxLength={100} autoComplete="name" /></label><label><span>Company / Organisation</span><input name="company" maxLength={120} autoComplete="organization" /></label><label><span>Business Email *</span><input type="email" name="email" required maxLength={160} autoComplete="email" /></label><label><span>Phone / WhatsApp</span><input name="phone" maxLength={50} autoComplete="tel" /></label>
    <p className="formSectionTitle">Operational requirement</p>
    <label><span>Request Type *</span><select name="requestType" required defaultValue=""><option value="" disabled>Select request type</option><option>New security assignment</option><option>Urgent operational review</option><option>Corporate consultation</option><option>Partnership enquiry</option><option>General enquiry</option></select></label><label><span>Urgency *</span><select name="urgency" required defaultValue="Routine"><option>Routine</option><option>Within 7 days</option><option>Within 72 hours</option><option>Urgent — within 24 hours</option></select></label>
    <label className="full"><span>Service *</span><select name="service" required defaultValue="Executive Protection">{serviceValues.map(value=><option key={value}>{value}</option>)}</select></label><label><span>Country *</span><input name="country" required maxLength={100} placeholder="e.g. Nigeria" autoComplete="country-name" /></label><label><span>City / Location *</span><input name="location" required maxLength={120} placeholder="e.g. Lagos" autoComplete="address-level2" /></label><label><span>Required Start Date</span><input type="date" name="date" /></label><label><span>Number of Travellers / Personnel</span><input type="number" name="people" min={1} max={10000} inputMode="numeric" /></label><label className="full"><span>Assignment Details *</span><textarea name="details" rows={8} required maxLength={5000} placeholder="Include itinerary, routes, arrival time, locations, traveller profile and any known constraints." /></label>
    <label className="consentLabel"><input type="checkbox" name="consent" value="yes" required /><span>I confirm that the information supplied may be processed to assess and respond to this request, in accordance with the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>. *</span></label><label className="formHoneypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary full" type="submit" disabled={status==="sending"}>{status==="sending"?"Sending Request…":"Submit Security Request"}</button>{message&&<p className={`formMessage ${status}`} role="status" aria-live="polite">{message}</p>}
  </form>;
}
