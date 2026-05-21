import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { colors } from "@/lib/colors";
const navLinks = ["About", "Experience", "Projects", "Contact"];
export default function BYNavbar({ onBack }) {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return (_jsx("header", { className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-md", style: { backgroundColor: colors.navbarBg, borderBottom: `1px solid ${colors.tertiary}` }, children: _jsxs("div", { className: "max-w-6xl mx-auto px-6 h-20 flex items-center justify-between", children: [_jsx("span", { className: "text-lg font-bold tracking-tight", style: { color: colors.primary }, children: "Amogha K." }), _jsx("nav", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => (_jsx("button", { onClick: () => scrollTo(link.toLowerCase()), className: "text-sm transition-colors duration-200", style: { color: colors.secondary }, onMouseEnter: e => (e.currentTarget.style.color = colors.primary), onMouseLeave: e => (e.currentTarget.style.color = colors.secondary), children: link }, link))) }), _jsx("button", { onClick: onBack, className: "px-8 py-3.5 text-lg font-semibold rounded-full shadow-md text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95", style: { backgroundColor: colors.primary }, onMouseEnter: e => (e.currentTarget.style.backgroundColor = colors.accent), onMouseLeave: e => (e.currentTarget.style.backgroundColor = colors.primary), children: "\u2190 Back to Chat" })] }) }));
}
