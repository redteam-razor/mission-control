let cached = null;
let cachedAt = 0;
const CACHE_MS = 2 * 60 * 60 * 1000; // 2 hours

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const c = match[1];
    const title = (c.match(/<title><!\[CDATA\[(.*?)\]\]>/) || [])[1]
      || (c.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const link = (c.match(/<link>(.*?)<\/link>/) || [])[1] || '';
    const traffic = (c.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/) || [])[1] || '';
    const newsItem = (c.match(/<ht:news_item_title>(.*?)<\/ht:news_item_title>/) || [])[1] || '';
    items.push({
      title: title.replace(/<[^>]+>/g, '').trim(),
      link,
      traffic,
      category: newsItem ? newsItem.replace(/<[^>]+>/g, '').trim() : ''
    });
  }
  return items;
}

async function fetchGoogleTrends(geo) {
  try {
    const resp = await fetch(`https://trends.google.com/trending/rss?geo=${geo}`, {
      headers: { 'User-Agent': 'MissionControl/1.0' },
      signal: AbortSignal.timeout(10000)
    });
    const xml = await resp.text();
    return parseRSS(xml).slice(0, 20);
  } catch {
    return [];
  }
}

async function fetchReddit() {
  const subs = ['technology', 'business', 'investing', 'southafrica'];
  const results = await Promise.allSettled(subs.map(async (sub) => {
    const resp = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10`, {
      headers: { 'User-Agent': 'MissionControl:TrendRadar:1.0 (by /u/missionctrl)' },
      signal: AbortSignal.timeout(10000)
    });
    const json = await resp.json();
    return (json?.data?.children || []).map(c => ({
      title: c.data.title,
      subreddit: c.data.subreddit,
      score: c.data.score,
      comments: c.data.num_comments,
      link: `https://reddit.com${c.data.permalink}`
    }));
  }));
  return results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
    .sort((a, b) => b.score - a.score)
    .slice(0, 25);
}

async function fetchHackerNews() {
  try {
    const resp = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
      signal: AbortSignal.timeout(10000)
    });
    const ids = (await resp.json()).slice(0, 15);
    const results = await Promise.allSettled(ids.map(async (id) => {
      const r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        signal: AbortSignal.timeout(8000)
      });
      return r.json();
    }));
    return results
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => ({
        title: r.value.title || '',
        score: r.value.score || 0,
        comments: r.value.descendants || 0,
        link: r.value.url || `https://news.ycombinator.com/item?id=${r.value.id}`
      }));
  } catch {
    return [];
  }
}

function generateInsights(signals) {
  const allTitles = [];
  
  // Collect all titles with source tags
  for (const item of (signals.google_trends_za?.items || [])) {
    allTitles.push({ text: item.title.toLowerCase(), source: 'google_za', original: item.title });
  }
  for (const item of (signals.google_trends_us?.items || [])) {
    allTitles.push({ text: item.title.toLowerCase(), source: 'google_us', original: item.title });
  }
  for (const item of (signals.reddit_hot?.items || [])) {
    allTitles.push({ text: item.title.toLowerCase(), source: 'reddit', original: item.title });
  }
  for (const item of (signals.hacker_news?.items || [])) {
    allTitles.push({ text: item.title.toLowerCase(), source: 'hacker_news', original: item.title });
  }

  // Extract significant words (3+ chars, not stopwords)
  const stopwords = new Set(['the','and','for','are','but','not','you','all','can','had','her','was','one','our','out','has','its','let','say','she','too','use','way','who','how','may','new','now','old','see','got','get','than','them','then','this','that','with','have','from','been','will','more','when','what','your','some','into','over','such','they','very','just','about','would','make','like','each','after','could','their','being','also','back','many','most','only','other','time','upon','these','where','much','take','come','made','find','here','thing','long','still','between','should','because','before','through','during','without','again','both','those','under','every','another','around','first']);
  
  const wordSources = {};
  for (const t of allTitles) {
    const words = t.text.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !stopwords.has(w));
    const seen = new Set();
    for (const w of words) {
      if (seen.has(w)) continue;
      seen.add(w);
      if (!wordSources[w]) wordSources[w] = { sources: new Set(), titles: [] };
      wordSources[w].sources.add(t.source);
      wordSources[w].titles.push(t.original);
    }
  }

  // Find words appearing across multiple sources
  const crossSignals = Object.entries(wordSources)
    .filter(([_, v]) => v.sources.size >= 2)
    .sort((a, b) => b[1].sources.size - a[1].sources.size)
    .slice(0, 10);

  // Category detection
  const catKeywords = {
    tech: ['ai','openai','google','apple','microsoft','software','app','crypto','bitcoin','chip','gpu','nvidia','tech','startup','code','data','cloud','robot'],
    health: ['health','vaccine','drug','medical','cancer','fda','hospital','disease','mental','fitness','pharma','biotech'],
    finance: ['stock','market','bank','invest','economy','inflation','fed','interest','rate','earnings','ipo','crypto','bitcoin','gold','debt'],
    consumer: ['buy','price','cost','retail','amazon','store','brand','food','restaurant','product','shopping'],
    energy: ['oil','gas','energy','solar','wind','nuclear','electric','battery','ev','climate','carbon'],
    culture: ['movie','music','game','sport','celebrity','election','vote','protest','social','tiktok','viral']
  };

  function detectCategory(text) {
    const t = text.toLowerCase();
    for (const [cat, kws] of Object.entries(catKeywords)) {
      if (kws.some(k => t.includes(k))) return cat;
    }
    return 'consumer';
  }

  const insights = crossSignals.map(([word, data]) => {
    const strength = data.sources.size >= 3 ? 'strong' : 'moderate';
    const representative = data.titles[0];
    const cat = detectCategory(data.titles.join(' '));
    
    const playMap = {
      tech: 'Tech sector ETFs, individual tech stocks, or emerging startups in this space',
      health: 'Healthcare/biotech companies, pharma ETFs',
      finance: 'Financial sector, fintech, banking stocks',
      consumer: 'Consumer discretionary/staples, retail brands',
      energy: 'Energy sector, renewables, oil majors',
      culture: 'Media companies, entertainment stocks, social platforms'
    };

    return {
      trend: `"${word}" trending across ${data.sources.size} sources — ${representative}`,
      signal_strength: strength,
      sources: [...data.sources],
      potential_plays: playMap[cat] || 'Research sector-specific plays',
      category: cat
    };
  });

  return insights;
}

async function fetchTrends() {
  const [gZA, gUS, reddit, hn] = await Promise.allSettled([
    fetchGoogleTrends('ZA'),
    fetchGoogleTrends('US'),
    fetchReddit(),
    fetchHackerNews()
  ]);

  const signals = {
    google_trends_za: {
      label: 'Trending in South Africa',
      items: gZA.status === 'fulfilled' ? gZA.value : [],
      status: gZA.status === 'fulfilled' ? 'online' : 'failed'
    },
    google_trends_us: {
      label: 'Trending Globally',
      items: gUS.status === 'fulfilled' ? gUS.value : [],
      status: gUS.status === 'fulfilled' ? 'online' : 'failed'
    },
    reddit_hot: {
      label: 'Reddit Pulse',
      items: reddit.status === 'fulfilled' ? reddit.value : [],
      status: reddit.status === 'fulfilled' ? 'online' : 'failed'
    },
    hacker_news: {
      label: 'Tech Signals (HN)',
      items: hn.status === 'fulfilled' ? hn.value : [],
      status: hn.status === 'fulfilled' ? 'online' : 'failed'
    }
  };

  return {
    generated: new Date().toISOString(),
    signals,
    insights: generateInsights(signals)
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const now = Date.now();
    const force = req.query?.force === '1';
    if (!cached || now - cachedAt > CACHE_MS || force) {
      cached = await fetchTrends();
      cachedAt = now;
    }
    return res.status(200).json(cached);
  } catch (err) {
    console.error('Trends error:', err);
    return res.status(500).json({ error: err.message });
  }
}
