export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  const token = process.env.DISPLAYS_READ_TOKEN;
  const url = 'https://api.github.com/repos/ABORNATO/voidda-displays/contents/logs/entregas.json';
  const r = await fetch(url, {
    headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github+json' }
  });
  if (!r.ok) return res.status(200).json([]);
  const d = await r.json();
  const bin = Buffer.from(d.content.replace(/\n/g, ''), 'base64').toString('utf-8');
  res.status(200).json(JSON.parse(bin));
}