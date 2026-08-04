"use client";

import { FormEvent, useEffect, useState } from "react";
import DocumentsCenter from "./DocumentsCenter";
import OperationsTimeline from "./OperationsTimeline";
import TeamManagement from "./TeamManagement";
import ContractorDispatch from "./ContractorDispatch";

type Assignment={
  reference:string;operation_name?:string;team_leader?:string;team_members?:string;vehicles?:string;
  start_at?:string;end_at?:string;meeting_point?:string;emergency_contact?:string;internal_notes?:string;
};

type Props={reference:string;accessKey:string;status:string;service:string;country:string;location:string;requiredDate?:string;people?:string;urgency:string};
export default function AssignmentManager({reference,accessKey,status,service,country,location,requiredDate,people,urgency}:Props){
  const [assignment,setAssignment]=useState<Assignment|null>(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    let cancelled=false;
    setLoading(true);setMessage("");
    fetch(`/api/operations-dashboard/assignment?reference=${encodeURIComponent(reference)}`,{headers:{"x-operations-key":accessKey},cache:"no-store"})
      .then(async response=>{const result=await response.json();if(!response.ok)throw new Error(result.message||"Unable to load assignment.");return result.assignment;})
      .then(result=>{if(!cancelled)setAssignment(result||{reference});})
      .catch(error=>{if(!cancelled)setMessage(error instanceof Error?error.message:"Unable to load assignment.");})
      .finally(()=>{if(!cancelled)setLoading(false);});
    return()=>{cancelled=true};
  },[reference,accessKey]);

  async function save(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setSaving(true);setMessage("");
    const data=Object.fromEntries(new FormData(event.currentTarget).entries());
    try{
      const response=await fetch("/api/operations-dashboard/assignment",{method:"PUT",headers:{"Content-Type":"application/json","x-operations-key":accessKey},body:JSON.stringify({reference,...data})});
      const result=await response.json();if(!response.ok)throw new Error(result.message||"Unable to save assignment.");
      setAssignment(result.assignment);setMessage("Assignment details saved successfully.");
    }catch(error){setMessage(error instanceof Error?error.message:"Unable to save assignment.");}
    finally{setSaving(false);}
  }

  if(loading)return <section className="assignmentManager assignmentLoading">Loading assignment manager…</section>;
  const enabled=["Confirmed","Team Assigned","Operation Active","Completed"].includes(status);
  return <>
    <section className="assignmentManager">
      <div className="assignmentHeading"><div><p className="eyebrow">Internal assignment</p><h3>Assignment Manager</h3></div><span>{enabled?"Operational planning enabled":"Available after confirmation"}</span></div>
      {!enabled&&<p className="assignmentNotice">You can prepare the assignment now, but operational mobilisation should only begin after written confirmation.</p>}
      <form onSubmit={save} key={`${reference}-${assignment?.reference||"new"}`}>
        <div className="assignmentGrid">
          <label><span>Operation name</span><input name="operationName" defaultValue={assignment?.operation_name||""} placeholder="e.g. Tallinn Executive Visit"/></label>
          <label><span>Team leader</span><input name="teamLeader" defaultValue={assignment?.team_leader||""} placeholder="Name and contact"/></label>
          <label><span>Start date and time</span><input name="startAt" type="datetime-local" defaultValue={assignment?.start_at?.slice(0,16)||""}/></label>
          <label><span>End date and time</span><input name="endAt" type="datetime-local" defaultValue={assignment?.end_at?.slice(0,16)||""}/></label>
        </div>
        <label><span>Assigned team summary</span><textarea name="teamMembers" rows={4} defaultValue={assignment?.team_members||""} placeholder="Optional manual summary. Use Team Management below for structured assignments."/></label>
        <label><span>Vehicles / transport</span><textarea name="vehicles" rows={3} defaultValue={assignment?.vehicles||""} placeholder="Vehicle, driver, registration or supplier reference"/></label>
        <div className="assignmentGrid">
          <label><span>Meeting point</span><textarea name="meetingPoint" rows={3} defaultValue={assignment?.meeting_point||""}/></label>
          <label><span>Emergency contact</span><textarea name="emergencyContact" rows={3} defaultValue={assignment?.emergency_contact||""}/></label>
        </div>
        <label><span>Internal notes — never shown to client</span><textarea name="internalNotes" rows={5} defaultValue={assignment?.internal_notes||""} placeholder="Internal coordination notes, supplier confirmations and operational reminders."/></label>
        <div className="assignmentActions"><button className="button primary" disabled={saving}>{saving?"Saving…":"Save assignment"}</button><small>Assignment data is internal and separate from client-visible notes.</small></div>
        {message&&<p className={message.includes("successfully")?"formMessage success":"formMessage error"}>{message}</p>}
      </form>
    </section>
    <TeamManagement reference={reference} accessKey={accessKey}/>
    <ContractorDispatch reference={reference} accessKey={accessKey} service={service} country={country} location={location} requiredDate={requiredDate} people={people} urgency={urgency}/>
    <DocumentsCenter reference={reference} accessKey={accessKey}/>
    <OperationsTimeline reference={reference} accessKey={accessKey}/>
  </>;
}
