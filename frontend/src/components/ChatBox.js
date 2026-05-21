import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/api";
import ChatMessage from "./ChatMessage";
import Hero from "./Hero";
import { themePresets } from "@/lib/colors";
import { motion, AnimatePresence } from "framer-motion";
const themeCards = [
    { id: "sunlit-red", label: "Sunlit Red", subtitle: "hot red energy", group: "Light themes" },
    { id: "peach-dream", label: "Peach Dream", subtitle: "soft orange warmth", group: "Light themes" },
    { id: "mint-breeze", label: "Mint Breeze", subtitle: "fresh green calm", group: "Light themes" },
    { id: "sky-spark", label: "Sky Spark", subtitle: "bright blue lift", group: "Light themes" },
    { id: "midnight-plum", label: "Midnight Plum", subtitle: "deep purple glow", group: "Dark themes" },
    { id: "neon-forest", label: "Neon Forest", subtitle: "emerald night pulse", group: "Dark themes" },
    { id: "cobalt-ink", label: "Cobalt Ink", subtitle: "electric blue depth", group: "Dark themes" },
    { id: "ember-night", label: "Ember Night", subtitle: "smoky red heat", group: "Dark themes" },
];
export default function ChatBox({ themeId, onThemeChange, settingsOpen, onSettingsChange }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState("typing");
    const [showQuickQuestions, setShowQuickQuestions] = useState(true);
    const scrollContainerRef = useRef(null);
    const stopRef = useRef(false);
    const loadingTimersRef = useRef([]);
    const theme = themePresets[themeId];
    const isDarkTheme = ["midnight-plum", "neon-forest", "cobalt-ink", "ember-night"].includes(themeId);
    const hasStarted = messages.length > 0 || loading;
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);
    useEffect(() => {
        return () => {
            loadingTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
            loadingTimersRef.current = [];
        };
    }, []);
    useEffect(() => {
        if (!settingsOpen)
            return;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onSettingsChange(false);
            }
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [settingsOpen]);
    const clearLoadingTimers = () => {
        loadingTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
        loadingTimersRef.current = [];
    };
    const startLoadingPrompts = () => {
        clearLoadingTimers();
        setLoadingStage("typing");
        loadingTimersRef.current.push(window.setTimeout(() => {
            if (stopRef.current)
                return;
            setLoadingStage("booting");
        }, 5000));
        loadingTimersRef.current.push(window.setTimeout(() => {
            if (stopRef.current)
                return;
            setLoadingStage("sleepy");
        }, 30000));
        loadingTimersRef.current.push(window.setTimeout(() => {
            if (stopRef.current)
                return;
            setLoadingStage("reboot");
        }, 60000));
    };
    const typeMessage = async (text) => {
        let current = "";
        for (let i = 0; i < text.length; i++) {
            if (stopRef.current)
                break;
            current += text[i];
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "ai", content: current };
                return updated;
            });
            await new Promise((resolve) => setTimeout(resolve, 10));
        }
    };
    const handleSend = async (overrideText) => {
        const text = overrideText ?? input;
        if (!text.trim())
            return;
        stopRef.current = false;
        setShowQuickQuestions(false);
        const userMessage = { role: "user", content: text };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        startLoadingPrompts();
        const res = await sendMessage(text);
        clearLoadingTimers();
        setMessages((prev) => [...prev, { role: "ai", content: "" }]);
        await typeMessage(res.response);
        setLoading(false);
        setLoadingStage("typing");
        setShowQuickQuestions(true);
    };
    const handleStop = () => {
        stopRef.current = true;
        clearLoadingTimers();
        setLoading(false);
        setLoadingStage("typing");
        setShowQuickQuestions(true);
    };
    const quickQuestions = [
        { label: "Me", prompt: "Tell me about Amogha", icon: "👤" },
        { label: "Projects", prompt: "What projects has Amogha built?", icon: "🗂️" },
        { label: "Experience", prompt: "What is Amogha's experience?", icon: "💼" },
        { label: "Skills", prompt: "What are Amogha's skills?", icon: "⚡" },
        { label: "Contact", prompt: "How can I contact Amogha?", icon: "✉️" },
    ];
    const loadingChipClass = isDarkTheme
        ? "rounded-2xl border border-white/15 bg-white/10 px-4 py-2 shadow-lg backdrop-blur-md"
        : "rounded-2xl border border-black/10 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md";
    const loadingChipTextClass = isDarkTheme
        ? "font-mono text-sm tracking-[0.08em]"
        : "font-serif text-sm tracking-[0.04em]";
    const loadingTextStyle = isDarkTheme
        ? { color: "#ffffff" }
        : { color: "#000000" };
    const renderLoadingDots = (dotColor) => (_jsx("span", { className: "inline-flex items-end gap-1.5", "aria-hidden": "true", children: [0, 1, 2].map((index) => (_jsx(motion.span, { className: "h-2.5 w-2.5 rounded-full", style: { backgroundColor: dotColor }, animate: { y: [0, -4, 0], opacity: [0.55, 1, 0.55] }, transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 } }, index))) }));
    return (
    // keep the page-level background in AnimatedBackground so decorative SVGs are visible;
    // make the chat container transparent so the background layer shows through.
    _jsxs("div", { className: "h-screen flex flex-col overflow-hidden relative", style: { backgroundColor: 'transparent' }, children: [_jsx(AnimatePresence, { children: settingsOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-[60]", style: { backdropFilter: "blur(18px)", backgroundColor: "rgba(10, 18, 28, 0.24)" }, onClick: () => onSettingsChange(false) }, "settings-overlay")) }), _jsx(AnimatePresence, { children: settingsOpen && (_jsxs(motion.div, { initial: { opacity: 0, y: 18, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 14, scale: 0.98 }, transition: { duration: 0.25, ease: "easeOut" }, className: "fixed left-3 right-3 top-4 bottom-4 md:inset-x-4 md:top-20 md:bottom-auto md:mx-auto z-[70] w-auto md:w-full max-w-xl overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-6rem)]", style: { backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}` }, children: [_jsxs("div", { className: "sticky top-0 flex items-start justify-between gap-4 px-4 md:px-6 py-4 md:py-5", style: { background: theme.gradientPrimary }, children: [_jsx("div", { children: _jsx("p", { className: "text-lg md:text-2xl font-bold", style: { color: theme.white }, children: "Settings" }) }), _jsx("button", { onClick: () => onSettingsChange(false), className: "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0", style: { backgroundColor: "rgba(255,255,255,0.16)", color: theme.white }, "aria-label": "Close settings" })] }), _jsxs("div", { className: "overflow-y-auto p-4 md:p-6 space-y-5 md:space-y-6", children: [["Light themes", "Dark themes"].map((groupName) => (_jsxs("section", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[11px] md:text-sm font-semibold uppercase tracking-[0.18em]", style: { color: theme.secondary }, children: groupName }), _jsx("p", { className: "text-xs md:text-sm mt-1", style: { color: theme.bodyText }, children: groupName === "Light themes"
                                                        ? "Bright, airy palettes with a softer feel."
                                                        : "High-contrast palettes with richer night colors." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: themeCards
                                                .filter((card) => card.group === groupName)
                                                .map((card) => {
                                                const palette = themePresets[card.id];
                                                const isSelected = themeId === card.id;
                                                const isDarkCard = card.group === "Dark themes";
                                                return (_jsx("button", { onClick: () => onThemeChange(card.id), className: "text-left rounded-2xl p-3 md:p-4 transition-all duration-200", style: {
                                                        backgroundColor: theme.white,
                                                        border: `1.5px solid ${isSelected ? palette.accent : palette.tertiary}`,
                                                        boxShadow: isSelected ? `0 12px 24px ${palette.accent}22` : "none",
                                                        color: palette.primary,
                                                    }, children: _jsxs("div", { className: "flex items-center justify-between gap-2 md:gap-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm md:text-base font-semibold truncate", style: { color: isDarkCard ? (isDarkTheme ? "#b7b7b7" : "#525252") : palette.primary }, children: card.label }), _jsx("p", { className: "text-xs md:text-sm mt-1 leading-tight", style: { color: isDarkCard ? "#9CA3AF" : palette.secondary }, children: card.subtitle })] }), _jsx("div", { className: "flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full shrink-0", style: { background: palette.gradientAvatar, color: palette.white }, children: _jsx("span", { className: "text-base md:text-lg", children: "\u2726" }) })] }) }, card.id));
                                            }) })] }, groupName))), _jsx("div", { className: "flex flex-col gap-3", children: _jsxs("button", { onClick: () => {
                                            stopRef.current = true;
                                            clearLoadingTimers();
                                            setLoading(false);
                                            setLoadingStage("typing");
                                            setInput("");
                                            setMessages([]);
                                            setShowQuickQuestions(true);
                                            onSettingsChange(false);
                                        }, className: "rounded-2xl px-4 py-3 text-left transition-all duration-200", style: {
                                            backgroundColor: theme.background,
                                            border: `1.5px solid ${theme.tertiary}`,
                                            color: theme.primary,
                                        }, children: [_jsx("p", { className: "text-sm md:text-base font-semibold", children: "Clear chat" }), _jsx("p", { className: "text-xs md:text-sm mt-1", style: { color: theme.secondary }, children: "Wipe the conversation and start fresh." })] }) })] })] }, "settings-dialog")) }), _jsx(AnimatePresence, { children: !hasStarted && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.35, ease: "easeIn" } }, className: "absolute inset-0 flex flex-col items-center justify-center -translate-y-16", style: { pointerEvents: "none", zIndex: 1 }, children: _jsx(Hero, { theme: theme }) }, "idle-hero")) }), _jsx(AnimatePresence, { children: hasStarted && (_jsx(motion.div, { initial: { opacity: 0, y: -18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" }, className: "shrink-0 h-16 flex items-center px-4 md:px-10", style: { borderBottom: `1.5px solid ${theme.tertiary}` }, children: _jsxs("div", { children: [_jsx("p", { className: "text-xl md:text-2xl font-bold leading-tight", style: { color: theme.primary }, children: "Hi, I'm Amogha" }), _jsx("p", { className: "text-xs md:text-sm mt-0.5", style: { color: theme.secondary }, children: "AI Engineer \u00B7 ML Developer" })] }) }, "compact-header")) }), _jsx(AnimatePresence, { children: hasStarted && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.45, delay: 0.15 }, ref: scrollContainerRef, className: "flex-1 overflow-y-auto w-full px-4 md:px-10 pt-6 pb-44 space-y-4 max-w-5xl mx-auto", children: [messages.map((m, i) => (_jsx(ChatMessage, { message: m, theme: theme }, i))), loading && (_jsx("div", { className: "flex items-center gap-3 text-sm", children: loadingStage === "typing" ? (_jsxs("div", { className: "flex items-center gap-3", style: { color: theme.secondary }, children: [_jsx("span", { children: "AI typing" }), renderLoadingDots(theme.secondary)] })) : (_jsx("div", { className: loadingChipClass, children: _jsxs("div", { className: "flex items-center gap-3", children: [renderLoadingDots(isDarkTheme ? theme.accent : theme.primary), _jsxs("span", { className: loadingChipTextClass, style: loadingTextStyle, children: [loadingStage === "booting" && "Sorry for the delay, Render takes a couple of minutes to boot up the server for the first time", loadingStage === "sleepy" && "Hold on! the server is quite a heavy sleeper. trying my best...", loadingStage === "reboot" && "The server might be up and running. Stop the current request and try again :)"] })] }) })) }))] }, "chat-area")) }), _jsx("div", { className: "fixed bottom-0 left-0 right-0 h-44 pointer-events-none", style: { background: `linear-gradient(to bottom, transparent, ${theme.background} 75%)`, zIndex: 30 } }), _jsx(AnimatePresence, { children: showQuickQuestions && !loading && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 6, transition: { duration: 0.2 } }, transition: { duration: 0.35, ease: "easeOut" }, className: "fixed bottom-[5.5rem] md:bottom-[8rem] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-5xl flex md:flex-wrap md:justify-center gap-2 md:gap-3 px-4 overflow-x-auto flex-nowrap md:overflow-visible scrollbar-hide", style: { zIndex: 40 }, children: [_jsxs("div", { className: "w-full md:hidden", children: [_jsx("div", { className: "grid grid-cols-2 gap-2", children: quickQuestions.slice(0, 2).map((q) => (_jsxs("button", { onClick: () => handleSend(q.prompt), className: "w-full flex items-center justify-center gap-2 px-4 h-10 rounded-full text-[14px] font-medium transition-all duration-200", style: {
                                            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                                            border: `1.5px solid ${isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                            color: isDarkTheme ? theme.secondary : '#000000',
                                            backdropFilter: 'blur(8px)',
                                            WebkitBackdropFilter: 'blur(8px)',
                                            boxShadow: isDarkTheme ? '0 8px 20px rgba(0,0,0,0.5)' : '0 6px 18px rgba(0,0,0,0.08)',
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                                            e.currentTarget.style.color = isDarkTheme ? theme.primary : '#000000';
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                                            e.currentTarget.style.color = isDarkTheme ? theme.secondary : '#000000';
                                        }, children: [_jsx("span", { children: q.icon }), _jsx("span", { children: q.label })] }, q.label))) }), _jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: quickQuestions.slice(2).map((q) => (_jsxs("button", { onClick: () => handleSend(q.prompt), className: "w-full flex items-center justify-center gap-2 px-4 h-10 rounded-full text-[14px] font-medium transition-all duration-200", style: {
                                            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                                            border: `1.5px solid ${isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                            color: isDarkTheme ? theme.secondary : '#000000',
                                            backdropFilter: 'blur(8px)',
                                            WebkitBackdropFilter: 'blur(8px)',
                                            boxShadow: isDarkTheme ? '0 8px 20px rgba(0,0,0,0.5)' : '0 6px 18px rgba(0,0,0,0.08)',
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                                            e.currentTarget.style.color = isDarkTheme ? theme.primary : '#000000';
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                                            e.currentTarget.style.color = isDarkTheme ? theme.secondary : '#000000';
                                        }, children: [_jsx("span", { children: q.icon }), _jsx("span", { children: q.label })] }, q.label))) })] }), _jsx("div", { className: "hidden md:flex md:flex-wrap md:justify-center gap-2 md:gap-3", children: quickQuestions.map((q) => (_jsxs("button", { onClick: () => handleSend(q.prompt), className: "shrink-0 flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[14px] md:text-[15px] font-medium transition-all duration-200", style: {
                                    backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                                    border: `1.5px solid ${isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                    color: isDarkTheme ? theme.secondary : '#000000',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    boxShadow: isDarkTheme ? '0 8px 20px rgba(0,0,0,0.5)' : '0 6px 18px rgba(0,0,0,0.08)',
                                }, onMouseEnter: e => {
                                    e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                                    e.currentTarget.style.color = isDarkTheme ? theme.primary : '#000000';
                                }, onMouseLeave: e => {
                                    e.currentTarget.style.backgroundColor = isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                                    e.currentTarget.style.color = isDarkTheme ? theme.secondary : '#000000';
                                }, children: [_jsx("span", { children: q.icon }), _jsx("span", { children: q.label })] }, q.label))) })] }, "quick-questions")) }), _jsxs("div", { className: "fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-5xl flex items-center gap-2 md:gap-3 shadow-xl rounded-full px-4 md:px-6 py-2.5 md:py-3", style: { backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}`, zIndex: 40 }, children: [_jsx("textarea", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Ask me anything...", rows: 1, className: `flex-1 outline-none resize-none bg-transparent leading-relaxed self-center text-base md:text-[18px] ${isDarkTheme ? "placeholder:text-white/70" : "placeholder:text-current"}`, style: { color: theme.primary, caretColor: theme.primary }, onKeyDown: (e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(input);
                            }
                        } }), _jsx(AnimatePresence, { children: loading && (_jsxs(motion.button, { initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.7 }, transition: { duration: 0.2 }, onClick: handleStop, className: "shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center relative", title: "Stop generating", children: [_jsxs(motion.svg, { className: "absolute inset-0", viewBox: "0 0 40 40", fill: "none", animate: { rotate: 360 }, transition: { duration: 1.1, repeat: Infinity, ease: "linear" }, children: [_jsx("circle", { cx: "20", cy: "20", r: "17", stroke: theme.tertiary, strokeWidth: "2.5" }), _jsx("path", { d: "M20 3 A17 17 0 0 1 37 20", stroke: theme.primary, strokeWidth: "2.5", strokeLinecap: "round" })] }), _jsx("div", { className: "w-4 h-4 rounded-sm", style: { backgroundColor: theme.primary } })] }, "stop-btn")) }), _jsx(AnimatePresence, { children: !loading && (_jsx(motion.button, { initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.7 }, transition: { duration: 0.2 }, onClick: () => handleSend(input), className: "shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-200", style: { backgroundColor: theme.primary, color: isDarkTheme ? "#000000" : "#ffffff" }, onMouseEnter: e => (e.currentTarget.style.backgroundColor = theme.accent), onMouseLeave: e => (e.currentTarget.style.backgroundColor = theme.primary), children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: _jsx("path", { d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z", transform: "rotate(-90 12 12)" }) }) }, "send-btn")) })] })] }));
}
