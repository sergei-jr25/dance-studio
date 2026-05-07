'use client';
import { useEffect, useRef, useState } from "react"

/* ─── COLORS ─────────────────────────────────────────────── */
const C = {
  bg: "#0a0a0f",
  card: "#12121a",
  cardHover: "#1a1a26",
  purple: "#b06aff",
  pink: "#ff5ba7",
  text: "#f0eaff",
  muted: "#9b8fb5",
  border: "rgba(176,106,255,0.18)",
};

/* ─── GLOBAL CSS ──────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a0f; color: #f0eaff; font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: hidden; }
  ::placeholder { color: #9b8fb5; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0) rotate(0deg); }
    33%      { transform: translateY(-16px) rotate(1deg); }
    66%      { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes pulse {
    0%,100% { opacity: 0.15; transform: scale(1); }
    50%      { opacity: 0.28; transform: scale(1.08); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.92) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes overlayIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
		  /* 🔥 НОВЫЕ АНИМАЦИИ */
  @keyframes ringOrbit {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  
  @keyframes scrollLine {
    0%   { transform: translateY(0); opacity: 0.2; }
    50%  { transform: translateY(20px); opacity: 1; }
    100% { transform: translateY(40px); opacity: 0; }
  }
  
  @keyframes letterDrop {
    0%   { opacity: 0; transform: translateY(-30px) rotateX(-90deg); }
    100% { opacity: 1; transform: translateY(0) rotateX(0); }
  }
  
  @keyframes floatDot {
    0%,100% { transform: translateY(0); opacity: 0.6; }
    50%     { transform: translateY(-15px); opacity: 1; }
  }

  .reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .card-lift {
    transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease;
  }

  .btn-grad {
    background: linear-gradient(135deg, #b06aff, #ff5ba7);
    border: none; border-radius: 100px; color: #fff; font-weight: 800;
    cursor: pointer; letter-spacing: 0.3px;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }
  .btn-grad:hover  { transform: scale(1.04); box-shadow: 0 8px 32px rgba(176,106,255,0.35); }
  .btn-grad:active { transform: scale(0.97); }

  .btn-ghost {
    background: transparent;
    border: 1.5px solid rgba(176,106,255,0.18); border-radius: 100px;
    color: #f0eaff; font-weight: 600; cursor: pointer; text-decoration: none;
    display: inline-block; transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover { border-color: #b06aff; background: rgba(176,106,255,0.08); }

  .nav-a {
    color: #9b8fb5; text-decoration: none; font-size: 14px; font-weight: 500;
    transition: color 0.2s; letter-spacing: 0.3px;
  }
  .nav-a:hover { color: #f0eaff; }

  input, select, textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(176,106,255,0.18); border-radius: 12px;
    color: #f0eaff; font-size: 15px; padding: 14px 18px; outline: none;
    width: 100%; font-family: inherit;
    transition: border-color 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: #b06aff; }
  select { background: #12121a; }

  /* ── Responsive breakpoints ── */
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none !important; }
    .hamburger { display: flex !important; }
    .sec { padding: 64px 20px !important; }
    .sec-h2 { font-size: 30px !important; letter-spacing: -0.5px !important; }
    .dir-grid { grid-template-columns: 1fr !important; }
    .sch-grid { grid-template-columns: 1fr !important; }
    .tea-grid { flex-direction: column !important; align-items: center !important; }
    .pri-grid { flex-direction: column !important; align-items: center !important; }
    .rev-grid { flex-direction: column !important; align-items: center !important; }
    .hero-btns { flex-direction: column !important; align-items: stretch !important; }
    .hero-btns > * { text-align: center !important; }
    .cta-inner { padding: 40px 24px !important; }
    .footer-in { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
    .modal-box { padding: 28px 20px !important; margin: 0 16px !important; }
    .stat-row { gap: 24px !important; }
    .float-emoji { display: none !important; }
  }
  @media (min-width: 769px) {
    .hamburger { display: none !important; }
    .mob-menu  { display: none !important; }
  }
  @media (min-width: 769px) and (max-width: 1100px) {
    .dir-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .sec { padding: 80px 32px !important; }
  }
`;

/* ─── DATA ────────────────────────────────────────────────── */
const DIRECTIONS = [
  { id:1, name:"High Heels",      emoji:"👠", desc:"Сексуальная пластика и уверенная походка на каблуках. Раскрой женственность в движении.", schedule:"Пн, Ср 19:00", price:"от 1 200 ₽", color:"#ff5ba7", age:"16+" },
  { id:2, name:"Pro Heels",       emoji:"✨", desc:"Продвинутый уровень. Сложные связки, хореография, работа с образом.", schedule:"Вт, Чт 20:00", price:"от 1 400 ₽", color:"#b06aff", age:"18+" },
  { id:3, name:"Street Dance",    emoji:"🔥", desc:"Хип-хоп, уличный стиль, свобода движений. Для тех, кто хочет драйва.", schedule:"Пн, Пт 18:00", price:"от 1 000 ₽", color:"#ff7c3b", age:"12+" },
  { id:4, name:"Belly Dance",     emoji:"🌙", desc:"Восточные танцы — пластика, грация, работа с бёдрами и животом.", schedule:"Ср, Сб 11:00", price:"от 1 100 ₽", color:"#f0c040", age:"14+" },
  { id:5, name:"Балет",           emoji:"🩰", desc:"Классическая школа, растяжка, осанка и элегантность для всех.", schedule:"Вт, Сб 10:00", price:"от 1 300 ₽", color:"#5bc8ff", age:"5+"  },
  { id:6, name:"Свадебный танец", emoji:"💍", desc:"Индивидуальная постановка для пары. Создадим незабываемый момент.", schedule:"По записи",  price:"от 3 000 ₽", color:"#ff5ba7", age:"Пары"},
];

const TEACHERS = [
  { id:1, name:"Анастасия Вергун", dirs:["High Heels","Pro Heels"],      initials:"АВ", color:"#ff5ba7", exp:"8 лет опыта" },
  { id:2, name:"Дарья Калинина",   dirs:["Street Dance","Танц. фитнес"], initials:"ДК", color:"#b06aff", exp:"6 лет опыта" },
  { id:3, name:"Мария Орлова",     dirs:["Балет","Belly Dance"],          initials:"МО", color:"#5bc8ff", exp:"10 лет опыта"},
];

const SCHEDULE = [
  { day:"Понедельник", items:[{ time:"18:00", dir:"Street Dance", teacher:"Дарья К.",    color:"#ff7c3b" },{ time:"19:00", dir:"High Heels",  teacher:"Анастасия В.", color:"#ff5ba7" }] },
  { day:"Вторник",     items:[{ time:"10:00", dir:"Балет",        teacher:"Мария О.",    color:"#5bc8ff" },{ time:"20:00", dir:"Pro Heels",   teacher:"Анастасия В.", color:"#b06aff" }] },
  { day:"Среда",       items:[{ time:"11:00", dir:"Belly Dance",  teacher:"Мария О.",    color:"#f0c040" },{ time:"19:00", dir:"High Heels",  teacher:"Анастасия В.", color:"#ff5ba7" }] },
  { day:"Четверг",     items:[{ time:"20:00", dir:"Pro Heels",    teacher:"Анастасия В.",color:"#b06aff" }] },
  { day:"Пятница",     items:[{ time:"18:00", dir:"Street Dance", teacher:"Дарья К.",    color:"#ff7c3b" }] },
  { day:"Суббота",     items:[{ time:"10:00", dir:"Балет",        teacher:"Мария О.",    color:"#5bc8ff" },{ time:"11:00", dir:"Belly Dance", teacher:"Мария О.",    color:"#f0c040" }] },
];

const REVIEWS = [
  { id:1, name:"Алина М.",       text:"Пришла на пробное по High Heels и влюбилась! Анастасия — потрясающий педагог, чувствую себя другим человеком.", dir:"High Heels" },
  { id:2, name:"Карина Т.",      text:"Балет для взрослых — это возможность! Спустя 3 месяца осанка модели и растяжка мечты.", dir:"Балет" },
  { id:3, name:"Ирина и Максим", text:"Готовились к свадьбе с нуля. Мы оба ни разу не танцевали, а в итоге — аплодисменты на весь зал!", dir:"Свадебный танец" },
];

const PRICES = [
  { type:"Разовое занятие",      price:"1 200 ₽", note:"Любое направление" },
  { type:"Абонемент 8 занятий",  price:"8 000 ₽", note:"Экономия 1 600 ₽", hot:true },
  { type:"Абонемент 12 занятий", price:"10 800 ₽", note:"Экономия 3 600 ₽" },
  { type:"Индивидуальное",       price:"3 000 ₽", note:"60 мин / 1 педагог" },
];

const TICKER = ["High Heels","Street Dance","Belly Dance","Балет","Pro Heels","Свадебный танец"];

/* ─── HOOKS ───────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useStagger(count) {
  const refs = useRef([]);
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), i * 100); obs.disconnect(); } },
        { threshold: 0.1 }
      );
      obs.observe(el);
    });
  }, [count]);
  return refs;
}

/* ─── COMPONENTS ──────────────────────────────────────────── */

/* NAVBAR */
function Navbar({ onCTA }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Направления","Расписание","Преподаватели","Цены","Контакты"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background: scrolled ? "rgba(10,10,15,0.96)" : "rgba(10,10,15,0.5)",
        backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${scrolled ? C.border : "transparent"}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 40px", height:64,
        transition:"background 0.35s, border-color 0.35s",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.5px", background:`linear-gradient(90deg, ${C.purple}, ${C.pink})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>VIBE</span>
          <span style={{ color:C.muted, fontSize:12, letterSpacing:3, textTransform:"uppercase", fontWeight:500 }}>Dance Studio</span>
        </div>
        <div className="nav-links" style={{ display:"flex", gap:32 }}>
          {links.map(l => <a key={l} className="nav-a" href={`#${l.toLowerCase()}`}>{l}</a>)}
        </div>
        <button className="btn-grad nav-cta" onClick={onCTA} style={{ fontSize:14, padding:"10px 24px" }}>Записаться</button>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setOpen(p => !p)} style={{
          display:"none", flexDirection:"column", gap:5,
          background:"none", border:"none", cursor:"pointer", padding:8,
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:"block", width:24, height:2, background:C.text, borderRadius:2,
              transition:"transform 0.25s, opacity 0.25s",
              transform: open && i===0 ? "rotate(45deg) translate(5px,5px)" : open && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              opacity: open && i===1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="mob-menu" style={{
        position:"fixed", top:64, left:0, right:0, zIndex:190,
        background:"rgba(10,10,15,0.98)", backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${C.border}`,
        padding: open ? "20px 24px 28px" : "0 24px",
        maxHeight: open ? 420 : 0,
        overflow:"hidden",
        transition:"max-height 0.35s ease, padding 0.35s ease",
      }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
            style={{ display:"block", color:C.muted, textDecoration:"none", fontSize:18, fontWeight:600, padding:"13px 0", borderBottom:`1px solid ${C.border}` }}>
            {l}
          </a>
        ))}
        <button className="btn-grad" onClick={() => { setOpen(false); onCTA(); }}
          style={{ marginTop:20, fontSize:15, padding:"14px", width:"100%" }}>Записаться</button>
      </div>
    </>
  );
}

/* ── HERO CANVAS PARTICLES ─────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const COLORS_P = ["#b06aff","#ff5ba7","#7c3fb0","#c2397a","#5bc8ff","#ff7c3b"];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function spawn() {
      const count = Math.floor((W * H) / 9000);
      particles.current = Array.from({ length: Math.min(count, 120) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.2 + 0.4,
        color: COLORS_P[Math.floor(Math.random() * COLORS_P.length)],
        alpha: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // connection lines
      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(176,106,255,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        // mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          const force = (120 - d) / 120;
          p.vx += (dx / d) * force * 0.6;
          p.vy += (dy / d) * force * 0.6;
        }

        // friction + drift
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // draw dot
        const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2,"0");
        ctx.fill();
      });

      raf.current = requestAnimationFrame(draw);
    }

    resize();
    spawn();
    draw();

    const onResize = () => { resize(); spawn(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

  return (
    <canvas ref={canvasRef} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"all", zIndex:0 }} />
  );
}

/* ── KINETIC TEXT ──────────────────────────────────────────── */
function KineticWord({ word, colored, delay }) {
  const letters = word.split("");
  return (
    <span style={{ display:"inline-block" }}>
      {letters.map((ch, i) => (
        <span key={i} style={{
          display:"inline-block",
          animation:`letterDrop 0.55s cubic-bezier(0.22,1,0.36,1) ${delay + i * 0.04}s both`,
          ...(colored ? {
            background:`linear-gradient(90deg, #b06aff, #ff5ba7)`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          } : {}),
        }}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </span>
  );
}

/* ── ROTATING RING ─────────────────────────────────────────── */
function RotatingRing() {
  const tags = ["High Heels","Street Dance","Belly Dance","Балет","Pro Heels","Свадебный"];
  const count = tags.length;
  return (
    <div className="float-emoji" style={{ position:"absolute", right:"5%", top:"50%", translate:"0 -50%", width:220, height:220, pointerEvents:"none", zIndex:1 }}>
      {tags.map((tag, i) => {
        const angle = (360 / count) * i;
        return (
          <div key={tag} style={{
            position:"absolute", inset:0,
            transform:`rotate(${angle}deg)`,
            animation:`ringOrbit 18s linear infinite`,
            animationDelay: `${-(18 / count) * i}s`,
          }}>
            <div style={{
              position:"absolute", top:0, left:"50%", translate:"-50% 0",
              background:"rgba(176,106,255,0.12)", border:"1px solid rgba(176,106,255,0.3)",
              borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:700,
              color:"#b06aff", whiteSpace:"nowrap", letterSpacing:0.5,
              transform:`rotate(-${angle}deg)`,
            }}>{tag}</div>
          </div>
        );
      })}
      {/* center dot */}
      <div style={{ position:"absolute", top:"50%", left:"50%", translate:"-50% -50%", width:12, height:12, borderRadius:"50%", background:"linear-gradient(135deg,#b06aff,#ff5ba7)", boxShadow:"0 0 20px rgba(176,106,255,0.6)" }} />
    </div>
  );
}

/* ── HERO ──────────────────────────────────────────────────── */
function Hero({ onCTA }) {
  const [ready, setReady] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Parallax on mouse move
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translate(${dx * -10}px, ${dy * -8}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    window.addEventListener("mousemove", onMove, { passive:true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const show = (delay, style={}) => ready ? {
    animation: `fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
    ...style,
  } : { opacity:0, ...style };

  return (
    <section ref={sectionRef} style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:"120px 24px 80px", position:"relative", overflow:"hidden",
    }}>
      {/* Canvas particle field */}
      <HeroCanvas />

      {/* Big ambient glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", translate:"-50% -50%", width:"min(800px,120vw)", height:"min(800px,120vw)", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(176,106,255,0.12) 0%, transparent 65%)", pointerEvents:"none", zIndex:1 }} />

      {/* Rotating ring (desktop) */}
      <RotatingRing />

      {/* Left accent line */}
      <div className="float-emoji" style={{ position:"absolute", left:"6%", top:"30%", width:1, height:180, background:"linear-gradient(180deg, transparent, rgba(176,106,255,0.4), transparent)", zIndex:1 }} />
      <div className="float-emoji" style={{ position:"absolute", left:"6%", top:"30%", width:5, height:5, borderRadius:"50%", background:"#b06aff", boxShadow:"0 0 12px #b06aff", top:"30%", animation:"floatDot 4s ease-in-out infinite", zIndex:1 }} />

      {/* Content */}
      <div ref={contentRef} style={{ position:"relative", zIndex:2, transition:"transform 0.15s ease-out", maxWidth:760, width:"100%" }}>

        {/* Badge */}
        <div style={show(0.05, { display:"inline-flex", alignItems:"center", gap:8, background:"rgba(176,106,255,0.12)", border:"1px solid rgba(176,106,255,0.35)", borderRadius:100, padding:"7px 20px", fontSize:13, color:C.purple, fontWeight:700, marginBottom:32, letterSpacing:0.5 })}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:C.purple, display:"inline-block", boxShadow:"0 0 8px #b06aff", animation:"pulse 2s ease-in-out infinite" }} />
          Студия танцев в центре города
        </div>

        {/* Kinetic headline */}
        {ready && (
          <h1 style={{ fontSize:"clamp(40px, 8vw, 88px)", fontWeight:900, lineHeight:1.02, marginBottom:24, color:C.text, letterSpacing:"-2.5px", userSelect:"none" }}>
            <div><KineticWord word="Танцуй." delay={0.12} /></div>
            <div><KineticWord word="Чувствуй." colored delay={0.28} /></div>
            <div><KineticWord word="Живи." delay={0.48} /></div>
          </h1>
        )}
        {!ready && <h1 style={{ fontSize:"clamp(40px, 8vw, 88px)", fontWeight:900, lineHeight:1.02, marginBottom:24, opacity:0 }}>.</h1>}

        <p style={show(0.72, { fontSize:"clamp(15px, 2.5vw, 18px)", color:C.muted, maxWidth:520, lineHeight:1.75, marginBottom:44, margin:"0 auto 44px" })}>
          Школа танцев для взрослых и детей. High Heels, Street Dance,<br className="float-emoji" /> Балет, Belly Dance — найди своё.
        </p>

        <div className="hero-btns" style={show(0.85, { display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", marginBottom:64 })}>
          <button className="btn-grad" onClick={onCTA} style={{ fontSize:16, padding:"17px 44px", position:"relative", overflow:"hidden" }}>
            <span style={{ position:"relative", zIndex:1 }}>Записаться на пробное</span>
          </button>
          <a href="#расписание" className="btn-ghost" style={{ fontSize:16, padding:"17px 40px" }}>Смотреть расписание →</a>
        </div>

        {/* Stats */}
        <div className="stat-row" style={show(1.0, { display:"flex", gap:0, justifyContent:"center", flexWrap:"wrap", borderTop:"1px solid rgba(176,106,255,0.15)", paddingTop:32 })}>
          {[["500+","учеников"],["8","направлений"],["3","педагога"],["5★","рейтинг"]].map(([n,l], i) => (
            <div key={l} style={{ textAlign:"center", padding:"0 32px", borderRight: i < 3 ? "1px solid rgba(176,106,255,0.15)" : "none" }}>
              <div style={{ fontSize:28, fontWeight:900, background:`linear-gradient(90deg,${C.purple},${C.pink})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{n}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4, letterSpacing:0.5, textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={show(1.2, { position:"absolute", bottom:32, left:"50%", translate:"-50% 0", display:"flex", flexDirection:"column", alignItems:"center", gap:6, color:C.muted, fontSize:12, letterSpacing:1, textTransform:"uppercase", zIndex:2 })}>
        <span>Скролл</span>
        <div style={{ width:1, height:40, background:`linear-gradient(180deg, ${C.purple}, transparent)`, animation:"scrollLine 1.8s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* TICKER */
function Ticker() {
  const items = [...TICKER, ...TICKER, ...TICKER, ...TICKER];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"14px 0", background:"rgba(176,106,255,0.04)" }}>
      <div style={{ display:"flex", animation:"marquee 20s linear infinite", width:"max-content" }}>
        {items.map((item, i) => (
          <span key={i} style={{ color:C.muted, fontSize:13, fontWeight:600, letterSpacing:2, textTransform:"uppercase", padding:"0 28px", whiteSpace:"nowrap" }}>
            {item} <span style={{ color:C.purple }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* SECTION HEADING */
function SecHead({ tag, title, sub, color = C.purple }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ textAlign:"center", marginBottom:52 }}>
      <div style={{ color, fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>{tag}</div>
      <h2 className="sec-h2" style={{ fontSize:42, fontWeight:900, color:C.text, letterSpacing:"-1px", marginBottom: sub ? 14 : 0 }}>{title}</h2>
      {sub && <p style={{ color:C.muted, fontSize:17, maxWidth:460, margin:"0 auto" }}>{sub}</p>}
    </div>
  );
}

/* DIRECTIONS */
function Directions({ onCTA }) {
  const [hov, setHov] = useState(null);
  const refs = useStagger(DIRECTIONS.length);
  return (
    <section id="направления" className="sec" style={{ padding:"100px 40px" }}>
      <SecHead tag="Направления" title="Найди своё направление" sub="Каждое занятие — шаг к лучшей версии себя" />
      <div className="dir-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:22, maxWidth:1100, margin:"0 auto" }}>
        {DIRECTIONS.map((d, i) => (
          <div key={d.id} ref={el => refs.current[i] = el} className="reveal card-lift"
            onMouseEnter={() => setHov(d.id)} onMouseLeave={() => setHov(null)}
            style={{
              background: hov===d.id ? C.cardHover : C.card,
              border: hov===d.id ? `1px solid ${d.color}50` : `1px solid ${C.border}`,
              borderRadius:20, padding:"28px 24px 24px",
              boxShadow: hov===d.id ? `0 16px 48px ${d.color}18` : "none",
              transform: hov===d.id ? "translateY(-6px)" : "none",
              cursor:"pointer",
            }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <span style={{ fontSize:34, display:"block", transition:"transform 0.3s", transform: hov===d.id ? "scale(1.2) rotate(-6deg)" : "none" }}>{d.emoji}</span>
              <span style={{ background:`${d.color}18`, border:`1px solid ${d.color}40`, color:d.color, borderRadius:100, fontSize:12, fontWeight:700, padding:"4px 12px" }}>{d.age}</span>
            </div>
            <h3 style={{ fontSize:21, fontWeight:800, color:C.text, marginBottom:10 }}>{d.name}</h3>
            <p style={{ color:C.muted, fontSize:14, lineHeight:1.65, marginBottom:20 }}>{d.desc}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:16, borderTop:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize:12, color:C.muted, marginBottom:3 }}>📅 {d.schedule}</div>
                <div style={{ fontSize:16, fontWeight:700, color:d.color }}>{d.price}</div>
              </div>
              <button onClick={onCTA} style={{
                background:`${d.color}18`, border:`1px solid ${d.color}40`, color:d.color,
                borderRadius:100, fontSize:13, fontWeight:700, padding:"8px 20px", cursor:"pointer",
                transition:"background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${d.color}30`}
                onMouseLeave={e => e.currentTarget.style.background = `${d.color}18`}
              >Записаться</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* SCHEDULE */
function Schedule() {
  const [filter, setFilter] = useState("Все");
  const dirs = ["Все", ...new Set(SCHEDULE.flatMap(d => d.items.map(i => i.dir)))];
  return (
    <section id="расписание" className="sec" style={{ padding:"100px 40px", background:"linear-gradient(180deg, transparent, rgba(176,106,255,0.04), transparent)" }}>
      <SecHead tag="Расписание" title="Расписание занятий" />
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:36, flexWrap:"wrap" }}>
        {dirs.map(d => (
          <button key={d} onClick={() => setFilter(d)} style={{
            background: filter===d ? `linear-gradient(135deg, ${C.purple}, ${C.pink})` : "transparent",
            border: filter===d ? "none" : `1px solid ${C.border}`,
            color: filter===d ? "#fff" : C.muted,
            borderRadius:100, fontSize:13, fontWeight:600, padding:"8px 20px", cursor:"pointer",
            transition:"all 0.2s",
          }}>{d}</button>
        ))}
      </div>
      <div className="sch-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))", gap:18, maxWidth:1100, margin:"0 auto" }}>
        {SCHEDULE.map(day => {
          const filtered = filter==="Все" ? day.items : day.items.filter(i => i.dir===filter);
          if (!filtered.length) return null;
          return (
            <div key={day.day} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden", animation:"fadeUp 0.4s ease both" }}>
              <div style={{ padding:"13px 18px", borderBottom:`1px solid ${C.border}`, background:"rgba(176,106,255,0.05)" }}>
                <span style={{ fontSize:14, fontWeight:700, color:C.text }}>{day.day}</span>
              </div>
              <div style={{ padding:12, display:"flex", flexDirection:"column", gap:8 }}>
                {filtered.map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:`${item.color}10`, border:`1px solid ${item.color}25`, borderRadius:10 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:item.color, minWidth:44 }}>{item.time}</span>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{item.dir}</div>
                      <div style={{ fontSize:12, color:C.muted }}>{item.teacher}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* TEACHERS */
function Teachers() {
  const refs = useStagger(TEACHERS.length);
  return (
    <section id="преподаватели" className="sec" style={{ padding:"100px 40px" }}>
      <SecHead tag="Команда" title="Наши преподаватели" />
      <div className="tea-grid" style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" }}>
        {TEACHERS.map((t, i) => (
          <div key={t.id} ref={el => refs.current[i] = el} className="reveal card-lift" style={{
            background:C.card, border:`1px solid ${C.border}`, borderRadius:20,
            padding:32, width:280, textAlign:"center",
            transition:"transform 0.28s, box-shadow 0.28s, border-color 0.28s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = `${t.color}50`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = C.border; }}
          >
            <div style={{
              width:88, height:88, borderRadius:"50%",
              background:`linear-gradient(135deg, ${t.color}60, ${t.color}20)`,
              border:`2px solid ${t.color}60`,
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 20px",
              fontSize:26, fontWeight:800, color:t.color,
              animation:`float 5s ease-in-out infinite ${i*1.5}s`,
            }}>{t.initials}</div>
            <h3 style={{ fontSize:18, fontWeight:800, color:C.text, marginBottom:6 }}>{t.name}</h3>
            <p style={{ fontSize:13, color:C.muted, marginBottom:16 }}>{t.exp}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center" }}>
              {t.dirs.map(d => (
                <span key={d} style={{ background:`${t.color}15`, border:`1px solid ${t.color}30`, color:t.color, borderRadius:100, fontSize:12, fontWeight:600, padding:"4px 12px" }}>{d}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* PRICES */
function Prices({ onCTA }) {
  const refs = useStagger(PRICES.length);
  return (
    <section id="цены" className="sec" style={{ padding:"100px 40px", background:"linear-gradient(180deg, transparent, rgba(255,91,167,0.04), transparent)" }}>
      <SecHead tag="Цены" title="Прозрачные цены" color={C.pink} />
      <div className="pri-grid" style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap", maxWidth:960, margin:"0 auto" }}>
        {PRICES.map((p, i) => (
          <div key={p.type} ref={el => refs.current[i] = el} className="reveal card-lift" style={{
            background: p.hot ? `linear-gradient(135deg, rgba(176,106,255,0.15), rgba(255,91,167,0.1))` : C.card,
            border: p.hot ? `1.5px solid rgba(176,106,255,0.5)` : `1px solid ${C.border}`,
            borderRadius:20, padding:"32px 22px", width:218, textAlign:"center", position:"relative",
            transition:"transform 0.28s, box-shadow 0.28s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 12px 36px rgba(176,106,255,0.2)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {p.hot && (
              <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${C.purple},${C.pink})`, borderRadius:100, fontSize:11, fontWeight:700, color:"#fff", padding:"4px 14px", whiteSpace:"nowrap" }}>Популярное</div>
            )}
            <div style={{ fontSize:13, color:C.muted, marginBottom:12 }}>{p.type}</div>
            <div style={{ fontSize:28, fontWeight:900, color:C.text, marginBottom:8 }}>{p.price}</div>
            <div style={{ fontSize:12, color: p.hot ? C.purple : C.muted, marginBottom:24 }}>{p.note}</div>
            <button onClick={onCTA} className={p.hot ? "btn-grad" : ""} style={{
              background: p.hot ? undefined : "transparent",
              border: p.hot ? undefined : `1px solid ${C.border}`,
              color: p.hot ? undefined : C.muted,
              borderRadius:100, fontSize:13, fontWeight:700, padding:"10px", width:"100%", cursor:"pointer",
              transition:"all 0.2s",
            }}>Выбрать</button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* REVIEWS */
function Reviews() {
  const refs = useStagger(REVIEWS.length);
  return (
    <section className="sec" style={{ padding:"100px 40px" }}>
      <SecHead tag="Отзывы" title="Что говорят ученики" />
      <div className="rev-grid" style={{ display:"flex", gap:22, justifyContent:"center", flexWrap:"wrap" }}>
        {REVIEWS.map((r, i) => (
          <div key={r.id} ref={el => refs.current[i] = el} className="reveal card-lift" style={{
            background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:28, maxWidth:340,
            transition:"transform 0.28s, border-color 0.28s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `${C.purple}50`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = C.border; }}
          >
            <div style={{ color:C.purple, fontSize:18, marginBottom:14, letterSpacing:3 }}>★★★★★</div>
            <p style={{ color:C.text, fontSize:15, lineHeight:1.7, marginBottom:20 }}>"{r.text}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${C.purple},${C.pink})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, color:"#fff", flexShrink:0 }}>{r.name[0]}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{r.name}</div>
                <div style={{ fontSize:12, color:C.muted }}>{r.dir}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* CTA */
function CTASection({ onCTA }) {
  const ref = useReveal();
  return (
    <section id="контакты" className="sec" style={{ padding:"80px 40px" }}>
      <div ref={ref} className="reveal cta-inner" style={{
        maxWidth:900, margin:"0 auto",
        background:`linear-gradient(135deg, rgba(176,106,255,0.15), rgba(255,91,167,0.1))`,
        border:`1px solid rgba(176,106,255,0.3)`, borderRadius:28, padding:"64px 48px", textAlign:"center",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(ellipse, rgba(176,106,255,0.25) 0%, transparent 70%)`, animation:"pulse 5s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:`radial-gradient(ellipse, rgba(255,91,167,0.18) 0%, transparent 70%)`, animation:"pulse 7s ease-in-out infinite 2s", pointerEvents:"none" }} />
        <h2 style={{ fontSize:"clamp(26px, 5vw, 44px)", fontWeight:900, color:C.text, letterSpacing:"-1.5px", marginBottom:16, position:"relative" }}>Попробуй бесплатно</h2>
        <p style={{ color:C.muted, fontSize:"clamp(15px, 2.5vw, 18px)", marginBottom:36, maxWidth:420, margin:"0 auto 36px", position:"relative" }}>Запишись на первое пробное занятие и почувствуй разницу</p>
        <button className="btn-grad" onClick={onCTA} style={{ fontSize:17, padding:"18px 48px", marginBottom:40, position:"relative" }}>Записаться сейчас</button>
        <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", position:"relative" }}>
          {[["📍","ул. Центральная 12, ТЦ Аврора"],["📞","+7 (900) 123-45-67"],["⏰","Пн-Вс 8:00 – 22:00"]].map(([icon,text]) => (
            <div key={text} style={{ display:"flex", alignItems:"center", gap:8, color:C.muted, fontSize:14 }}>
              {icon} {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, padding:"32px 40px" }}>
      <div className="footer-in" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:18, fontWeight:800, background:`linear-gradient(90deg,${C.purple},${C.pink})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>VIBE</span>
          <span style={{ color:C.muted, fontSize:12 }}>Dance Studio © 2025</span>
        </div>
        <div style={{ display:"flex", gap:22, flexWrap:"wrap", justifyContent:"center" }}>
          {["VK","Telegram","WhatsApp","Instagram"].map(s => (
            <a key={s} href="#" style={{ color:C.muted, fontSize:13, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.purple}
              onMouseLeave={e => e.target.style.color = C.muted}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* LEAD FORM */
function LeadForm({ onClose }) {
  const [form, setForm] = useState({ name:"", phone:"", direction:"", comment:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!form.name || !form.phone) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  if (sent) return (
    <div style={{ textAlign:"center", padding:"32px 0", animation:"fadeIn 0.4s ease" }}>
      <div style={{ fontSize:52, marginBottom:20, animation:"float 3s ease-in-out infinite" }}>🎉</div>
      <h3 style={{ fontSize:24, fontWeight:800, color:C.text, marginBottom:10 }}>Заявка отправлена!</h3>
      <p style={{ color:C.muted, marginBottom:28 }}>Мы свяжемся с вами в течение 30 минут</p>
      <button className="btn-grad" onClick={onClose} style={{ fontSize:15, padding:"12px 32px" }}>Готово</button>
    </div>
  );

  return (
    <div>
      <h3 style={{ fontSize:24, fontWeight:800, color:C.text, marginBottom:6 }}>Записаться на пробное</h3>
      <p style={{ color:C.muted, fontSize:15, marginBottom:24 }}>Первое занятие бесплатно при записи сейчас</p>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <input type="text"  placeholder="Ваше имя"  value={form.name}   onChange={e => setForm({...form, name:e.target.value})} />
        <input type="tel"   placeholder="Телефон"    value={form.phone}  onChange={e => setForm({...form, phone:e.target.value})} />
        <select value={form.direction} onChange={e => setForm({...form, direction:e.target.value})}>
          <option value="">Выберите направление</option>
          {DIRECTIONS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
        </select>
        <textarea rows={3} placeholder="Комментарий (необязательно)" value={form.comment} onChange={e => setForm({...form, comment:e.target.value})} style={{ resize:"none" }} />
        <button className="btn-grad" onClick={submit} style={{ fontSize:16, padding:"16px", marginTop:4, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {loading && <span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite", display:"inline-block" }} />}
          {loading ? "Отправляем…" : "Отправить заявку"}
        </button>
      </div>
    </div>
  );
}

/* MODAL */
function Modal({ open, onClose, children }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"overlayIn 0.25s ease" }}>
      <div onClick={e => e.stopPropagation()} className="modal-box" style={{
        background:C.card, border:`1px solid ${C.border}`, borderRadius:24,
        padding:"40px", maxWidth:480, width:"100%", position:"relative",
        animation:"modalIn 0.3s ease",
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:18, right:18,
          background:"rgba(255,255,255,0.08)", border:"none", color:C.muted,
          borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:16,
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
        >✕</button>
        {children}
      </div>
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────── */
export default function App() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background:C.bg, minHeight:"100vh", overflowX:"hidden" }}>
        <Navbar onCTA={() => setModal(true)} />
        <Hero onCTA={() => setModal(true)} />
        <Ticker />
        <Directions onCTA={() => setModal(true)} />
        <Schedule />
        <Teachers />
        <Prices onCTA={() => setModal(true)} />
        <Reviews />
        <CTASection onCTA={() => setModal(true)} />
        <Footer />
        <Modal open={modal} onClose={() => setModal(false)}>
          <LeadForm onClose={() => setModal(false)} />
        </Modal>
      </div>
    </>
  );
}