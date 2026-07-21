"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { id: string; kind: "applications" | "tours"; status: string };

export default function RequestDecisionForm({ id, kind, status }: Props) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [applicationFee, setApplicationFee] = useState("");
  const [additionalFees, setAdditionalFees] = useState("");
  const [confirmedDate, setConfirmedDate] = useState("");
  const [confirmedTime, setConfirmedTime] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function decide(decision: "approved" | "denied") {
    setSending(true); setMessage("");
    const response = await fetch(`/api/admin/${kind}/${id}/decision`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: decision, note, applicationFee, additionalFees, confirmedDate, confirmedTime }) });
    const result = await response.json();
    setSending(false);
    if (!response.ok) { setMessage(result.error || "Unable to send decision."); return; }
    setMessage("Decision saved and email sent."); router.refresh();
  }

  if (status !== "pending") return <span className="text-sm font-bold capitalize text-gray-700">{status}</span>;
  return <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
    {kind === "applications" ? <div className="grid grid-cols-2 gap-3"><input value={applicationFee} onChange={(event) => setApplicationFee(event.target.value)} inputMode="numeric" placeholder="Application fee ($)" className="rounded-xl border border-gray-200 px-3 text-black py-2 text-sm" /><input value={additionalFees} onChange={(event) => setAdditionalFees(event.target.value)} inputMode="numeric" placeholder="Security deposit ($)" className="rounded-xl border border-gray-200 px-3 text-black py-2 text-sm" /></div> : <div className="grid grid-cols-2 gap-3"><input type="date" value={confirmedDate} onChange={(event) => setConfirmedDate(event.target.value)} className="rounded-xl border border-gray-200 px-3 text-black  py-2 text-sm" /><input type="time" value={confirmedTime} onChange={(event) => setConfirmedTime(event.target.value)} className="rounded-xl border border-gray-200 px-3 text-black py-2 text-sm" /></div>}
    <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note for the applicant" rows={2} className="w-full rounded-xl border border-gray-200 px-3 text-black py-2 text-sm" />
    <div className="flex gap-3"><button type="button" disabled={sending} onClick={() => decide("approved")} className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-sm font-bold text-white disabled:opacity-60">Approve & Email</button><button type="button" disabled={sending} onClick={() => decide("denied")} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-700 disabled:opacity-60">Deny & Email</button></div>
    {message && <p className="text-sm font-semibold text-[#0B1F3A]">{message}</p>}
  </div>;
}
