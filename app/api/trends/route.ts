import { NextResponse } from "next/server";
import { Trend } from "@/lib/types";

const CURATED_FALLBACKS: Omit<Trend, "id" | "timestamp">[] = [
  { title: "AI agents taking over crypto Twitter with autonomous trading bots", source: "curated", rawScore: 8900, viralityScore: 94, category: "AI x Crypto" },
  { title: "Pepe the frog celebrates 1 year on BNB Chain with record volume", source: "curated", rawScore: 7200, viralityScore: 91, category: "Meme Culture" },
  { title: "Elon Musk posts meme about dog coins going to the moon again", source: "curated", rawScore: 15000, viralityScore: 97, category: "Celebrity" },
  { title: "ChatGPT users discover AI can generate infinite meme coin ideas", source: "curated", rawScore: 5400, viralityScore: 88, category: "AI" },
  { title: "Four.meme hits 10,000 token launches milestone on BNB Chain", source: "curated", rawScore: 3200, viralityScore: 82, category: "Web3" },
  { title: "Viral cat video spawns 47 meme coins in under 24 hours", source: "curated", rawScore: 6700, viralityScore: 89, category: "Meme Culture" },
  { title: "Ghibli AI art trend takes over crypto Twitter profile pictures", source: "curated", rawScore: 9100, viralityScore: 93, category: "AI x Culture" },
];

function computeViralityScore(title: string, rawScore: number, source: string): number {
  let base = 0;
  if (source === "coingecko") {
    base = Math.max(60, 98 - (rawScore - 1) * 5);
  } else {
    base = Math.min(85, 40 + Math.log10(Math.max(rawScore, 1) + 1) * 18);
  }

  const keywords = ["ai", "meme", "doge", "pepe", "moon", "viral", "pump", "agent", "gm", "based", "elon", "wen", "frog", "dog", "cat", "bnb", "launch", "token", "crypto"];
  const titleLower = title.toLowerCase();
  const boosts = keywords.filter((k) => titleLower.includes(k)).length * 2.5;

  return Math.min(99, Math.round(base + boosts));
}

async function fetchRedditTrends(): Promise<Trend[]> {
  const subreddits = ["CryptoCurrency", "memecoins", "wallstreetbets"];
  const results: Trend[] = [];

  for (const sub of subreddits) {
    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=5&raw_json=1`, {
        headers: { "User-Agent": "MemeOS/1.0 (hackathon project)" },
        next: { revalidate: 60 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      const posts = data?.data?.children ?? [];
      for (const post of posts) {
        const { id, title, score, url, created_utc } = post.data;
        if (!title || score < 10) continue;
        results.push({
          id: `reddit-${id}`,
          title,
          source: "reddit",
          url,
          rawScore: score,
          viralityScore: computeViralityScore(title, score, "reddit"),
          category: "Reddit",
          timestamp: created_utc * 1000,
        });
      }
    } catch {
      // silently skip failed subreddits
    }
  }
  return results;
}

async function fetchCoinGeckoTrends(): Promise<Trend[]> {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/search/trending", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const coins = data?.coins ?? [];
    return coins.map((c: { item: { id: string; name: string; symbol: string; market_cap_rank: number } }, i: number) => ({
      id: `cg-${c.item.id}`,
      title: `$${c.item.symbol.toUpperCase()} (${c.item.name}) trending on CoinGecko — rank #${i + 1}`,
      source: "coingecko" as const,
      rawScore: i + 1,
      viralityScore: computeViralityScore(c.item.name, i + 1, "coingecko"),
      category: "Trending Coin",
      timestamp: Date.now(),
    }));
  } catch {
    return [];
  }
}

export async function GET() {
  const [reddit, coingecko] = await Promise.all([
    fetchRedditTrends(),
    fetchCoinGeckoTrends(),
  ]);

  let trends: Trend[] = [...reddit, ...coingecko];

  if (trends.length < 4) {
    const fallbacks = CURATED_FALLBACKS.map((f, i) => ({
      ...f,
      id: `curated-${i}`,
      timestamp: Date.now() - i * 60000,
    }));
    trends = [...trends, ...fallbacks.slice(0, Math.max(4, 7 - trends.length))];
  }

  trends.sort((a, b) => b.viralityScore - a.viralityScore);

  return NextResponse.json({ trends: trends.slice(0, 12) });
}
