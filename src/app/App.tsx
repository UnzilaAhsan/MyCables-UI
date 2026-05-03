import { useState, useEffect } from "react";
import logoImg from "../imports/LOGO.jpeg";
import logo1Img from "../imports/logo1.jpeg";
import wireImg from "../imports/WIRE.jpeg";
import coilsImg from "../imports/COILS.jpeg";
import machineImg from "../imports/MACHINE.jpeg";
import copperImg from "../imports/copper_pure.jpeg";
import ceoImg from "../imports/ceo.jpg";
import cableCrossSectionImg from "../imports/WhatsApp_Image_2026-04-17_at_7.15.46_PM-1.jpeg";
import labeledCoilsImg from "../imports/WhatsApp_Image_2026-04-17_at_9.03.51_PM-1.jpeg";
import redCableImg from "../imports/WhatsApp_Image_2026-04-17_at_9.23.20_PM-1.jpeg";
import partnershipImg1 from "../imports/WhatsApp_Image_2026-04-20_at_8.12.09_PM-1.jpeg";
import partnershipImg2 from "../imports/WhatsApp_Image_2026-04-20_at_8.12.07_PM-1.jpeg";
import partnershipImg3 from "../imports/WhatsApp_Image_2026-04-20_at_8.12.08_PM_(1)-1.jpeg";
import partnershipImg4 from "../imports/WhatsApp_Image_2026-04-20_at_8.12.08_PM_(2)-1.jpeg";
import satparaDam from "../imports/satpara_dam.webp"
import miraniDam from "../imports/mirani_dam.jpg"
import manglaDam from "../imports/mangla_dam.jpg"
import emporium from "../imports/emporium.jpg"
import margalla from "../imports/margalla.webp"
import unilever from "../imports/unilever.png"
import descon from "../imports/descon.webp"
import industry from "../imports/industry.avif"
import commerce from "../imports/commerce.webp"
import insulation from "../imports/insulation.jpeg"
import isbPresident from "../imports/isb_pres.jpeg"
import logoFooter from "../imports/logo_footer.png"
import flexibleCable from "../imports/flexible_cable.jpeg"
import submersibleCable from "../imports/Submersible_cable.jpeg"
import houseWiringCable from "../imports/house_wiring_cable.jpeg"
import internetCable from "../imports/internet_cable.jpeg"
import solarCable from "../imports/solar_cable.png"
import powerCable from "../imports/power_cable.jpeg"
import controlCable from "../imports/control_cable.jpeg"
import XLP from "../imports/XLP.jpeg"
import overheadConductor from "../imports/overhead_cond.jpg"
import coaxialCable from "../imports/coaxial_cable.jpg"
import fiberOptic from "../imports/fiber_optic.webp"
import armouredCable from "../imports/armoured_cable.jpg"
import homeBackground from "../imports/home_background.png"

// ─── PRODUCT IMAGES ───────────────────────────────────────────────────────────
// Replace each value below with the correct import for that product.
// e.g.: import pvcImg from "../imports/pvc_cable.jpeg";
// then set image: pvcImg  in the products array.
const PLACEHOLDER_IMAGE = copperImg; // temporary – swap per product when ready
// ─────────────────────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ProductModal {
  name: string;
  desc: string;
  voltage: string;
  image: string;
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [logoSlideIn, setLogoSlideIn] = useState(false);
  const [sloganVisible, setSloganVisible] = useState(false);
  const [themeTransition, setThemeTransition] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModal | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    const animationFrame = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          if (newX < 0 || newX > window.innerWidth) p.speedX *= -1;
          if (newY < 0 || newY > window.innerHeight) p.speedY *= -1;

          return { ...p, x: newX, y: newY };
        }),
      );
    }, 50);

    return () => clearInterval(animationFrame);
  }, [introComplete]);

  useEffect(() => {
    const timer1 = setTimeout(() => setLogoSlideIn(true), 300);
    const timer2 = setTimeout(() => setSloganVisible(true), 1500);
    const timer3 = setTimeout(() => setThemeTransition(100), 1900);
    const timer4 = setTimeout(() => setIntroComplete(true), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  const products = [
    {
      name: "Power Cable",
      desc: "Single & multi-core for general wiring",
      voltage: "450/750V, 0.6/1kV",
      image: powerCable, 
    },
    {
      name: "XLPE Power Cables",
      desc: "High-performance transmission",
      voltage: "Up to 33kV",
      image: XLP,
    },
    {
      name: "Flexible Cables",
      desc: "Machinery & movable equipment",
      voltage: "300/500V",
      image: flexibleCable,
    },
    {
      name: "Armoured Cables",
      desc: "Steel wire for underground",
      voltage: "0.6/1kV, 1.9/3.3kV",
      image: armouredCable,
    },
    {
      name: "Control Cables",
      desc: "Instrumentation & control",
      voltage: "300/500V",
      image: controlCable,
    },
    {
      name: "Submersible Cables",
      desc: "Water-resistant pumps",
      voltage: "1.1kV",
      image: submersibleCable,
    },
    {
      name: "House Wire",
      desc: "Residential wiring solutions",
      voltage: "1100V",
      image: labeledCoilsImg,
    },
    {
      name: "Solar Cable",
      desc: "Durable, weather-resistant, UV-resistant, heat-tolerant, and highly insulated for safe outdoor use.",
      voltage: "0.6/1kV",
      image: solarCable,
    },
    {
      name: "Coaxial Cable",
      desc: "shielded, low signal loss, interference-resistant, suitable for high-frequency transmission.",
      voltage: "450/750V, 0.6/1kV",
      image: coaxialCable,
    },
    {
      name: "Internet Cable",
      desc: "high-speed data transmission, low latency, reliable, interference-resistant.",
      voltage: "Up to 33kV",
      image: internetCable,
    },
    {
      name: "Fiber Optic Cable",
      desc: "ultra-high speed, very low signal loss, immune to electromagnetic interference, long-distance transmission.",
      voltage: "300/500V",
      image: fiberOptic,
    },
    {
      name: "Overhead Conductor",
      desc: "high conductivity, lightweight, weather-exposed, long-distance power transmission.",
      voltage: "0.6/1kV, 1.9/3.3kV",
      image: overheadConductor,
    },
  ];

  if (!introComplete) {
    const lightness = 5 + themeTransition * 0.9;
    const bgColor = `hsl(220, 15%, ${lightness}%)`;
    const textColor = themeTransition > 50 ? "#1a1a1a" : "#ffffff";

    return (
      <div
        className="fixed inset-0 overflow-hidden transition-colors duration-[2000ms]"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${themeTransition > 50 ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} 1px, transparent 1px),
                linear-gradient(90deg, ${themeTransition > 50 ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              animation: "gridMove 20s linear infinite",
            }}
          />
        </div>

        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: themeTransition > 50 ? "#d97706" : "#fbbf24",
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px ${themeTransition > 50 ? "#d97706" : "#fbbf24"}`,
            }}
          />
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={`mb-10 transition-all duration-[1200ms] ${
              logoSlideIn
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-[80vh] scale-60"
            }`}
            style={{
              filter: `drop-shadow(0 0 30px ${themeTransition > 50 ? "rgba(217, 119, 6, 0.5)" : "rgba(251, 191, 36, 0.7)"})`,
            }}
          >
            <img
              src={logo1Img}
              alt="My Cables Logo"
              className="w-72 max-w-[80vw] h-auto"
            />
          </div>

          <div
            className={`relative transition-all duration-[1200ms] ${
              sloganVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1
              className="text-center tracking-[0.4em] uppercase"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "clamp(18px, 4vw, 28px)",
                fontWeight: 700,
                color: textColor,
                textShadow:
                  themeTransition > 50
                    ? "1px 1px 15px rgba(217, 119, 6, 0.4)"
                    : "1px 1px 20px rgba(251, 191, 36, 0.6)",
              }}
            >
              <span className="inline-block glow-text">DARKNESS</span>{" "}
              <span
                className="inline-block glow-text"
                style={{ animationDelay: "0.2s" }}
              >
                TO
              </span>{" "}
              <span
                className="inline-block glow-text"
                style={{ animationDelay: "0.4s" }}
              >
                BRIGHTNESS
              </span>
            </h1>

            <div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-0.5 transition-all duration-[1500ms]"
              style={{
                height: themeTransition > 0 ? "150px" : "0px",
                background: `linear-gradient(to bottom, ${
                  themeTransition > 50
                    ? "rgba(217, 119, 6, 0.7)"
                    : "rgba(251, 191, 36, 1)"
                }, transparent)`,
                boxShadow: `0 0 30px ${themeTransition > 50 ? "rgba(217, 119, 6, 0.6)" : "rgba(251, 191, 36, 0.8)"}`,
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }

          @keyframes glowPulse {
            0%, 100% {
              opacity: 0.85;
            }
            50% {
              opacity: 1;
            }
          }

          .glow-text {
            animation: glowPulse 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Subtle animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: "#d97706",
              opacity: particle.opacity * 0.15,
            }}
          />
        ))}
      </div>

      {/* Minimal cursor effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div
          className="absolute w-5 h-5 rounded-full transition-all duration-100"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(217, 119, 6, 0.25), transparent)",
          }}
        />
      </div>

      {/* ── Product Image Modal ─────────────────────────────────────────────── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-w-lg w-full"
            style={{ animation: "modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-white hover:bg-amber-600 hover:text-white text-gray-700 shadow-md transition-colors duration-200 z-10 rounded-full"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product image only */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full object-cover"
              style={{ maxHeight: "92vh" }}
            />
          </div>

          <style>{`
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.88) translateY(16px); }
              to   { opacity: 1; transform: scale(1)    translateY(0);    }
            }
          `}</style>
        </div>
      )}

      {/* Professional Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <img
            src={logoImg}
            alt="My Cables"
            className="h-14 sm:h-16"
          />
          <div
            className="hidden md:flex gap-7"
            style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
          >
            {["Home", "About", "Products", "Why Us", "Projects", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium text-[13px] relative group py-1.5"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-200" />
                </a>
              ),
            )}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">
              {["Home", "About", "Products", "Why Us", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileNavOpen(false)}
                  className="py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium text-[14px]"
                  style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url(${homeBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/78 via-white/72 to-white/64" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h1
            className="mb-3 leading-tight text-gray-900"
            style={{
              fontFamily: "Nunito Sans, Calibri, sans-serif",
              fontSize: "clamp(32px, 6vw, 42px)",
              fontWeight: 800,
            }}
          >
            MY CABLES
          </h1>
          <p
            className="mb-5 tracking-[0.25em] text-amber-700"
            style={{
              fontFamily: "Nunito Sans, Calibri, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            DARKNESS TO BRIGHTNESS
          </p>
          <p
            className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-7"
            style={{
              fontFamily: "Nunito Sans, Calibri, sans-serif",
              fontWeight: 400,
            }}
          >
            Pakistan's premier electrical cable manufacturer, delivering
            world-class quality solutions for industrial, commercial, and
            residential infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-amber-600 text-white font-semibold text-[13px] hover:bg-amber-700 transition-all duration-200 hover:shadow-md"
              style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
            >
              Request Quote
            </a>
            <a
              href="#products"
              className="px-5 py-2.5 border border-gray-800 text-gray-800 font-semibold text-[13px] hover:bg-gray-800 hover:text-white transition-all duration-200"
              style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
            >
              View Products
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <h2
                className="mb-3 text-gray-900"
                style={{
                  fontFamily: "Nunito Sans, Calibri, sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                About My Cables
              </h2>
              <div
                className="space-y-3 text-[14px] text-gray-700 leading-relaxed mb-6"
                style={{
                  fontFamily: "Nunito Sans, Calibri, sans-serif",
                  fontWeight: 400,
                }}
              >
                <p>
                  My Cables is a leading electrical cable manufacturer in
                  Pakistan, committed to delivering exceptional quality and
                  reliability. With decades of expertise, we power the nation's
                  critical infrastructure and commercial projects.
                </p>
                <p>
                  Our extensive portfolio spans diverse sectors, ensuring every
                  project receives premium cable solutions engineered for
                  performance, safety, and longevity.
                </p>
              </div>

              <h3
                className="mt-6 mb-3 text-gray-800"
                style={{
                  fontFamily: "Nunito Sans, Calibri, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Industries We Serve
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  "Flour Mills",
                  "Sugar Mills",
                  "Hydroelectric Dams",
                  "Housing Societies",
                  "Shopping Malls",
                  "Commercial Centers",
                  "Mechanical Industries",
                  "Manufacturing",
                  "Pharmaceutical",
                  "Textile Industries",
                  "Food Processing",
                  "Power Distribution",
                ].map((sector) => (
                  <div
                    key={sector}
                    className="border border-gray-300 px-2 py-1.5 text-center text-[11px] hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: "Nunito Sans, Calibri, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 relative group">
              <div className="overflow-hidden shadow-lg">
                <img
                  src={logo1Img}
                  alt="My Cables Products"
                  className="w-full h-[280px] sm:h-[340px] lg:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="mb-2 text-gray-900"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Our Product Range
            </h2>
            <p
              className="text-gray-600 max-w-xl mx-auto"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Comprehensive electrical cable solutions for every application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {products.map((product, i) => (
              <div
                key={i}
                className="border border-gray-200 p-4 hover:border-amber-600 hover:shadow-md transition-all duration-200 group bg-white cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="w-10 h-10 bg-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3
                  className="mb-1.5 text-gray-900 group-hover:text-amber-700 transition-colors"
                  style={{
                    fontFamily: "Nunito Sans, Calibri, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-gray-600 text-[12px] mb-2"
                  style={{
                    fontFamily: "Nunito Sans, Calibri, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {product.desc}
                </p>
                <p
                  className="text-amber-600 text-[11px] font-semibold"
                  style={{
                    fontFamily: "Nunito Sans, Calibri, sans-serif",
                  }}
                >
                  {product.voltage}
                </p>
                {/* Click hint */}
                <p
                  className="mt-2 text-[10px] text-gray-400 group-hover:text-amber-500 transition-colors flex items-center gap-1"
                  style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View details
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative overflow-hidden group h-40">
              <img
                src={copperImg}
                alt="Cable Cross Section"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p
                  className="text-white font-semibold text-[13px]"
                  style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
                >
                  99.9% Pure Copper Core
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden group h-40">
              <img
                src={insulation}
                alt="Quality Manufacturing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p
                  className="text-white font-semibold text-[13px]"
                  style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
                >
                  Advanced PVC/XLPE Insulation
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden group h-40">
              <img
                src={labeledCoilsImg}
                alt="Quality Manufacturing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p
                  className="text-white font-semibold text-[13px]"
                  style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
                >
                  ISO Certified Manufacturing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-us"
        className="relative py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="mb-2"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Why Choose My Cables
            </h2>
            <p
              className="text-gray-300 max-w-xl mx-auto"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Quality for money - Trusted excellence in every meter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "99.9% Pure Copper",
                desc: "Electrolytic-grade copper for maximum conductivity",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "International Standards",
                desc: "IEC, BS, ASTM certified manufacturing",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Superior Insulation",
                desc: "Heat-resistant PVC and XLPE protection",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                ),
                title: "Fire Retardant",
                desc: "Self-extinguishing safety features",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Long Service Life",
                desc: "Engineered for durability up to 90°C",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Competitive Pricing",
                desc: "Best value without compromising quality",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10"
              >
                <div className="text-amber-500 flex-shrink-0">{item.icon}</div>
                <div>
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: "Nunito Sans, Calibri, sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-300 text-[13px]"
                    style={{
                      fontFamily: "Nunito Sans, Calibri, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="mb-2 text-gray-900"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Landmark Projects
            </h2>
            <p
              className="text-gray-600 max-w-xl mx-auto"
              style={{
                fontFamily: "Nunito Sans, Calibri, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Powering Pakistan's critical infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Satpara Dam", client: "WAPDA", category: "Hydroelectric", image: satparaDam },
              { name: "Mirani Dam", client: "WAPDA", category: "Infrastructure", image: miraniDam },
              { name: "Mangla Dam", client: "WAPDA", category: "Power Generation", image: manglaDam },
              { name: "Emporium Mall", client: "Nishat Group", category: "Commercial", image: emporium },
              { name: "Margalla Housing", client: "Residential Complex", category: "Housing Society", image: margalla },
              { name: "Unilever Pakistan", client: "Manufacturing Facility", category: "Industrial", image: unilever },
              { name: "Descon Engineering", client: "Multiple Projects", category: "Engineering", image: descon },
              { name: "Industrial Zones", client: "Various Clients", category: "Manufacturing", image: industry },
              { name: "Commercial Centers", client: "Nationwide", category: "Retail", image: commerce },
            ].map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden bg-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-white">
                  <p
                    className="text-[10px] uppercase tracking-wider text-amber-400 mb-0.5"
                    style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}
                  >
                    {project.category}
                  </p>
                  <h3
                    className="mb-0.5 group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: "16px", fontWeight: 600 }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-[12px] text-gray-300"
                    style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 400 }}
                  >
                    {project.client}
                  </p>
                </div>

                <div className="absolute top-0 left-0 w-1 h-0 bg-amber-600 group-hover:h-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Partnerships */}
      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="mb-2 text-gray-900"
              style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: "28px", fontWeight: 700 }}
            >
              Global Partnerships
            </h2>
            <p
              className="text-gray-600 max-w-xl mx-auto"
              style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: "14px", fontWeight: 400 }}
            >
              International collaboration for technology excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { image: partnershipImg1, caption: "International Partnership" },
              { image: partnershipImg2, caption: "Technology Transfer" },
              { image: partnershipImg3, caption: "Business Collaboration" },
              { image: partnershipImg4, caption: "Strategic Alliance" },
            ].map((partner, i) => (
              <div
                key={i}
                className="group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p
                      className="text-[12px] font-semibold"
                      style={{ fontFamily: "Nunito Sans, Calibri, sans-serif" }}
                    >
                      {partner.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative py-16 bg-gradient-to-br from-gray-900 to-black text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2
                className="mb-3"
                style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: "28px", fontWeight: 700 }}
              >
                Contact Us
              </h2>
              <p
                className="text-gray-300 mb-6 leading-relaxed"
                style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: "14px", fontWeight: 400 }}
              >
                Get in touch for quotes, technical support, or partnership inquiries.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>Phone</p>
                    <p className="text-base" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>+92 321 4395441</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>Email</p>
                    <p className="text-base break-all" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>mycablez32@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: 15, fontWeight: 700 }}>Chief Executive Officer</p>
                    <p className="text-base font-semibold" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: 20 }}>Muhammad Ahsan Jamil Bhatti</p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>Head Office</p>
                    <p className="text-base font-semibold" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: 12 }}>441-J2 Johar Town, Lahore.</p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>Display Office - Lahore</p>
                    <p className="text-base font-semibold" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: 12 }}>
                      6-Shah Jahan Road, Near Habib Bank, Bilal Ganj, Lower Mall Lahore.<br />
                      Contact:<br />+92 344 2973224<br />Gulzar Ahmad
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>Islamabad Office</p>
                    <p className="text-base font-semibold" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: 12 }}>
                      General Electronics Block # 50 Office # 1, I & T Center, Sect G8/1, Islamabad<br />
                      Contact:<br />+92 321 8508090<br />
                      Nasir Mehmood Chaudhary (Vice President - Islamabad Chamber of Commerce)<br />
                      <img
                        src={isbPresident}
                        alt="Nasir Mehmood Chaudhary"
                        className="mt-3 w-16 h-16 object-cover rounded border-2 border-amber-600"
                      />
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-amber-400 mb-0.5" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}>Burewala Office</p>
                    <p className="text-base font-semibold" style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontSize: 12 }}>
                      96 Canal View Society Opposite Mujahid Colony, lahore Road, Burewala<br />
                      Contact:<br />+92 337 6014252<br />sbinrauf@gmail.com<br />Saad Bin Rauf
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:sticky lg:top-6">
              <div className="relative mx-auto w-full max-w-sm sm:max-w-md overflow-hidden rounded border-2 border-amber-600">
                <img
                  src={ceoImg}
                  alt="CEO Muhammad Ahsan Jamil Bhatti"
                  className="w-full aspect-square object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img src={logoFooter} alt="My Cables" className="h-20 sm:h-24 mx-auto mb-3 opacity-70" />
          <p
            className="text-amber-500 mb-2 tracking-widest uppercase text-[11px]"
            style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 600 }}
          >
            Darkness to Brightness
          </p>
          <p
            className="text-gray-500 text-[12px]"
            style={{ fontFamily: "Nunito Sans, Calibri, sans-serif", fontWeight: 400 }}
          >
            © 2005 My Cables. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}