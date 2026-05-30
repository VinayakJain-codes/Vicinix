"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Initial set
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      
      setTime(`NYC ${formatted}`);
    };

    updateClock();

    // Update every minute
    const interval = setInterval(updateClock, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Prevent SSR hydration mismatch by rendering empty or loading state on server
  if (!time) {
    return <span className="opacity-0">Loading...</span>;
  }

  return <span>{time}</span>;
}
