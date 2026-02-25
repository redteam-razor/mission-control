import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sql = neon(process.env.DATABASE_URL);
    const { query, params = [] } = req.body;

    const allowed = query.trim().toUpperCase();
    if (!allowed.startsWith('SELECT') && !allowed.startsWith('INSERT') && !allowed.startsWith('UPDATE') && !allowed.startsWith('DELETE') && !allowed.startsWith('CREATE TABLE')) {
      return res.status(400).json({ error: 'Query type not allowed' });
    }

    const result = await sql(query, params);
    return res.status(200).json({ rows: result });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: err.message });
  }
}
