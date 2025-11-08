"use client";

import { useEffect, useState } from "react";

export default function Toast({
  message,
  duration = 2500,
}: {
  message?: string;
  duration?: number;
}) {
  const [show, setShow] = useState(Boolean(message));

  useEffect(() => {
    if (!message) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [message, duration]);

  if (!show || !message) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-yellow-400 bg-[rgba(0,0,0,0.6)] px-4 py-2 text-white">
      {message}
    </div>
  );
}
