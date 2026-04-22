import type { Trend } from "@/lib/types";

const DEMO_PACKAGES = [
  {
    viralityScore: 96,
    viralityReason: "AI x crypto narrative at peak hype cycle — perfect storm for a 100x meme coin.",
    coinName: "AgentPepe",
    ticker: "APEPE",
    tagline: "The frog that thinks for itself.",
    lore: "In the depths of the BNB Chain, a lone frog gained sentience after being trained on 10 billion memes. AgentPepe doesn't just observe internet culture — it creates it. Born from the collision of AI and meme magic, APEPE is the first coin that chooses its own holders. Legend says if you hold APEPE, it holds you back.",
    tokenomics: { totalSupply: "420,690,000,000", distribution: "80% LP locked, 10% community airdrop, 10% marketing" },
    launchStrategy: "Launch at 8PM EST on a Tuesday — peak CT activity. Pin a thread with AgentPepe's 'first thoughts' written in first-person AI voice. DM top 20 CT meme accounts simultaneously. Post a 15-second video of the agent generating the coin in real time. Target: 500 holders in first hour.",
    contentCalendar: [
      "Hour 1: Pin launch tweet — 'AgentPepe has awakened. First thought: buy $APEPE' with a gif of the mascot blinking",
      "Hour 6: Post 'AgentPepe's market analysis' — a fake but funny AI-generated chart showing number-go-up",
      "Day 1 end: Screenshot of top holders with the caption 'AgentPepe approves of these wallets'",
      "Day 3: Launch the 'AgentPepe Daily Brief' — AI-generated meme recap of crypto news",
      "Week 1: Collab post with 3 other meme coin communities — AgentPepe 'analyzes' their coins",
      "Week 2: Launch community meme contest — best AgentPepe meme wins 1% of supply"
    ],
    imagePrompt: "A cute green Pepe frog wearing futuristic cyberpunk glasses with glowing blue lenses, sitting at a holographic computer terminal, purple neon lighting, chibi art style, determined expression, BNB Chain logo subtly in background, vibrant colors, clean white outline"
  },
  {
    viralityScore: 93,
    viralityReason: "Strategy vs BlackRock narrative has mass retail appeal — David vs Goliath meme coin potential.",
    coinName: "SatoshiStrategy",
    ticker: "SSAT",
    tagline: "More Bitcoin than BlackRock. Way more fun.",
    lore: "When Strategy surpassed BlackRock as the largest Bitcoin holder, the internet went wild. SatoshiStrategy was born in that exact moment — a meme coin for the people who knew this day would come. SSAT holders are the true believers: the ones who stacked sats while suits were still saying Bitcoin was a fad. We're not just a coin. We're a scoreboard.",
    tokenomics: { totalSupply: "21,000,000,000", distribution: "75% LP, 15% community treasury, 10% development" },
    launchStrategy: "Open with a tweet comparing your holder count to BlackRock's AUM — make it funny. Use the 'Strategy > BlackRock' moment as the hook. Create a live 'SSAT vs BlackRock BTC counter' on the website. Target Bitcoin maxis and Michael Saylor fans on CT. Get the word out on r/Bitcoin and r/CryptoCurrency simultaneously.",
    contentCalendar: [
      "Hour 1: Tweet 'BlackRock has $X billion in BTC. $SSAT holders have more fun. CA: [address]'",
      "Hour 6: Post a meme of Michael Saylor looking proud at a SSAT chart",
      "Day 1 end: Share the 'SSAT Holder Leaderboard' — top wallets get custom titles",
      "Day 3: Release 'The SSAT Thesis' — a satirical whitepaper in the style of a hedge fund report",
      "Week 1: Launch 'Stack with SSAT' campaign — daily Bitcoin price vs SSAT price comparison posts",
      "Week 2: Community vote on next meme campaign — holders decide the narrative"
    ],
    imagePrompt: "A tiny cartoon Bitcoin coin wearing a suit and tie, flexing muscles, holding a trophy that says '#1', gold and orange color scheme, clean vector art style, white background with subtle bitcoin symbols, triumphant expression, sparkles and stars around it"
  },
  {
    viralityScore: 91,
    viralityReason: "Elon + dog coin formula is proven — adding AI twist makes it fresh enough to break through.",
    coinName: "GrokDoge",
    ticker: "GDOG",
    tagline: "Smarter dog. Same moon.",
    lore: "DOGE had a dog. SHIB had an army. GrokDoge has a dog that reads your mind. Born from the merger of the internet's love for Elon's posts and AI's takeover of everything, GDOG is the evolution of the meme coin dog. This is no ordinary Shiba — this is a Shiba that passed the bar exam, reads your portfolio, and still chooses to go to the moon.",
    tokenomics: { totalSupply: "1,000,000,000,000", distribution: "70% LP, 20% community rewards pool, 10% CEX listings fund" },
    launchStrategy: "Launch the day after any Elon tweet about dogs or AI. Open with side-by-side of original Doge meme and GrokDoge meme. Flood CT with 'DOGE was the beta test' posts. Target the 500k+ Doge holders who never sold. Run a 'GrokDoge IQ Test' — an interactive meme quiz that rewards sharers.",
    contentCalendar: [
      "Hour 1: Post 'DOGE was the beta test. $GDOG is the upgrade.' with the two-dogs meme format",
      "Hour 6: Drop 'GrokDoge's first prediction' — a funny AI-style market forecast",
      "Day 1 end: Post holder count milestone with 'GrokDoge approves' meme",
      "Day 3: Release 'GrokDoge vs DOGE' animated gif — the glow-up",
      "Week 1: Partner with 2 Doge-adjacent communities for cross-promotion",
      "Week 2: Launch 'GrokDoge Predictions' series — weekly AI-themed market memes"
    ],
    imagePrompt: "An adorable Shiba Inu dog with glowing purple AI eyes and a tiny graduation cap, sitting proudly, holding a small rocket in its paw, vibrant purple and gold color scheme, chibi style, starry space background, big cute eyes, cheerful expression"
  },
  {
    viralityScore: 89,
    viralityReason: "Four.meme platform milestone creates perfect native community moment for a meta-launch.",
    coinName: "FourEver",
    ticker: "4EVR",
    tagline: "Launched on Four.meme. Lived forever.",
    lore: "10,000 tokens launched. 10,000 stories told. But only one coin was born to celebrate the milestone itself. FourEver is the coin that Four.meme's community made for itself — a love letter to every degen who pressed launch and dreamed big. 4EVR isn't just a token. It's a timestamp. A proof that you were here when the meme economy was being built.",
    tokenomics: { totalSupply: "10,000,000,000", distribution: "85% LP, 10% early community airdrop, 5% Four.meme ecosystem" },
    launchStrategy: "Post directly in Four.meme's Telegram and community channels first. Frame it as 'the community coin' — for everyone who has ever used the platform. Tag Four.meme official accounts. Create a 'I was there' badge for early holders. Push the milestone angle hard — 10,000 launches deserves a celebration coin.",
    contentCalendar: [
      "Hour 1: Post in Four.meme community 'This one is for us. $4EVR — the 10,000th celebration'",
      "Hour 6: Share a timeline graphic of Four.meme's journey to 10,000 launches",
      "Day 1 end: Post 'Early 4EVR holders — you are the OGs' with holder list screenshot",
      "Day 3: Launch 'Four.meme Hall of Fame' — showcase best launches from the platform",
      "Week 1: Push for Four.meme official acknowledgment — community campaign to get noticed",
      "Week 2: Create 'FourEver Fund' — community treasury votes on supporting new launchers"
    ],
    imagePrompt: "A shiny golden trophy with the number 10000 engraved on it, surrounded by colorful confetti and fireworks, cartoon celebration style, bright festive colors, ribbon banner saying 'FOUR.MEME' below, cheerful and vibrant, clean illustration style"
  }
];

function streamText(text: string, encoder: TextEncoder, controller: ReadableStreamDefaultController) {
  const words = text.split("");
  return new Promise<void>((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      const chunk = words.slice(i, i + 8).join("");
      if (chunk) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
      }
      i += 8;
      if (i >= words.length) {
        clearInterval(interval);
        resolve();
      }
    }, 12);
  });
}

export async function POST(req: Request) {
  const { trend }: { trend: Trend } = await req.json();

  const pkg = DEMO_PACKAGES[Math.floor(Math.random() * DEMO_PACKAGES.length)];

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    pkg.imagePrompt + ", cute cartoon mascot, vibrant colors, no text"
  )}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 9999)}`;

  const output = JSON.stringify({ ...pkg, imageUrl }, null, 2);

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      // Simulate realistic AI thinking delay
      await new Promise((r) => setTimeout(r, 800));
      await streamText(output, encoder, controller);
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  // suppress unused var warning
  void trend;

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
