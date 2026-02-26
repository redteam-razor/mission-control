let cached = null;
let cachedAt = 0;
const CACHE_MS = 30 * 60 * 1000;

const FEEDS = {
  ai: {
    label: 'AI Developments',
    sources: [
      { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch' },
      { url: 'https://www.artificialintelligence-news.com/feed/', name: 'AI News' },
      { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat' },
    ]
  },
  sa: {
    label: 'South Africa',
    sources: [
      { url: 'https://feeds.news24.com/articles/news24/TopStories/rss', name: 'News24' },
      { url: 'https://www.dailymaverick.co.za/dmrss/', name: 'Daily Maverick' },
    ]
  },
  world: {
    label: 'World News',
    sources: [
      { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', name: 'BBC' },
      { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', name: 'NYT' },
    ]
  }
};

function parseRSS(xml, sourceName) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const c = match[1];
    const title = (c.match(/<title><!\[CDATA\[(.*?)\]\]>/) || [])[1]
      || (c.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const link = (c.match(/<link>(.*?)<\/link>/) || [])[1] || '';
    const pubDate = (c.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || '';
    const desc = (c.match(/<description><!\[CDATA\[([\s\S]*?)\]\]>/) || [])[1]
      || (c.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
    items.push({
      title: title.replace(/<[^>]+>/g, '').trim(),
      link,
      date: pubDate,
      source: sourceName,
      snippet: desc.replace(/<[^>]+>/g, '').trim().slice(0, 150)
    });
  }
  return items;
}

async function fetchBrief() {
  const sections = {};
  for (const [key, section] of Object.entries(FEEDS)) {
    const promises = section.sources.map(async (src) => {
      try {
        const resp = await fetch(src.url, {
          headers: { 'User-Agent': 'MissionControl/1.0' },
          signal: AbortSignal.timeout(10000)
        });
        const xml = await resp.text();
        return parseRSS(xml, src.name);
      } catch {
        return [];
      }
    });
    const results = await Promise.allSettled(promises);
    let items = results.flatMap(r => r.status === 'fulfilled' ? r.value : []);
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    items = items.slice(0, 10);
    sections[key] = { label: section.label, items };
  }
  return { generated: new Date().toISOString(), sections };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const now = Date.now();
    if (!cached || now - cachedAt > CACHE_MS) {
      cached = await fetchBrief();
      cachedAt = now;
    }
    return res.status(200).json(cached);
  } catch (err) {
    console.error('Brief error:', err);
    return res.status(500).json({ error: err.message });
  }
}
