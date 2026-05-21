import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { colors as defaultColors } from "@/lib/colors";
export default function Hero({ theme }) {
    const t = theme ?? defaultColors;
    const isHex = (s) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
    const hexToRgb = (hex) => {
        const h = hex.replace('#', '');
        if (h.length === 3) {
            return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
        }
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    };
    const isColorDark = (col) => {
        try {
            if (isHex(col)) {
                const [r, g, b] = hexToRgb(col);
                const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                return lum < 0.5;
            }
            // fallback: consider dark if contains low-light keywords
            if (/rgba?\(/i.test(col)) {
                const nums = col.replace(/rgba?\(|\)|\s/g, '').split(',').map(Number);
                const [r, g, b] = nums;
                const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                return lum < 0.5;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    };
    const isDark = isColorDark(String(t.background));
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 }, className: "text-center pt-20 md:pt-28 pb-8 px-4", children: [_jsx("style", { children: `
        @keyframes blinkCursor { 0% { opacity: 1 } 50% { opacity: 0 } 100% { opacity: 1 } }
        .blink-cursor { display: inline-block; margin-left: 6px; width: 8px; animation: blinkCursor 1s steps(1) infinite; }
        @media (max-width: 768px) {
          .mobile-translate-x-20 { transform: translateX(5rem) !important; }
        }
      ` }), _jsxs("h1", { className: "text-4xl md:text-7xl font-extrabold leading-tight", children: [_jsx("span", { style: { color: isDark ? '#ededed' : '#2b2b2bed' }, children: "Hi, I'm" }), ' ', (() => {
                        // try to parse two colors from the theme gradientPrimary string
                        const m = String(t.gradientPrimary).match(/linear-gradient\([^,]*,\s*([^,]+)\s*,\s*([^\)]+)\)/i);
                        const id = useId();
                        if (m) {
                            const c1 = m[1].trim();
                            const c2 = m[2].trim();
                            return (_jsxs("svg", { role: "img", "aria-label": "Amogha", className: "inline-block h-[1em] w-auto align-middle mobile-translate-x-20 md:translate-x-0 -translate-y-1 md:translate-y-0", style: { height: '1em', width: 'auto' }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: id, x1: "0%", x2: "100%", y1: "0%", y2: "0%", children: [_jsx("stop", { offset: "0%", stopColor: c1 }), _jsx("stop", { offset: "100%", stopColor: c2 })] }) }), _jsx("text", { x: "0", y: "80%", style: { fontSize: '1em', fontWeight: 800, fontFamily: 'inherit' }, fill: `url(#${id})`, children: "Amogha" })] }));
                        }
                        // fallback to background-clip text if parsing fails
                        return (_jsx("span", { className: "inline-block -translate-y-1 md:translate-y-0", style: {
                                background: t.gradientPrimary,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                                backgroundPosition: '0 0'
                            }, children: "Amogha" }));
                    })()] }), _jsx("div", { className: "h-[2px] w-36 mx-auto mt-3 rounded-full", style: { background: t.tertiary } }), _jsxs("div", { className: "text-lg md:text-2xl mt-6", style: { color: t.secondary }, children: [_jsx("span", { children: _jsx(Typewriter, { options: {
                                strings: [
                                    "AI Engineer",
                                    "Machine Learning Developer",
                                    "Computer Vision Builder",
                                    "Researcher",
                                    "Software Engineer",
                                    "Problem Solver",
                                    "Tech Nerd"
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 50,
                                deleteSpeed: 30,
                            } }) }), _jsx("span", { className: "blink-cursor", style: { background: t.primary } })] })] }));
}
