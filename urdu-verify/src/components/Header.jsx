export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-badge">اخ</div>
          <div>
            <div className="logo-text">
              <em>Urdu</em>Verify
            </div>
            <div className="logo-sub">Fake News Intelligence System</div>
          </div>
        </div>

        <nav className="nav-links">
          <a className="nav-link" href="#analyzer">Analyzer</a>
          <a className="nav-link" href="#feed">Live Feed</a>
          <a className="nav-link" href="#history">History</a>
          <a
            className="nav-link"
            href="https://fake-news-detector-393.pages.dev"
            target="_blank"
            rel="noreferrer"
          >
            Live App ↗
          </a>
        </nav>

        <div className="header-right">
          <div className="status-chip">
            <div className="status-dot green" />
            API Online
          </div>
          <div className="status-chip">
            <div className="status-dot yellow" />
            WS Live
          </div>
        </div>
      </div>
    </header>
  );
}
