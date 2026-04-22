"use client";

import type { WalletState } from "@/hooks/useWallet";

interface Props {
  wallet: WalletState;
}

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function WalletButton({ wallet }: Props) {
  const { address, isConnecting, isOnBSC, connect, switchToBSC } = wallet;

  if (!address) {
    return (
      <button
        onClick={connect}
        disabled={isConnecting}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
        style={{
          background: "rgba(153,69,255,0.15)",
          border: "1px solid rgba(153,69,255,0.5)",
          color: "#9945ff",
          cursor: isConnecting ? "wait" : "pointer",
        }}
      >
        <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
      </button>
    );
  }

  if (!isOnBSC) {
    return (
      <button
        onClick={switchToBSC}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold"
        style={{
          background: "rgba(255,107,53,0.15)",
          border: "1px solid rgba(255,107,53,0.5)",
          color: "#ff6b35",
          cursor: "pointer",
        }}
      >
        ⚠ Switch to BNB Chain
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
      style={{
        background: "rgba(0,255,136,0.08)",
        border: "1px solid rgba(0,255,136,0.3)",
      }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "#00ff88", boxShadow: "0 0 4px #00ff88" }}
      />
      <span style={{ color: "#00ff88" }} className="font-bold">BSC</span>
      <span style={{ color: "var(--text-muted)" }}>{shortAddr(address)}</span>
    </div>
  );
}
