"use client";

import { useEffect, useState } from "react";

/** Ticking HH:MM:SS in the visitor's local time. */
export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
