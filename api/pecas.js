export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const path = req.query.path;
  if (!path) return res.status(400).json({ error: 'path required' });
  
  const token = process.env.DISPLAYS_READ_TOKEN;
  const url = 'https://api.github.com/repos/ABORNATO/voidda-displays/contents/' + path;
  
  const r = await fetch(url, {
    headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github+json' }
  });
  
  if (r.status === 404) return res.status(200).json([]);
  if (!r.ok) return res.status(200).json([]);
  
  const data = await r.json();
  const dirs = Array.isArray(data) ? data.filter(i => i.type === 'dir').map(i => i.name) : [];
  res.status(200).json(dirs);
}