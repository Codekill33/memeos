export interface Trend {
  id: string;
  title: string;
  source: 'reddit' | 'coingecko' | 'curated';
  url?: string;
  rawScore: number;
  viralityScore: number;
  category: string;
  timestamp: number;
}

export interface Tokenomics {
  totalSupply: string;
  distribution: string;
}

export interface LaunchPackage {
  viralityScore: number;
  viralityReason: string;
  coinName: string;
  ticker: string;
  tagline: string;
  lore: string;
  tokenomics: Tokenomics;
  launchStrategy: string;
  contentCalendar: string[];
  imagePrompt: string;
  imageUrl?: string;
}

export interface AgentLogEntry {
  id: string;
  timestamp: number;
  type: 'info' | 'success' | 'thinking' | 'error' | 'scan';
  message: string;
}
