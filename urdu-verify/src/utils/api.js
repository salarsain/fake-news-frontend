const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function analyzeText(text) {
  const resp = await fetch(`${BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!resp.ok) throw new Error(`API Error ${resp.status}`);
  return resp.json();
}

export async function fetchArticleURL(url) {
  const resp = await fetch(`${BASE}/fetch-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!resp.ok) throw new Error(`Fetch Error ${resp.status}`);
  return resp.json();
}

export async function getHistory(limit = 20) {
  const resp = await fetch(`${BASE}/history?limit=${limit}`);
  if (!resp.ok) throw new Error(`History Error ${resp.status}`);
  return resp.json();
}

export async function getRSSFeed() {
  const resp = await fetch(`${BASE}/rss/latest`);
  if (!resp.ok) throw new Error(`RSS Error ${resp.status}`);
  return resp.json();
}
