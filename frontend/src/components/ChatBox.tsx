import { useState, useRef, useEffect } from "react"
import { sendMessage } from "@/lib/api"
import { Message } from "@/types/chat"
import ChatMessage from "./ChatMessage"
import Hero from "./Hero"
import { colors } from "@/lib/colors"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const stopRef = useRef(false)

  const hasStarted = messages.length > 0 || loading

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const typeMessage = async (text: string) => {
    let current = ""
    for (let i = 0; i < text.length; i++) {
      if (stopRef.current) break
      current += text[i]
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: "ai", content: current }
        return updated
      })
      await new Promise((r) => setTimeout(r, 10))
    }
  }

  const handleSend = async (overrideText?: string) => {
    const text = overrideText ?? input
    if (!text.trim()) return
    stopRef.current = false
    setShowQuickQuestions(false)
    const userMessage: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    const res = await sendMessage(text)
    setMessages((prev) => [...prev, { role: "ai", content: "" }])
    await typeMessage(res.response)
    setLoading(false)
    setShowQuickQuestions(true)
  }

  const handleStop = () => {
    stopRef.current = true
    setLoading(false)
    setShowQuickQuestions(true)
  }

  const quickQuestions = [
    { label: "Me",         prompt: "Tell me about Amogha",           icon: "👤" },
    { label: "Projects",   prompt: "What projects has Amogha built?", icon: "🗂️" },
    { label: "Experience", prompt: "What is Amogha's experience?",    icon: "💼" },
    { label: "Skills",     prompt: "What are Amogha's skills?",       icon: "⚡" },
    { label: "Contact",    prompt: "How can I contact Amogha?",       icon: "✉️" },
  ]

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">

      {/* ── IDLE STATE: large centered hero ── */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="idle-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.35, ease: "easeIn" } }}
            className="absolute inset-0 flex flex-col items-center justify-center -translate-y-16"
            style={{ pointerEvents: "none", zIndex: 1 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACTIVE STATE: compact top-left header ── */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            key="compact-header"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="shrink-0 h-16 flex items-center px-4 md:px-10"
            style={{ borderBottom: `1.5px solid ${colors.tertiary}` }}
          >
            <div>
              <p className="text-xl md:text-2xl font-bold leading-tight" style={{ color: colors.primary }}>Hi, I'm Amogha</p>
              <p className="text-xs md:text-sm mt-0.5" style={{ color: colors.secondary }}>AI Engineer · ML Developer</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACTIVE STATE: messages scroll area ── */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            key="chat-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto w-full px-4 md:px-10 pt-6 pb-44 space-y-4 max-w-5xl mx-auto"
          >
            {messages.map((m, i) => (
              <ChatMessage key={i} message={m} />
            ))}
            {loading && (
              <div className="text-sm" style={{ color: colors.secondary }}>AI typing...</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GRADIENT FADE: masks text scrolling under the input ── */}
      <div
        className="fixed bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.background} 75%)`, zIndex: 30 }}
      />
      {/* ── QUICK QUESTIONS: visible when idle or after AI finishes ── */}
      <AnimatePresence>
        {showQuickQuestions && !loading && (
          <motion.div
            key="quick-questions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-[5.5rem] md:bottom-[8rem] left-0 right-0 flex md:flex-wrap md:justify-center gap-2 md:gap-3 px-4 overflow-x-auto flex-nowrap md:overflow-visible scrollbar-hide"
            style={{ zIndex: 40 }}
          >
            {quickQuestions.map((q) => (
              <button
                key={q.label}
                onClick={() => handleSend(q.prompt)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[14px] md:text-[15px] font-medium transition-all duration-200"
                style={{
                  backgroundColor: colors.white,
                  border: `1.5px solid ${colors.tertiary}`,
                  color: colors.secondary,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = colors.tertiary
                  e.currentTarget.style.color = colors.primary
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = colors.white
                  e.currentTarget.style.color = colors.secondary
                }}
              >
                <span>{q.icon}</span>
                <span>{q.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── INPUT BAR: always fixed at bottom ── */}
      <div
        className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-5xl flex items-center gap-2 md:gap-3 shadow-xl rounded-full px-4 md:px-6 py-2.5 md:py-3"
        style={{ backgroundColor: colors.white, border: `1.5px solid ${colors.tertiary}`, zIndex: 40 }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          rows={1}
          className="flex-1 outline-none resize-none bg-transparent leading-relaxed self-center text-base md:text-[18px]"
          style={{ color: colors.primary }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend(input)
            }
          }}
        />
        {/* Stop button — visible while AI is typing */}
        <AnimatePresence>
          {loading && (
            <motion.button
              key="stop-btn"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              onClick={handleStop}
              className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center relative"
              title="Stop generating"
            >
              {/* Spinning arc */}
              <motion.svg
                className="absolute inset-0"
                viewBox="0 0 40 40"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="20" cy="20" r="17" stroke={colors.tertiary} strokeWidth="2.5" />
                <path
                  d="M20 3 A17 17 0 0 1 37 20"
                  stroke={colors.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </motion.svg>
              {/* Square stop icon */}
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: colors.primary }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Send button — hidden while AI is typing */}
        <AnimatePresence>
          {!loading && (
            <motion.button
              key="send-btn"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSend(input)}
              className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" transform="rotate(-90 12 12)" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}