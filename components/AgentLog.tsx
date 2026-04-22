"use client";

import { useEffect, useRef } from "react";
import { AgentLogEntry } from "@/lib/types";

interface Props {
  entries: AgentLogEntry[];
}

const PREFIX: Record<AgentLogEntry["type"], string> = {
  info: "ℹ",
  success: "✓",
  thinking: "◈",
  error: "✗",
  scan: "⟳",
};

const COLOR: Record<AgentLogEntry["type"], string> = {
  info: "#5a5a8a",
  success: "#00ff88",
  thinking: "#9945ff",
  error: "#ff4444",
  scan: "#00d4ff",
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AgentLog({ entries }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  return (
    <div className="card flex flex-col" style={{ height: "220px" }}>
      <div className="px-3 py-2 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs font-bold tracking-widest" style={{ color: "var(--text-muted)" }}>
          AGENT LOG
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 terminal space-y-1">
        {entries.length === 0 && (
          <span style={{ color: "var(--text-dim)" }}>Initializing agent...</span>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="flex gap-2 items-start">
            <span className="shrink-0 text-xs" style={{ color: "var(--text-dim)" }}>
              {formatTime(entry.timestamp)}
            </span>
            <span className="shrink-0" style={{ color: COLOR[entry.type] }}>
              {PREFIX[entry.type]}
            </span>
            <span className="text-xs break-all" style={{ color: entry.type === "success" ? "#00ff88" : entry.type === "error" ? "#ff4444" : "var(--text-primary)" }}>
              {entry.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
