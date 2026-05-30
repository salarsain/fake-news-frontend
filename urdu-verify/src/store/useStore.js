import { create } from "zustand";

export const useStore = create((set, get) => ({
  result: null,
  history: [],
  loadedText: "",
  stats: { analyzed: 2847, fakeRate: 34 },
  logs: [
    { ts: now(), msg: "UrduVerify v2.1 initialized", type: "ok" },
    { ts: now(), msg: "Urdu BERT model loaded (bert-base-multilingual-cased)", type: "ok" },
    { ts: now(), msg: "TF-IDF vectorizer ready (vocab: 52,847)", type: "ok" },
    { ts: now(), msg: "WebSocket server connected", type: "ok" },
    { ts: now(), msg: "RSS scrapers active: geo.tv, ary.news, dawn.com, express.pk", type: "info" },
  ],

  setResult: (result) =>
    set((s) => ({
      result,
      history: result
        ? [{ text: result.text, verdict: result.verdict, conf: result.conf }, ...s.history]
        : s.history,
      stats: result
        ? { ...s.stats, analyzed: s.stats.analyzed + 1 }
        : s.stats,
    })),

  setWsLog: (msg, type = "info") =>
    set((s) => ({
      logs: [...s.logs, { ts: now(), msg, type }].slice(-50),
    })),

  setLoadedText: (text) => set({ loadedText: text }),

  clearHistory: () => set({ history: [] }),
}));

function now() {
  return new Date().toLocaleTimeString("en", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
