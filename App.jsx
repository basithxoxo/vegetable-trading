import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const VEGGIES = [
  { emoji: "🥦", name: "Broccoli",      origin: "Spain",       dest: "Germany",      price: "$1.20/kg",  change: "+4.2%", up: true,  season: "Winter",  moq: "5 MT",   cert: "GlobalG.A.P" },
  { emoji: "🍅", name: "Tomatoes",      origin: "Morocco",     dest: "Netherlands",  price: "$0.85/kg",  change: "-1.3%", up: false, season: "Summer",  moq: "10 MT",  cert: "Organic EU" },
  { emoji: "🥕", name: "Carrots",       origin: "India",       dest: "UAE",          price: "$0.42/kg",  change: "+2.8%", up: true,  season: "Year-round",moq:"8 MT",  cert: "GlobalG.A.P" },
  { emoji: "🧅", name: "Onions",        origin: "Egypt",       dest: "Saudi Arabia", price: "$0.31/kg",  change: "+6.1%", up: true,  season: "Year-round",moq:"20 MT", cert: "GLOBALGAP" },
  { emoji: "🌶️", name: "Chili Peppers", origin: "Peru",        dest: "USA",          price: "$3.40/kg",  change: "-0.5%", up: false, season: "Summer",  moq: "2 MT",   cert: "Rainforest" },
  { emoji: "🥬", name: "Cabbage",       origin: "Poland",      dest: "UK",           price: "$0.55/kg",  change: "+1.9%", up: true,  season: "Autumn",  moq: "12 MT",  cert: "BRC Grade A" },
  { emoji: "🧄", name: "Garlic",        origin: "China",       dest: "Brazil",       price: "$2.10/kg",  change: "+3.3%", up: true,  season: "Year-round",moq:"5 MT",  cert: "ISO 22000" },
  { emoji: "🥒", name: "Cucumber",      origin: "Turkey",      dest: "Russia",       price: "$0.70/kg",  change: "-2.1%", up: false, season: "Summer",  moq: "6 MT",   cert: "GlobalG.A.P" },
  { emoji: "🫑", name: "Bell Pepper",   origin: "Netherlands", dest: "Canada",       price: "$2.80/kg",  change: "+0.8%", up: true,  season: "Summer",  moq: "3 MT",   cert: "Organic EU" },
  { emoji: "🥔", name: "Potatoes",      origin: "Ireland",     dest: "Nigeria",      price: "$0.28/kg",  change: "+1.2%", up: true,  season: "Year-round",moq:"25 MT", cert: "BRC Grade A" },
  { emoji: "🌽", name: "Sweetcorn",     origin: "Argentina",   dest: "Japan",        price: "$0.60/kg",  change: "-0.9%", up: false, season: "Summer",  moq: "10 MT",  cert: "GlobalG.A.P" },
  { emoji: "🍆", name: "Eggplant",      origin: "Italy",       dest: "France",       price: "$1.50/kg",  change: "+2.5%", up: true,  season: "Summer",  moq: "4 MT",   cert: "Organic EU" },
];

const FEATURES = [
  { icon: "🌱", title: "Farm to Port", desc: "Direct connections with verified farms across 60+ countries. Skip the middlemen, trade fresher." },
  { icon: "🔬", title: "Quality Assured", desc: "Every shipment backed by GlobalG.A.P, Organic EU, BRC, and ISO certifications." },
  { icon: "🚢", title: "Cold Chain Logistics", desc: "End-to-end refrigerated transport. Your produce arrives table-ready." },
  { icon: "📊", title: "Live Pricing", desc: "Real-time market rates updated every 15 minutes from 40+ global exchanges." },
  { icon: "🤝", title: "Verified Partners", desc: "Every buyer and seller is KYC-verified, insured, and reviewed by our trade team." },
  { icon: "📋", title: "Compliance Ready", desc: "Automated phytosanitary certificates, customs docs, and export declarations." },
];

const TESTIMONIALS = [
  { name: "Ahmed Al-Rashid", role: "Import Manager, Dubai Fresh Co.", text: "We source over 200 MT of vegetables weekly through VegiTrade. The cold-chain integration is unmatched.", country: "🇦🇪" },
  { name: "María Gonzáles", role: "Export Director, AgroSpain S.L.", text: "Our tomato exports to Northern Europe grew 340% after listing on VegiTrade. Incredible platform.", country: "🇪🇸" },
  { name: "Rajesh Kumar", role: "CEO, IndiaFresh Exports", text: "The certification management alone saves us 20 hours per shipment. Absolutely essential for our business.", country: "🇮🇳" },
];

const NAV = ["Markets", "Trade", "Logistics", "Certifications", "About"];

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("Markets");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [tickerPos, setTickerPos] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const seasons = ["All", "Year-round", "Summer", "Winter", "Autumn"];
  const filtered = VEGGIES.filter(v =>
    (filter === "All" || v.season === filter) &&
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (name) => setCart(c => c.includes(name) ? c.filter(x => x !== name) : [...c, name]);

  return (
    <div style={s.root}>
      <style>{CSS}</style>

      {/* ── TICKER ── */}
      <div style={s.ticker}>
        <div style={s.tickerTag}>🌿 LIVE</div>
        <div style={s.tickerTrack}>
          <div style={s.tickerInner}>
            {[...VEGGIES, ...VEGGIES].map((v, i) => (
              <span key={i} style={s.tickerChip}>
                {v.emoji} <b>{v.name}</b> — {v.price}
                <span style={{ color: v.up ? "#3a8c4e" : "#c0392b", marginLeft: 6 }}>
                  {v.up ? "↑" : "↓"}{v.change}
                </span>
                <span style={s.tickerDot}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <span style={s.logoLeaf}>🥦</span>
          <div>
            <div style={s.logoName}>VegiTrade</div>
            <div style={s.logoTag}>Global Vegetable Exchange</div>
          </div>
        </div>
        <div style={s.navLinks}>
          {NAV.map(n => (
            <button key={n} style={{ ...s.navLink, ...(activeNav === n ? s.navActive : {}) }}
              onClick={() => setActiveNav(n)}>{n}</button>
          ))}
        </div>
        <div style={s.navRight}>
          <button style={s.cartBtn}>
            🛒 Enquiry List
            {cart.length > 0 && <span style={s.cartBadge}>{cart.length}</span>}
          </button>
          <button style={s.navCta}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={s.heroContent}>
          <div style={s.heroBadge}>🌍 Trusted by 12,000+ traders in 80 countries</div>
          <h1 style={s.heroH1}>
            Fresh Vegetables,<br />
            <span style={s.heroSpan}>Global Markets.</span>
          </h1>
          <p style={s.heroP}>
            The world's leading B2B platform for vegetable importers and exporters.
            Live pricing, certified partners, and seamless cold-chain logistics—all in one place.
          </p>
          <div style={s.heroActions}>
            <button style={s.heroBtnPrimary}>Browse Market Listings →</button>
            <button style={s.heroBtnSecondary}>Post Your Cargo</button>
          </div>
          <div style={s.heroStats}>
            {[["$4.2B", "Trade Volume '24"], ["340+", "Vegetable Varieties"], ["60+", "Export Countries"], ["98%", "On-time Delivery"]].map(([v, l]) => (
              <div key={l} style={s.heroStat}>
                <div style={s.heroStatVal}>{v}</div>
                <div style={s.heroStatLbl}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating produce cards */}
        <div style={s.heroVisual}>
          <div style={s.produceGrid}>
            {VEGGIES.slice(0, 9).map((v, i) => (
              <div key={v.name} style={{ ...s.produceTile, animationDelay: `${i * 0.08}s` }}
                className="produce-tile">
                <div style={s.tileEmoji}>{v.emoji}</div>
                <div style={s.tileName}>{v.name}</div>
                <div style={{ ...s.tilePrice, color: v.up ? "#2e7d46" : "#c0392b" }}>{v.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={s.features}>
        <div style={s.sectionLabel}>WHY VEGITRADE</div>
        <h2 style={s.sectionH2}>Built for the Fresh Produce Trade</h2>
        <div style={s.featGrid}>
          {FEATURES.map(f => (
            <div key={f.title} style={s.featCard} className="feat-card">
              <div style={s.featIcon}>{f.icon}</div>
              <h3 style={s.featTitle}>{f.title}</h3>
              <p style={s.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARKET LISTINGS ── */}
      <section style={s.market} id="market">
        <div style={s.marketHeader}>
          <div>
            <div style={s.sectionLabel}>LIVE MARKET</div>
            <h2 style={s.sectionH2}>Today's Vegetable Listings</h2>
          </div>
          <div style={s.marketControls}>
            <input style={s.searchInput} placeholder="🔍  Search vegetables..."
              value={search} onChange={e => setSearch(e.target.value)} />
            <div style={s.filterRow}>
              {seasons.map(se => (
                <button key={se} style={{ ...s.filterBtn, ...(filter === se ? s.filterActive : {}) }}
                  onClick={() => setFilter(se)}>{se}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={s.listingGrid}>
          {filtered.map((v, i) => (
            <div key={v.name}
              style={{ ...s.listingCard, ...(hoveredCard === i ? s.listingCardHover : {}) }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}>

              <div style={s.lcTop}>
                <div style={s.lcEmoji}>{v.emoji}</div>
                <div style={s.lcMeta}>
                  <div style={s.lcName}>{v.name}</div>
                  <div style={s.lcRoute}>
                    <span style={s.routeFrom}>{v.origin}</span>
                    <span style={s.routeArrow}>→</span>
                    <span style={s.routeTo}>{v.dest}</span>
                  </div>
                </div>
                <div style={s.lcPriceBlock}>
                  <div style={s.lcPrice}>{v.price}</div>
                  <div style={{ ...s.lcChange, color: v.up ? "#2e7d46" : "#c0392b", background: v.up ? "#e8f5e9" : "#fdecea" }}>
                    {v.up ? "▲" : "▼"} {v.change}
                  </div>
                </div>
              </div>

              <div style={s.lcTags}>
                <span style={s.tagSeason}>🗓 {v.season}</span>
                <span style={s.tagMoq}>📦 MOQ: {v.moq}</span>
                <span style={s.tagCert}>✅ {v.cert}</span>
              </div>

              <div style={s.lcActions}>
                <button style={s.lcBtnQuote}>Request Quote</button>
                <button
                  style={{ ...s.lcBtnAdd, ...(cart.includes(v.name) ? s.lcBtnAdded : {}) }}
                  onClick={() => addToCart(v.name)}>
                  {cart.includes(v.name) ? "✓ Added" : "+ Enquire"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={s.howSection}>
        <div style={s.howBg} />
        <div style={s.howInner}>
          <div style={s.sectionLabel} >HOW IT WORKS</div>
          <h2 style={{ ...s.sectionH2, color: "#fff" }}>Trade in 4 Simple Steps</h2>
          <div style={s.stepsRow}>
            {[
              { n: "01", icon: "🔍", title: "Browse & Search", desc: "Explore thousands of live vegetable listings from certified exporters worldwide." },
              { n: "02", icon: "📩", title: "Request a Quote", desc: "Send enquiries directly to verified sellers. Get responses within 4 hours." },
              { n: "03", icon: "📝", title: "Confirm & Contract", desc: "Review quality docs, certifications, and finalize your trade agreement securely." },
              { n: "04", icon: "🚢", title: "Ship & Track", desc: "We arrange cold-chain logistics and you track your shipment in real time." },
            ].map((step, i) => (
              <div key={i} style={s.step}>
                <div style={s.stepNum}>{step.n}</div>
                <div style={s.stepIcon}>{step.icon}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
                {i < 3 && <div style={s.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={s.testiSection}>
        <div style={s.sectionLabel}>WHAT TRADERS SAY</div>
        <h2 style={s.sectionH2}>Trusted by Professionals Worldwide</h2>
        <div style={s.testiCard}>
          <div style={s.testiQuote}>"</div>
          <p style={s.testiText}>{TESTIMONIALS[activeTestimonial].text}</p>
          <div style={s.testiAuthor}>
            <span style={s.testiFlag}>{TESTIMONIALS[activeTestimonial].country}</span>
            <div>
              <div style={s.testiName}>{TESTIMONIALS[activeTestimonial].name}</div>
              <div style={s.testiRole}>{TESTIMONIALS[activeTestimonial].role}</div>
            </div>
          </div>
        </div>
        <div style={s.testiDots}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} style={{ ...s.dot, ...(activeTestimonial === i ? s.dotActive : {}) }}
              onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div style={s.ctaBg} />
        <div style={s.ctaInner}>
          <div style={s.ctaLeaves}>🌿🥦🥕🍅🧅</div>
          <h2 style={s.ctaH2}>Ready to Trade Smarter?</h2>
          <p style={s.ctaP}>Join 12,000+ importers and exporters already growing their business with VegiTrade. Free to list, no hidden fees.</p>
          <div style={s.ctaActions}>
            <button style={s.heroBtnPrimary}>Create Free Account →</button>
            <button style={s.heroBtnSecondary}>Talk to Our Trade Team</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerTop}>
          <div>
            <div style={s.logo}>
              <span style={s.logoLeaf}>🥦</span>
              <div>
                <div style={{ ...s.logoName, color: "#fff" }}>VegiTrade</div>
                <div style={s.logoTag}>Global Vegetable Exchange</div>
              </div>
            </div>
            <p style={s.footerDesc}>Connecting vegetable producers and buyers across the globe since 2018.</p>
          </div>
          {[
            { head: "Platform", links: ["Markets", "Post Listing", "Cold Chain", "Certifications"] },
            { head: "Company", links: ["About", "Careers", "Press", "Blog"] },
            { head: "Support", links: ["Help Center", "Trade Desk", "Compliance", "Contact"] },
          ].map(col => (
            <div key={col.head}>
              <div style={s.footerColHead}>{col.head}</div>
              {col.links.map(l => <div key={l} style={s.footerLink}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={s.footerBottom}>
          <span>© 2026 VegiTrade Ltd. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service · Cookie Policy</span>
        </div>
      </footer>
    </div>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
const GREEN = "#1a6b32";
const LIGHT_GREEN = "#2e7d46";
const CREAM = "#fdfaf4";
const DARK = "#0f2318";
const ACCENT = "#e8f5e9";
const GOLD = "#c8860a";

const s = {
  root: { fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", background: CREAM, color: DARK, overflowX: "hidden" },

  // Ticker
  ticker: { background: DARK, display: "flex", alignItems: "center", height: 38, overflow: "hidden" },
  tickerTag: { background: GREEN, color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 2, padding: "0 16px", height: "100%", display: "flex", alignItems: "center", flexShrink: 0, fontFamily: "monospace" },
  tickerTrack: { flex: 1, overflow: "hidden" },
  tickerInner: { display: "flex", animation: "ticker 45s linear infinite", whiteSpace: "nowrap" },
  tickerChip: { display: "inline-flex", alignItems: "center", gap: 4, padding: "0 20px", fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "monospace" },
  tickerDot: { color: "rgba(255,255,255,0.2)", margin: "0 4px" },

  // Nav
  nav: { background: "#fff", borderBottom: "2px solid #e8f5e9", display: "flex", alignItems: "center", padding: "0 48px", height: 72, gap: 32, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" },
  logo: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 },
  logoLeaf: { fontSize: 32 },
  logoName: { fontSize: 22, fontWeight: 800, color: GREEN, letterSpacing: -0.5, lineHeight: 1 },
  logoTag: { fontSize: 10, color: "#7aad8a", letterSpacing: 1.5, fontFamily: "monospace", textTransform: "uppercase" },
  navLinks: { display: "flex", gap: 2, flex: 1, justifyContent: "center" },
  navLink: { background: "none", border: "none", color: "#555", fontSize: 14, padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "all .2s" },
  navActive: { background: ACCENT, color: GREEN, fontWeight: 700 },
  navRight: { display: "flex", gap: 10, alignItems: "center", flexShrink: 0 },
  cartBtn: { background: "none", border: "1.5px solid #c8e6c9", color: DARK, padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, position: "relative", fontWeight: 600 },
  cartBadge: { position: "absolute", top: -6, right: -6, background: "#e53935", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 },
  navCta: { background: GREEN, color: "#fff", border: "none", padding: "10px 22px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700 },

  // Hero
  hero: { position: "relative", background: `linear-gradient(135deg, #0f2318 0%, #1a6b32 60%, #2e9c50 100%)`, padding: "80px 48px 60px", display: "flex", alignItems: "center", gap: 60, overflow: "hidden", minHeight: 580 },
  heroBg: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.523-4.477-10-10-10S0 14.477 0 20s4.477 10 10 10 10-4.477 10-10zm10 0c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10z'/%3E%3C/g%3E%3C/svg%3E\")", pointerEvents: "none" },
  heroContent: { position: "relative", zIndex: 2, flex: 1, maxWidth: 560 },
  heroBadge: { display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)", padding: "6px 16px", borderRadius: 40, fontSize: 13, marginBottom: 24 },
  heroH1: { fontSize: "clamp(36px, 5vw, 66px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: -1 },
  heroSpan: { color: "#81c784", fontStyle: "italic" },
  heroP: { fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 36, maxWidth: 460 },
  heroActions: { display: "flex", gap: 14, marginBottom: 48 },
  heroBtnPrimary: { background: "#fff", color: GREEN, border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  heroBtnSecondary: { background: "none", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  heroStats: { display: "flex", gap: 32 },
  heroStat: {},
  heroStatVal: { fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 },
  heroStatLbl: { fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4, fontFamily: "monospace", letterSpacing: 0.5 },

  // Produce tile grid in hero
  heroVisual: { position: "relative", zIndex: 2, flex: 1, maxWidth: 460 },
  produceGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  produceTile: { background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "16px 12px", textAlign: "center", transition: "transform .2s", animation: "fadeUp 0.5s ease both" },
  tileEmoji: { fontSize: 32, display: "block", marginBottom: 6 },
  tileName: { fontSize: 12, color: "#fff", fontWeight: 600, marginBottom: 4 },
  tilePrice: { fontSize: 12, fontWeight: 800, fontFamily: "monospace" },

  // Features
  features: { padding: "80px 48px", background: "#fff" },
  sectionLabel: { fontFamily: "monospace", fontSize: 11, letterSpacing: 3, color: LIGHT_GREEN, marginBottom: 10, textTransform: "uppercase" },
  sectionH2: { fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: DARK, margin: "0 0 48px", letterSpacing: -0.5 },
  featGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 },
  featCard: { background: CREAM, border: "1.5px solid #e0ede3", borderRadius: 16, padding: "32px 28px", transition: "all .25s" },
  featIcon: { fontSize: 36, marginBottom: 16, display: "block" },
  featTitle: { fontSize: 18, fontWeight: 700, color: DARK, margin: "0 0 10px" },
  featDesc: { fontSize: 14, color: "#5a7060", lineHeight: 1.7, margin: 0 },

  // Market
  market: { padding: "80px 48px", background: CREAM },
  marketHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 40 },
  marketControls: { display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" },
  searchInput: { background: "#fff", border: "1.5px solid #c8e6c9", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontFamily: "inherit", color: DARK, outline: "none", width: 260 },
  filterRow: { display: "flex", gap: 6 },
  filterBtn: { background: "#fff", border: "1.5px solid #d4e8d8", color: "#557060", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" },
  filterActive: { background: GREEN, color: "#fff", border: `1.5px solid ${GREEN}` },
  listingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 },
  listingCard: { background: "#fff", border: "1.5px solid #e0ede3", borderRadius: 16, padding: "22px 24px", transition: "all .25s", cursor: "pointer" },
  listingCardHover: { transform: "translateY(-4px)", boxShadow: "0 16px 40px rgba(26,107,50,0.12)", borderColor: "#a5d6a7" },
  lcTop: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 },
  lcEmoji: { fontSize: 42, flexShrink: 0 },
  lcMeta: { flex: 1 },
  lcName: { fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 4 },
  lcRoute: { display: "flex", alignItems: "center", gap: 6, fontSize: 12 },
  routeFrom: { color: GREEN, fontWeight: 600 },
  routeArrow: { color: "#aaa" },
  routeTo: { color: "#c87d00", fontWeight: 600 },
  lcPriceBlock: { textAlign: "right" },
  lcPrice: { fontSize: 20, fontWeight: 800, color: DARK, fontFamily: "monospace" },
  lcChange: { fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, fontFamily: "monospace", marginTop: 4, display: "inline-block" },
  lcTags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 },
  tagSeason: { background: "#e8f5e9", color: "#2e7d46", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 },
  tagMoq: { background: "#fff8e1", color: "#c8860a", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 },
  tagCert: { background: "#e3f2fd", color: "#1565c0", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 },
  lcActions: { display: "flex", gap: 10 },
  lcBtnQuote: { flex: 1, background: ACCENT, border: `1.5px solid #a5d6a7`, color: GREEN, padding: "9px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  lcBtnAdd: { flex: 1, background: GREEN, color: "#fff", border: "none", padding: "9px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" },
  lcBtnAdded: { background: "#2e7d46", opacity: 0.85 },

  // How it works
  howSection: { position: "relative", background: DARK, padding: "80px 48px", overflow: "hidden" },
  howBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,157,80,0.12) 0%, transparent 70%)", pointerEvents: "none" },
  howInner: { position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" },
  stepsRow: { display: "flex", gap: 0, position: "relative" },
  step: { flex: 1, textAlign: "center", padding: "0 20px", position: "relative" },
  stepNum: { fontFamily: "monospace", fontSize: 48, fontWeight: 900, color: "rgba(129,199,132,0.15)", lineHeight: 1, marginBottom: 8 },
  stepIcon: { fontSize: 36, display: "block", marginBottom: 16 },
  stepTitle: { fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 10px" },
  stepDesc: { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 },
  stepArrow: { position: "absolute", top: 60, right: -12, fontSize: 24, color: "rgba(129,199,132,0.3)" },

  // Testimonials
  testiSection: { padding: "80px 48px", background: "#fff", textAlign: "center" },
  testiCard: { background: CREAM, border: "1.5px solid #d4e8d8", borderRadius: 24, padding: "48px 60px", maxWidth: 680, margin: "0 auto 32px", position: "relative" },
  testiQuote: { fontSize: 80, color: "#a5d6a7", lineHeight: 0.5, fontFamily: "Georgia, serif", position: "absolute", top: 28, left: 40, opacity: 0.5 },
  testiText: { fontSize: 18, color: DARK, lineHeight: 1.8, fontStyle: "italic", margin: "0 0 28px" },
  testiAuthor: { display: "flex", alignItems: "center", gap: 14, justifyContent: "center" },
  testiFlag: { fontSize: 28 },
  testiName: { fontSize: 15, fontWeight: 700, color: DARK },
  testiRole: { fontSize: 12, color: "#7aad8a", fontFamily: "monospace" },
  testiDots: { display: "flex", gap: 8, justifyContent: "center" },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#c8e6c9", border: "none", cursor: "pointer", transition: "all .2s" },
  dotActive: { background: GREEN, width: 24, borderRadius: 4 },

  // CTA
  ctaSection: { position: "relative", background: `linear-gradient(135deg, #0f2318, #1a6b32)`, padding: "100px 48px", textAlign: "center", overflow: "hidden" },
  ctaBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,199,132,0.1) 0%, transparent 70%)", pointerEvents: "none" },
  ctaInner: { position: "relative", zIndex: 2 },
  ctaLeaves: { fontSize: 40, marginBottom: 20, display: "block", letterSpacing: 8 },
  ctaH2: { fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, color: "#fff", margin: "0 0 20px", letterSpacing: -1 },
  ctaP: { fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 },
  ctaActions: { display: "flex", gap: 14, justifyContent: "center" },

  // Footer
  footer: { background: "#070f0c", padding: "60px 48px 0" },
  footerTop: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" },
  footerDesc: { fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: 16 },
  footerColHead: { fontSize: 12, fontWeight: 800, color: "#7aad8a", letterSpacing: 2, fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" },
  footerLink: { fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer" },
  footerBottom: { display: "flex", justifyContent: "space-between", padding: "24px 0", fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", flexWrap: "wrap", gap: 12 },
};

const CSS = `
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .produce-tile:hover { transform: scale(1.06); }
  .feat-card:hover { background: #e8f5e9; border-color: #a5d6a7; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(26,107,50,0.1); }
  * { box-sizing: border-box; }
  input::placeholder { color: #aac4b0; }
`;
