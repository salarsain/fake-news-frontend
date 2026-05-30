import { useState, useEffect } from "react";
import Header from "./components/Header";
import AnalyzerPanel from "./components/AnalyzerPanel";
import ResultCard from "./components/ResultCard";
import LiveFeed from "./components/LiveFeed";
import WSConsole from "./components/WSConsole";
import HistoryPanel from "./components/HistoryPanel";
import StatsBar from "./components/StatsBar";
import { useWebSocket } from "./hooks/useWebSocket";
import { useStore } from "./store/useStore";
import "./App.css";

export default function App() {
  const { logs, sendMessage } = useWebSocket("ws://localhost:8000/ws");
  const { result, history } = useStore();

  return (
    <div className="app">
      <div className="scanline" />
      <div className="grid-bg" />

      <Header />

      <main className="main">
        <HeroSection />
        <StatsBar />

        <div className="layout-grid">
          <div className="left-col">
            <AnalyzerPanel onAnalyze={sendMessage} />
            {result && <ResultCard result={result} />}
          </div>
          <div className="right-col">
            <LiveFeed />
            <WSConsole logs={logs} />
            <HistoryPanel history={history} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-eyebrow">AI-Powered Urdu News Verification</div>
      <h1 className="hero-title">
        Detect <em>Fake News</em>
        <br />
        in Real-Time
      </h1>
      <p className="hero-sub">
        Powered by Urdu BERT + TF-IDF dual-model pipeline
        <span className="urdu-text">
          جھوٹی خبروں کا پتہ لگائیں — فوری اور درست
        </span>
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-urdu">اردو فیک نیوز ڈیٹیکٹر — سالار احمد</div>
        <div className="footer-models">
          {["FastAPI", "Urdu BERT", "TF-IDF", "WebSocket", "SQLite"].map(
            (m) => (
              <span key={m} className="model-tag">
                {m}
              </span>
            )
          )}
        </div>
        <div className="footer-url">fake-news-detector-393.pages.dev</div>
      </div>
    </footer>
  );
}
