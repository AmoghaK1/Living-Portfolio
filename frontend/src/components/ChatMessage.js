import { jsx as _jsx } from "react/jsx-runtime";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { colors } from "@/lib/colors";
export default function ChatMessage({ message, theme = colors }) {
    const isUser = message.role === "user";
    return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex ${isUser ? "justify-end" : "justify-start"}`, children: _jsx("div", { className: "max-w-[88%] md:max-w-[70%] p-3 md:p-4 rounded-2xl shadow-sm leading-relaxed text-base md:text-[18px]", style: isUser
                ? { backgroundColor: theme.primary, color: theme.background }
                : { backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}`, color: theme.primary }, children: _jsx(ReactMarkdown, { children: message.content }) }) }));
}
