"use client";

import { useState } from "react";
import { Check, MapPin, Package, ShieldCheck, Ticket, Users } from "lucide-react";
import type { Module } from "./model";

export default function SoftwareDemo({ id, announce }: { id: Module; announce: (message: string) => void }) {
  const [checkpoints, setCheckpoints] = useState(0);
  const [incident, setIncident] = useState(false);
  const [ticket, setTicket] = useState("");
  const [checkedIn, setCheckedIn] = useState<string[]>([]);
  const [gateMessage, setGateMessage] = useState("");
  const [taxable, setTaxable] = useState("1000");
  const [rate, setRate] = useState("18");
  const [stock, setStock] = useState(8);
  const [fulfilled, setFulfilled] = useState(0);
  const [attendance, setAttendance] = useState<string[]>(["Aarav", "Meera"]);
  const [feePaid, setFeePaid] = useState(false);
  const validTickets = ["DEMO-101", "DEMO-102", "DEMO-103"];

  function checkTicket() {
    const code = ticket.trim().toUpperCase();
    let message = "Ticket not found. Try one of the sample codes.";
    if (checkedIn.includes(code)) message = "Already checked in. This ticket cannot be used twice.";
    else if (validTickets.includes(code)) {
      setCheckedIn(current => [...current, code]);
      message = `${code} checked in. Welcome to the event.`;
    }
    setGateMessage(message);
    announce(message);
  }

  if (id === "guard") return <div className="pg-demo">
    <div className="pg-demo-banner navy"><ShieldCheck size={38} /><h3>Patrol in progress</h3><p>{checkpoints} of 3 checkpoints verified</p></div>
    <div className="pg-checkpoints">{["Main entrance", "Loading bay", "Server room"].map((name, index) => <div key={name}><MapPin size={17} /><span>{name}</span>{index < checkpoints && <Check size={17} />}</div>)}</div>
    <button className="pg-primary" disabled={checkpoints === 3} onClick={() => { setCheckpoints(value => value + 1); announce("Sample checkpoint verified."); }}>{checkpoints === 3 ? "Patrol complete" : "Scan next sample checkpoint"}</button>
    <button className="pg-secondary" disabled={incident} onClick={() => { setIncident(true); announce("Sample incident added to the supervisor queue."); }}>{incident ? "Incident in supervisor queue" : "Report sample incident"}</button>
    <p className="pg-help">Explore a patrol workflow with simulated scans and locations.</p>
  </div>;

  if (id === "events") return <div className="pg-demo">
    <div className="pg-demo-banner rose"><Ticket size={38} /><h3>Gather Festival</h3><p>{checkedIn.length} of 3 sample guests checked in</p></div>
    <label className="pg-caption-label">Sample ticket code<input value={ticket} onChange={event => setTicket(event.target.value)} placeholder="DEMO-101" autoCapitalize="characters" maxLength={30} /></label>
    <div className="pg-ticket-codes">{validTickets.map(code => <button key={code} onClick={() => setTicket(code)}>{code}</button>)}</div>
    <button className="pg-primary" onClick={checkTicket}>Check in ticket</button>
    <p className="pg-help" role="status">{gateMessage || "Choose a sample code, then check the guest in."}</p>
    <p className="pg-help">Repeat a code to explore duplicate ticket detection.</p>
  </div>;

  if (id === "tax") {
    const amount = Math.min(10_000_000, Math.max(0, Number(taxable) || 0));
    const tax = Math.round(amount * Number(rate)) / 100;
    return <div className="pg-demo">
      <div className="pg-receipt"><span className="pg-eyebrow">Concept worksheet</span><h3>Sample tax calculation</h3>
        <label className="pg-caption-label">Taxable amount (₹)<input type="number" min="0" max="10000000" value={taxable} onChange={event => setTaxable(event.target.value)} /></label>
        <label className="pg-caption-label">Illustrative tax rate<select value={rate} onChange={event => setRate(event.target.value)}>{[0, 5, 12, 18, 28].map(value => <option key={value} value={value}>{value}%</option>)}</select></label>
        <div className="pg-invoice-row"><span>Sample tax</span><strong>₹{tax.toFixed(2)}</strong></div>
        <div className="pg-invoice-total"><span>Total</span><strong>₹{(amount + tax).toFixed(2)}</strong></div>
      </div><p className="pg-help">Rates here are sample inputs for this concept. Vicinix Tax is in development. Tax classification and filing require the applicable rules.</p>
    </div>;
  }

  if (id === "erp") return <div className="pg-demo">
    <div className="pg-demo-banner sand"><Package size={38} /><h3>Inventory desk</h3><p>Sample SKU · FIELD-001</p></div>
    <div className="pg-demo-metrics"><div><strong>{stock}</strong><span>In stock</span></div><div><strong>{fulfilled}</strong><span>Fulfilled</span></div></div>
    <button className="pg-primary" disabled={!stock} onClick={() => { setStock(value => value - 1); setFulfilled(value => value + 1); announce("Sample order fulfilled. Stock reduced by one."); }}>Fulfil one sample order</button>
    <button className="pg-secondary" disabled={stock >= 100} onClick={() => { setStock(value => Math.min(100, value + 5)); announce("Five sample units received."); }}>Receive 5 units</button>
    <p className="pg-help">Explore a proposed inventory workflow for the planned ERP product.</p>
  </div>;

  if (id === "college") return <div className="pg-demo">
    <div className="pg-demo-banner lavender"><Users size={38} /><h3>Classroom overview</h3><p>{attendance.length} of 4 students present</p></div>
    <div className="pg-students">{["Aarav", "Meera", "Kabir", "Riya"].map(name => <button key={name} aria-pressed={attendance.includes(name)} onClick={() => setAttendance(current => current.includes(name) ? current.filter(value => value !== name) : [...current, name])}><span>{name}</span><span>{attendance.includes(name) ? "Present" : "Absent"}</span></button>)}</div>
    <div className="pg-receipt"><span className="pg-eyebrow">Sample fee record · Meera</span><strong>₹2,500</strong><p>{feePaid ? "Marked paid in this preview" : "Awaiting payment"}</p><button className="pg-secondary" disabled={feePaid} onClick={() => { setFeePaid(true); announce("Sample student fee marked paid."); }}>{feePaid ? "Sample record updated" : "Mark sample fee paid"}</button></div>
    <p className="pg-help">Attendance and fee records illustrate the planned College &amp; K–12 ERP.</p>
  </div>;

  return null;
}
