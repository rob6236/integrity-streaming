"use client";

import { useState } from "react";

const gold = "#FFD700";

export default function SchedulePicker({
  initialDate,
  onSave,
  onClose,
}: {
  initialDate: number;
  onSave: (ts: number) => void;
  onClose: () => void;
}) {
  const [dateStr, setDateStr] = useState(() => new Date(initialDate).toISOString().slice(0, 10));
  const [timeStr, setTimeStr] = useState(() => {
    const d = new Date(initialDate);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  });

  const save = () => {
    const [y, m, d] = dateStr.split("-").map((n) => +n);
    const [hh, mm] = timeStr.split(":").map((n) => +n);
    const ts = new Date(y, m - 1, d, hh, mm).getTime();
    onSave(ts);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="rounded-2xl p-4 border w-[92vw] max-w-md" style={{ borderColor: gold, background: "rgba(123,15,36,0.98)" }}>
        <h3 className="text-lg font-semibold mb-3" style={{ color: gold }}>Schedule Post</h3>
        <div className="grid gap-3">
          <input type="date" className="rounded px-3 py-2 text-black" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
          <input type="time" className="rounded px-3 py-2 text-black" value={timeStr} onChange={(e) => setTimeStr(e.target.value)} />
        </div>
        <div className="flex gap-2 mt-4 justify-end">
          <button onClick={onClose} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>Cancel</button>
          <button onClick={save} className="rounded px-3 py-2 border" style={{ borderColor: gold }}>Save</button>
        </div>
      </div>
    </div>
  );
}
