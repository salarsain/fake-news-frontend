import { useEffect, useRef } from "react";

const VERDICT_CONFIG = {
  fake:    { icon: "✗", title: "FAKE NEWS DETECTED", urdu: "جھوٹی خبر" },
  real:    { icon: "✓", title: "AUTHENTIC NEWS",     urdu: "درست خبر" },
  suspect: { icon: "?", title: "SUSPICIOUS CONTENT", urdu: "مشکوک مواد" },
};

export default function ResultCard({ result }) {
  const barRef = useRef(null);
  const { verdict, fakeScore, conf, signals } = result;
  const cfg = VERDICT_CONFIG[verdict];
  const pct = Math.round(fakeScore * 100);

  useEffect(() => {
    // animate bar after mount
    if (barRef.current) {
      requestAnimationFrame(() => {
        barRef.current.style.width = pct + "%";
      });
    }
  }, [pct]);

  return (
    <div className="result-card">
      <div className={`result-header ${verdict}`}>
        <div className="verdict-main">
          <div className={`verdict-icon ${verdict}`}>{cfg.icon}</div>
          <div>
            <div className={`verdict-title ${verdict}`}>{cfg.title}</div>
            <div className="verdict-urdu">{cfg.urdu}</div>
          </div>
        </div>
        <div className={`conf-badge ${verdict}`}>{conf}% confidence</div>
      </div>

      <div className="result-body">
        <div className="meter-label">
          <span>Fake Probability Score</span>
          <span>{pct}%</span>
        </div>
        <div className="meter-track">
          <div
            ref={barRef}
            className={`meter-fill ${verdict}`}
            style={{ width: 0 }}
          />
        </div>

        <div className="signals-grid">
          {signals.map((s) => {
            const cls =
              s.score > 70 ? "high" : s.score > 45 ? "med" : "low";
            return (
              <div key={s.name} className="signal-box">
                <div className="signal-icon">{s.icon}</div>
                <div className="signal-name">{s.name}</div>
                <div className={`signal-score ${cls}`}>{s.score}%</div>
              </div>
            );
          })}
        </div>

        <div className="model-tags">
          {["Urdu BERT", "TF-IDF + SVM", "Ensemble", "WebSocket"].map((m) => (
            <span key={m} className="model-tag">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
