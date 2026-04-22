"use client";

import { Trend } from "@/lib/types";

interface Props {
  trend: Trend;
  isSelected: boolean;
  isTop: boolean;
  onClick: () => void;
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 85 ? "#00ff88" : score >= 65 ? "#ff6b35" : "#5a5a8a";
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: "3px", background: "var(--border)" }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: color,
            boxShadow: `0 0 6px ${color}`,
            transition: "width 0.8s ease-out",
          }}
        />
      </div>
      <span
        className="text-xs font-bold tabular-nums"
        style={{ color, minWidth: "26px" }}
      >
        {score}
      </span>
    </div>
  );
}

function SourceBadge({ source }: { source: Trend["source"] }) {
  const config: Record<Trend["source"], { label: string; color: string }> = {
    reddit: { label: "REDDIT", color: "#ff4500" },
    coingecko: { label: "GECKO", color: "#8dc63f" },
    curated: { label: "LIVE", color: "#00d4ff" },
  };
  const { label, color } = config[source];
  return (
    <span
      className="text-xs px-1.5 py-0.5 rounded font-bold tracking-wider"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        fontSize: "9px",
      }}
    >
      {label}
    </span>
  );
}

export default function TrendCard({ trend, isSelected, isTop, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`card w-full text-left p-3 cursor-pointer ${isSelected ? "selected" : ""}`}
      style={{
        borderColor: isSelected
          ? "var(--neon-purple)"
          : isTop
          ? "rgba(0,255,136,0.3)"
          : undefined,
      }}
    >
      <div className="flex items-start gap-2 mb-2">
        {isTop && (
          <span className="text-xs shrink-0" style={{ color: "#00ff88" }}>
            ★
          </span>
        )}
        <p
          className="text-xs leading-snug flex-1"
          style={{ color: "var(--text-primary)" }}
        >
          {trend.title.length > 80
            ? trend.title.slice(0, 80) + "…"
            : trend.title}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <SourceBadge source={trend.source} />
        <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
          {trend.category}
        </span>
      </div>
      <ScoreBar score={trend.viralityScore} />
      <div className="mt-1">
        <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
          VIRALITY SCORE
        </span>
      </div>
    </button>
  );
}
