"use client";

import { useState } from "react";
import type { LaunchPackage, Trend } from "@/lib/types";
import type { WalletState } from "@/hooks/useWallet";
import DeployModal from "./DeployModal";

interface Props {
  selectedTrend: Trend | null;
  streamingText: string;
  isGenerating: boolean;
  pkg: LaunchPackage | null;
  wallet: WalletState;
  onRegenerate: () => void;
}

function MascotImage({ url, name, ticker }: { url?: string; name: string; ticker: string }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!url || errored) {
    return (
      <div
        className="shrink-0 rounded-xl flex items-center justify-center glow-purple"
        style={{ width: 108, height: 108, background: "rgba(153,69,255,0.1)", border: "1px solid rgba(153,69,255,0.3)", fontSize: "42px" }}
      >
        🐸
      </div>
    );
  }

  return (
    <div className="shrink-0 relative rounded-xl overflow-hidden glow-purple" style={{ width: 108, height: 108, background: "rgba(153,69,255,0.1)" }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: "28px" }}>
          <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#9945ff" }} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={`${name} mascot`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-4 fade-in-up">
      <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "#00ff88" : score >= 65 ? "#ff6b35" : "#5a5a8a";
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{ background: `${color}18`, border: `1px solid ${color}50` }}
    >
      <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-sm font-bold" style={{ color }}>{score}/100 VIRALITY</span>
    </div>
  );
}

export default function LaunchPackageView({ selectedTrend, streamingText, isGenerating, pkg, wallet, onRegenerate }: Props) {
  const [showDeploy, setShowDeploy] = useState(false);

  if (!selectedTrend && !pkg) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: "var(--text-muted)" }}>
        <div className="text-6xl opacity-20">◈</div>
        <p className="text-sm text-center">
          Agent is scanning trends.<br />Select a trend or wait for auto-detection.
        </p>
      </div>
    );
  }

  if (isGenerating || (streamingText && !pkg)) {
    return (
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#9945ff", boxShadow: "0 0 6px #9945ff" }} />
          <span className="text-sm font-bold" style={{ color: "#9945ff" }}>Agent generating launch package...</span>
        </div>
        {selectedTrend && (
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            Analyzing: &ldquo;{selectedTrend.title.slice(0, 70)}...&rdquo;
          </div>
        )}
        <div className="card flex-1 p-4 overflow-y-auto terminal" style={{ minHeight: "300px" }}>
          <div
            className={`text-xs whitespace-pre-wrap break-all ${streamingText ? "cursor-blink" : ""}`}
            style={{ color: "#00ff88", lineHeight: "1.7" }}
          >
            {streamingText || "Initializing..."}
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) return null;

  return (
    <>
      {showDeploy && (
        <DeployModal pkg={pkg} wallet={wallet} onClose={() => setShowDeploy(false)} />
      )}

      <div className="flex flex-col gap-4 overflow-y-auto pb-4">
        {/* Header card */}
        <div className="card p-5 fade-in-up">
          <div className="flex items-start gap-4">
            <MascotImage url={pkg.imageUrl} name={pkg.coinName} ticker={pkg.ticker} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h2 className="text-2xl font-bold shimmer-text">{pkg.coinName}</h2>
                <span
                  className="text-lg font-bold px-2 py-0.5 rounded"
                  style={{ color: "#00ff88", background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}
                >
                  ${pkg.ticker}
                </span>
              </div>
              <p className="text-sm italic mb-3" style={{ color: "#9945ff" }}>&ldquo;{pkg.tagline}&rdquo;</p>
              <ScoreBadge score={pkg.viralityScore} />
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{pkg.viralityReason}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowDeploy(true)}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold glow-green"
              style={{ background: "rgba(0,255,136,0.12)", border: "1px solid #00ff88", color: "#00ff88" }}
            >
              🚀 Deploy on Four.meme
            </button>
            <button
              onClick={onRegenerate}
              className="px-4 py-2.5 rounded-lg text-sm font-bold"
              style={{ background: "rgba(153,69,255,0.1)", border: "1px solid rgba(153,69,255,0.4)", color: "#9945ff" }}
            >
              ↺ Regenerate
            </button>
          </div>
        </div>

        {/* Lore */}
        <Section title="◈ COIN LORE">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{pkg.lore}</p>
        </Section>

        {/* Tokenomics */}
        <Section title="◈ TOKENOMICS">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg p-3" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>TOTAL SUPPLY</div>
              <div className="text-sm font-bold" style={{ color: "#00d4ff" }}>{pkg.tokenomics.totalSupply}</div>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(153,69,255,0.05)", border: "1px solid rgba(153,69,255,0.2)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>DISTRIBUTION</div>
              <div className="text-xs leading-relaxed" style={{ color: "#9945ff" }}>{pkg.tokenomics.distribution}</div>
            </div>
          </div>
        </Section>

        {/* Launch Strategy */}
        <Section title="◈ 48H LAUNCH STRATEGY">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{pkg.launchStrategy}</p>
        </Section>

        {/* Content Calendar */}
        <Section title="◈ CONTENT CALENDAR">
          <div className="space-y-2">
            {pkg.contentCalendar.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  style={{ background: "rgba(153,69,255,0.2)", color: "#9945ff", fontSize: "10px" }}
                >
                  {i + 1}
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
