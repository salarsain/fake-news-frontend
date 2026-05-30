import { useState, useRef } from "react";
import { useStore } from "../store/useStore";

const TABS = [
  { id: "urdu", label: "Urdu Text" },
  { id: "url", label: "News URL" },
  { id: "paste", label: "English" },
];

export default function AnalyzerPanel() {
  const [activeTab, setActiveTab] = useState("urdu");
  const [urduText, setUrduText] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [urlText, setUrlText] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [loading, setLoading] = useState(false);
  const { setResult, setWsLog } = useStore();

  const getInput = () => {
    if (activeTab === "urdu") return urduText;
    if (activeTab === "url") return urlText || urlValue;
    return pasteText;
  };

  const fetchURL = async () => {
    if (!urlValue) return;
    setWsLog(`Fetching: ${urlValue}`, "info");
    setUrlText("Fetching article text...");
    // In production: POST /api/fetch-url
    setTimeout(() => {
      setUrlText(
        "حکومت نے نئی اقتصادی پالیسی کا اعلان کیا ہے جس کے تحت چھوٹے کاروباری اداروں کو ٹیکس میں رعایت دی جائے گی۔"
      );
      setWsLog("Article fetched successfully", "ok");
    }, 1200);
  };

  const analyze = async () => {
    const text = getInput().trim();
    if (!text) {
      setWsLog("ERROR: No input text provided", "err");
      return;
    }
    setLoading(true);
    setResult(null);

    // WebSocket log simulation — replace with real WS events
    const logs = [
      ["Connecting to FastAPI /analyze endpoint...", "info"],
      ["WebSocket handshake complete", "ok"],
      ["Tokenizing Urdu text with urduhack...", "info"],
      ["Running Urdu BERT inference...", "info"],
      ["TF-IDF + SVM pipeline scoring...", "info"],
    ];
    logs.forEach(([msg, type], i) => {
      setTimeout(() => setWsLog(msg, type), i * 350);
    });

    try {
      // Real API call:
      // const resp = await fetch("https://your-backend.railway.app/analyze", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text }),
      // });
      // const data = await resp.json();

      // Mock response:
      await new Promise((r) => setTimeout(r, 2000));
      const fakeScore = Math.random();
      const conf = Math.round(76 + Math.random() * 21);
      const verdict =
        fakeScore > 0.55 ? "fake" : fakeScore > 0.35 ? "suspect" : "real";
      const signals = [
        { name: "Source", icon: "🔎", score: Math.round(30 + Math.random() * 70) },
        { name: "Sentiment", icon: "📊", score: Math.round(30 + Math.random() * 70) },
        { name: "Clickbait", icon: "🎣", score: Math.round(30 + Math.random() * 70) },
        { name: "Linguistic", icon: "🔤", score: Math.round(30 + Math.random() * 70) },
        { name: "Cross-ref", icon: "🔗", score: Math.round(30 + Math.random() * 70) },
        { name: "Entity", icon: "🏷", score: Math.round(30 + Math.random() * 70) },
      ];

      const result = { text, fakeScore, conf, verdict, signals };
      setResult(result);
      setWsLog(
        `Result: ${verdict.toUpperCase()} (${conf}% confidence)`,
        verdict === "fake" ? "err" : verdict === "suspect" ? "warn" : "ok"
      );
    } catch (err) {
      setWsLog(`API Error: ${err.message}`, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-block" id="analyzer">
      <div className="section-head">
        <div className="section-label">
          <div className="status-dot yellow" />
          Analysis Input
          <span className="urdu-lbl">تجزیہ درج کریں</span>
        </div>
      </div>
      <div className="section-body">
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "urdu" && (
          <>
            <textarea
              className="urdu-textarea"
              placeholder="یہاں خبر یا متن درج کریں..."
              value={urduText}
              onChange={(e) =>
                setUrduText(e.target.value.slice(0, 2000))
              }
            />
            <div className="char-count">
              <span>{urduText.length}</span> / 2000
            </div>
          </>
        )}

        {activeTab === "url" && (
          <>
            <div className="url-row">
              <input
                className="text-input"
                type="url"
                placeholder="https://geo.tv/article/..."
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
              />
              <button className="btn-ghost btn-sm" onClick={fetchURL}>
                [ Fetch ]
              </button>
            </div>
            <textarea
              className="latin-textarea"
              value={urlText}
              onChange={(e) => setUrlText(e.target.value)}
              placeholder="Article text will appear here..."
              style={{ minHeight: "80px" }}
            />
          </>
        )}

        {activeTab === "paste" && (
          <textarea
            className="latin-textarea"
            placeholder="Paste full article or headline..."
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
          />
        )}

        <button
          className="btn-primary"
          onClick={analyze}
          disabled={loading}
        >
          <span>
            {loading
              ? "[ Analyzing... ]"
              : "[ Analyze Now — تجزیہ کریں ]"}
          </span>
        </button>

        {loading && (
          <div className="loading">
            <div className="ld-dots">
              <div className="ld-dot" />
              <div className="ld-dot" />
              <div className="ld-dot" />
            </div>
            Processing through dual-model pipeline...
          </div>
        )}
      </div>
    </section>
  );
}
