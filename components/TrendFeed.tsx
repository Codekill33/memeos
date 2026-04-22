"use client";

import { Trend, AgentLogEntry } from "@/lib/types";
import TrendCard from "./TrendCard";
import AgentLog from "./AgentLog";

interface Props {
  trends: Trend[];
  selectedTrend: Trend | null;
  onSelect: (trend: Trend) => void;
  agentLog: AgentLogEntry[];
  isLoading: boolean;
}

export default function TrendFeed({ trends, selectedTrend, onSelect, agentLog, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest" style={{ color: "var(--text-muted)" }}>
          LIVE TRENDS
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{ color: "#00d4ff", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          {trends.length} signals
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {isLoading && (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="card p-3 animate-pulse"
                style={{ height: "90px", opacity: 0.4 }}
              />
            ))}
          </div>
        )}
        {!isLoading && trends.map((trend, i) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            isSelected={selectedTrend?.id === trend.id}
            isTop={i === 0}
            onClick={() => onSelect(trend)}
          />
        ))}
      </div>

      <AgentLog entries={agentLog} />
    </div>
  );
}
