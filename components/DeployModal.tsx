"use client";

import { useState } from "react";
import type { LaunchPackage } from "@/lib/types";
import type { WalletState } from "@/hooks/useWallet";

interface Props {
  pkg: LaunchPackage;
  wallet: WalletState;
  onClose: () => void;
}

type Step = "review" | "connect" | "network" | "launch";

export default function DeployModal({ pkg, wallet, onClose }: Props) {
  const [step, setStep] = useState<Step>(() => {
    if (!wallet.address) return "connect";
    if (!wallet.isOnBSC) return "network";
    return "review";
  });
  const [launched, setLaunched] = useState(false);

  const handleConnect = async () => {
    await wallet.connect();
    if (wallet.address) setStep(wallet.isOnBSC ? "review" : "network");
  };

  const handleNetwork = async () => {
    await wallet.switchToBSC();
    setStep("review");
  };

  const handleLaunch = () => {
    const params = new URLSearchParams({
      name: pkg.coinName,
      symbol: pkg.ticker,
      description: pkg.tagline + " — " + pkg.lore.slice(0, 100),
    });
    window.open(`https://four.meme/create?${params.toString()}`, "_blank");
    setLaunched(true);
    setStep("launch");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(7,7,26,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="card p-6 w-full max-w-md fade-in-up"
        style={{ border: "1px solid rgba(153,69,255,0.4)", boxShadow: "0 0 40px rgba(153,69,255,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold shimmer-text">Deploy ${pkg.ticker}</h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{pkg.coinName} on BNB Chain</p>
          </div>
          <button onClick={onClose} style={{ color: "var(--text-muted)", fontSize: "18px" }}>✕</button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-6">
          {(["connect", "network", "review", "launch"] as Step[]).map((s, i) => {
            const steps: Step[] = ["connect", "network", "review", "launch"];
            const currentIdx = steps.indexOf(step);
            const thisIdx = steps.indexOf(s);
            const done = thisIdx < currentIdx || launched;
            const active = s === step && !launched;
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: done ? "rgba(0,255,136,0.2)" : active ? "rgba(153,69,255,0.2)" : "var(--border)",
                    border: `1px solid ${done ? "#00ff88" : active ? "#9945ff" : "var(--border-bright)"}`,
                    color: done ? "#00ff88" : active ? "#9945ff" : "var(--text-muted)",
                  }}
                >
                  {done ? "✓" : i + 1}
                </div>
                {i < 3 && <div style={{ flex: 1, height: "1px", background: done ? "#00ff88" : "var(--border)" }} />}
              </div>
            );
          })}
        </div>

        {/* Token Summary */}
        <div
          className="rounded-lg p-4 mb-5"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)" }}
        >
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div style={{ color: "var(--text-muted)" }}>Name</div>
              <div className="font-bold" style={{ color: "var(--text-primary)" }}>{pkg.coinName}</div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)" }}>Ticker</div>
              <div className="font-bold" style={{ color: "#00ff88" }}>${pkg.ticker}</div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)" }}>Total Supply</div>
              <div className="font-bold" style={{ color: "var(--text-primary)" }}>{pkg.tokenomics.totalSupply}</div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)" }}>Network</div>
              <div className="font-bold" style={{ color: "#f0b90b" }}>BNB Chain</div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === "connect" && (
          <div className="text-center">
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Connect your MetaMask wallet to deploy ${pkg.ticker} on BNB Chain
            </p>
            <button
              onClick={handleConnect}
              className="w-full py-3 rounded-lg font-bold text-sm glow-purple"
              style={{ background: "rgba(153,69,255,0.2)", border: "1px solid #9945ff", color: "#9945ff" }}
            >
              Connect MetaMask
            </button>
          </div>
        )}

        {step === "network" && (
          <div className="text-center">
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Switch your wallet to BNB Chain (BSC) to continue
            </p>
            <button
              onClick={handleNetwork}
              className="w-full py-3 rounded-lg font-bold text-sm"
              style={{ background: "rgba(240,185,11,0.15)", border: "1px solid #f0b90b", color: "#f0b90b" }}
            >
              Switch to BNB Chain
            </button>
          </div>
        )}

        {step === "review" && !launched && (
          <div>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Wallet: <span style={{ color: "#00ff88" }}>{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span> on <span style={{ color: "#f0b90b" }}>BNB Chain ✓</span>
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Clicking launch will open Four.meme with your token details pre-filled. You can review and deploy directly on the platform.
            </p>
            <button
              onClick={handleLaunch}
              className="w-full py-3 rounded-lg font-bold text-sm glow-green"
              style={{ background: "rgba(0,255,136,0.15)", border: "1px solid #00ff88", color: "#00ff88" }}
            >
              🚀 Launch ${pkg.ticker} on Four.meme
            </button>
          </div>
        )}

        {step === "launch" && (
          <div className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <p className="font-bold mb-1" style={{ color: "#00ff88" }}>Four.meme opened!</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Complete the token launch in the Four.meme tab. Your details have been pre-filled.
            </p>
            <button
              onClick={handleLaunch}
              className="mt-4 text-xs underline"
              style={{ color: "var(--text-muted)" }}
            >
              Open again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
