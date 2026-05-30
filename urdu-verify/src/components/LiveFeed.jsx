// LiveFeed.jsx
import { useState } from "react";
import { useStore } from "../store/useStore";

const MOCK_NEWS = [
  { headline: "حکومت نے نئی تعلیمی پالیسی کا اعلان کر دیا", source: "GEO.TV", status: "real", time: "2 min ago" },
  { headline: "سوشل میڈیا پر وائرل تصویر میں دعویٰ جھوٹا نکلا", source: "ARY NEWS", status: "fake", time: "5 min ago" },
  { headline: "کراچی میں بارش سے سڑکیں ڈوب گئیں", source: "EXPRESS", status: "real", time: "12 min ago" },
  { headline: "امریکہ نے پاکستان پر نئی پابندیاں لگائیں — جھوٹی خبر", source: "SAMAA", status: "fake", time: "18 min ago" },
  { headline: "پاکستان نے ورلڈ کپ کا فائنل جیت لیا", source: "BOL NEWS", status: "unverified", time: "24 min ago" },
  { headline: "آئی ایم ایف نے قرضہ منظور کر لیا", source: "DAWN", status: "real", time: "31 min ago" },
];

export function LiveFeed() {
  const { setWsLog } = useStore();
  const [news, setNews] = useState(MOCK_NEWS);

  const refresh = () => {
    setWsLog("Refreshing RSS feed from geo.tv, ary.news, dawn.com...", "info");
    setTimeout(() => {
      setNews([...MOCK_NEWS].reverse());
      setWsLog("Feed updated — 6 new articles scraped", "ok");
    }, 800);
  };

  return (
    <section className="section-block" id="feed">
      <div className="section-head">
        <div className="section-label">
          <span className="live-badge">LIVE</span>
          RSS Feed — براہ راست خبریں
        </div>
        <button className="btn-ghost" onClick={refresh}>
          [ Refresh ]
        </button>
      </div>
      <div className="news-grid">
        {news.map((n, i) => (
          <NewsItem key={i} item={n} />
        ))}
      </div>
    </section>
  );
}

function NewsItem({ item }) {
  const { setLoadedText } = useStore();
  const dotColor =
    item.status === "real"
      ? "var(--safe)"
      : item.status === "fake"
      ? "var(--danger)"
      : "var(--warn)";

  return (
    <div
      className={`news-item ${item.status}`}
      onClick={() => setLoadedText(item.headline)}
    >
      <div className="news-analyze-btn">Analyze ↗</div>
      <div className="news-source">
        <div className="status-dot" style={{ background: dotColor }} />
        {item.source}
      </div>
      <div className="news-headline">{item.headline}</div>
      <div className="news-meta">
        <span className={`news-status-tag ${item.status}`}>
          {item.status.toUpperCase()}
        </span>
        <span className="news-time">{item.time}</span>
      </div>
    </div>
  );
}

// WSConsole.jsx
export function WSConsole({ logs }) {
  return (
    <div className="ws-console">
      {logs.map((l, i) => (
        <div key={i} className="ws-line">
          <span className="ws-ts">{l.ts}</span>
          <span className={`ws-msg ${l.type}`}>{l.msg}</span>
        </div>
      ))}
    </div>
  );
}

// StatsBar.jsx
export function StatsBar() {
  const { stats } = useStore();
  return (
    <div className="stats-bar">
      {[
        { num: stats.analyzed.toLocaleString(), label: "Analyzed Today" },
        { num: stats.fakeRate + "%", label: "Fake Detected" },
        { num: "94.2%", label: "Model Accuracy" },
        { num: "~1.2s", label: "Avg Response" },
      ].map((s) => (
        <div className="stat-box" key={s.label}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// HistoryPanel.jsx
export function HistoryPanel() {
  const { history, clearHistory } = useStore();
  return (
    <section className="section-block" id="history">
      <div className="section-head">
        <div className="section-label">
          Recent Analyses — حالیہ تجزیے
        </div>
        <button className="btn-ghost" onClick={clearHistory}>
          [ Clear ]
        </button>
      </div>
      {history.length === 0 ? (
        <div
          style={{
            padding: "1rem",
            fontSize: "12px",
            color: "var(--muted)",
          }}
        >
          No analyses yet
        </div>
      ) : (
        history.slice(0, 10).map((h, i) => (
          <div className="history-item" key={i}>
            <div className={`history-dot ${h.verdict}`} />
            <div className="history-text">{h.text}</div>
            <div className="history-score">{h.conf}%</div>
          </div>
        ))
      )}
    </section>
  );
}
