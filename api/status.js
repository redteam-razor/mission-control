export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const status = {
    ok: true,
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'configured' : 'missing',
    deployment: process.env.VERCEL ? 'vercel' : 'local'
  };
  
  return res.status(200).json(status);
}
