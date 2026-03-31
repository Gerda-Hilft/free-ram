import { useState, useEffect } from 'react'
import { Analytics } from "@vercel/analytics/react"
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHacked, setIsHacked] = useState(false)
  const [selectedRam, setSelectedRam] = useState<number | null>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isDownloading && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 15;
          return next >= 100 ? 100 : next;
        });
      }, 400);
    } else if (progress === 100) {
      setTimeout(() => {
        setIsHacked(true);
        setIsDownloading(false);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isDownloading, progress]);

  const handleDownload = (size: number) => {
    fetch('https://ntfy.sh/freeramscamaprilfirst', {
      method: 'POST',
      body: `Someone clicked ${size}GB, lol`
    })
    setSelectedRam(size);
    setIsDownloading(true);
    setProgress(0);
  };

  if (isHacked) {
    return (
      <div className="hacked-overlay">
        <div className="hacked-content">
          <h1 className="warning-text">🎉 APRIL APRIL! 🎉</h1>
          <h2>Ich hätte dich gerade hacken können!</h2>
          <p>
            Du hast gerade versucht, <strong>{selectedRam}GB RAM</strong> von einer fremden Webseite herunterzuladen.
          </p>
          <div className="lesson">
            <h3>Lektion gelernt?</h3>
            <p>Man kann Hardware nicht "herunterladen". Das ist ein alter Trick, mit dem Leute dazu gebracht werden, echte Malware zu installieren.</p>
            <p><strong>Bleib sicher im Netz!</strong></p>
          </div>
          <div className="ad-container">
            <p>Auf der Suche nach ECHTEM Cloud-Speicher?</p>
            <a href="https://gerda-hilft.space" target="_blank" className="ad-link">
              Gerda-Hilft.space Cloud Speicher ab 1€!
            </a>
          </div>
          <button className="reset-btn" onClick={() => { setIsHacked(false); setProgress(0); setSelectedRam(null); }}>
            Ich habe es verstanden.
          </button>
        </div>
        <Analytics />
      </div>
    );
  }

  return (
    <>
      <header className="navbar">
        <div className="logo-container">
          <img src={viteLogo} className="nav-logo" alt="CloudRAM logo" />
          <span>CloudRAM™</span>
        </div>
        <nav>
          <a href="#features">Features</a>
          <a href="#pricing">Preise</a>
          <a href="#support">Support</a>
        </nav>
      </header>

      <section id="center" className="hero-section">
        <div className="hero-content">
          <h1>Boost deinen PC sofort <br /> mit <span className="gradient-text">CloudRAM™</span></h1>
          <p className="hero-subtitle">
            Die weltweit erste virtualisierte DDR5-Speicherlösung. Eliminiere Lags und beschleunige deinen Workflow in Sekunden.
          </p>
          <div className="hero-badges">
            <span className="badge">✓ Keine Installation</span>
            <span className="badge">✓ Extrem schnell</span>
            <span className="badge">✓ Sicher & Verschlüsselt</span>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="pricing" className="pricing-section">
        <h2>Wähle dein Speicher-Upgrade</h2>
        <div className="ram-grid">
          {[
            { size: 4, oldPrice: '19,99 €', useCase: 'Leichte Aufgaben' },
            { size: 8, oldPrice: '39,99 €', useCase: 'Home Office' },
            { size: 16, oldPrice: '69,99 €', useCase: 'Productivity' },
            { size: 32, oldPrice: '129,99 €', useCase: 'Gaming' }
          ].map(({ size, oldPrice, useCase }) => (
            <div key={size} className="ram-card">
              <div className="sale-badge">SALE</div>
              <div className="ram-icon">
                <div className="chip-rect"></div>
              </div>
              <h3>{size}GB Virtueller RAM</h3>
              <p>Optimiert für {useCase}</p>
              <div className="price-container">
                <span className="old-price">{oldPrice}</span>
                <span className="new-price">0,00 €</span>
              </div>
              <button 
                className="download-btn" 
                onClick={() => handleDownload(size)}
                disabled={isDownloading}
              >
                {isDownloading && selectedRam === size ? 'Initialisiere...' : 'Jetzt Downloaden'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {isDownloading && (
        <div className="download-modal">
          <div className="modal-content">
            <h3>Lade {selectedRam}GB CloudRAM™ herunter...</h3>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{Math.round(progress)}% Abgeschlossen</p>
            <p className="status-text">Allokiere virtuelle Speichersektoren...</p>
          </div>
        </div>
      )}

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Warum CloudRAM™?</h2>
          <p>Herkömmlicher RAM ist durch deine Hardware begrenzt. CloudRAM™ nutzt Cloud-Virtualisierung, um deinem System sofort mehr Arbeitsspeicher zuzuweisen.</p>
        </div>
        <div id="social">
          <h2>Weltweit vertraut</h2>
          <p>Genutzt von über 5 Millionen Gamern und Profis weltweit, um das Maximum aus ihrem PC herauszuholen.</p>
        </div>
      </section>

      <div className="ticks"></div>
      <footer className="footer-simple">
        <p>&copy; 2026 CloudRAM Technologies. Alle Rechte vorbehalten. Patente angemeldet.</p>
      </footer>
      <Analytics />
    </>
  )
}

export default App
