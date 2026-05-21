import { useState, useRef, useEffect } from "react"
import { sendMessage } from "@/lib/api"
import { Message } from "@/types/chat"
import ChatMessage from "./ChatMessage"
import Hero from "./Hero"
import { colors, themePresets, ThemeId } from "@/lib/colors"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  themeId: ThemeId
  onThemeChange: (themeId: ThemeId) => void
}

const themeCards: Array<{
  id: ThemeId
  label: string
  subtitle: string
  group: "Light themes" | "Dark themes"
}> = [
  { id: "sunlit-red", label: "Sunlit Red", subtitle: "hot red energy", group: "Light themes" },
  { id: "peach-dream", label: "Peach Dream", subtitle: "soft orange warmth", group: "Light themes" },
  { id: "mint-breeze", label: "Mint Breeze", subtitle: "fresh green calm", group: "Light themes" },
  { id: "sky-spark", label: "Sky Spark", subtitle: "bright blue lift", group: "Light themes" },
  { id: "midnight-plum", label: "Midnight Plum", subtitle: "deep purple glow", group: "Dark themes" },
  { id: "neon-forest", label: "Neon Forest", subtitle: "emerald night pulse", group: "Dark themes" },
  { id: "cobalt-ink", label: "Cobalt Ink", subtitle: "electric blue depth", group: "Dark themes" },
  { id: "ember-night", label: "Ember Night", subtitle: "smoky red heat", group: "Dark themes" },
]

export default function ChatBox({ themeId, onThemeChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState<"typing" | "booting" | "sleepy">("typing")
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const stopRef = useRef(false)
  const loadingTimersRef = useRef<number[]>([])

  const theme = themePresets[themeId]
  const hasStarted = messages.length > 0 || loading

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  useEffect(() => {
    return () => {
      loadingTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
      loadingTimersRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!settingsOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSettingsOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [settingsOpen])

  const clearLoadingTimers = () => {
    loadingTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
    loadingTimersRef.current = []
  }

  const startLoadingPrompts = () => {
    clearLoadingTimers()
    setLoadingStage("typing")

    loadingTimersRef.current.push(
      window.setTimeout(() => {
        if (stopRef.current) return
        setLoadingStage("booting")
      }, 2000)
    )

    loadingTimersRef.current.push(
      window.setTimeout(() => {
        if (stopRef.current) return
        setLoadingStage("sleepy")
      }, 30000)
    )
  }

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
      await new Promise((resolve) => setTimeout(resolve, 10))
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
    startLoadingPrompts()

    const res = await sendMessage(text)
    clearLoadingTimers()
    setMessages((prev) => [...prev, { role: "ai", content: "" }])
    await typeMessage(res.response)
    setLoading(false)
    setLoadingStage("typing")
    setShowQuickQuestions(true)
  }

  const handleStop = () => {
    stopRef.current = true
    clearLoadingTimers()
    setLoading(false)
    setLoadingStage("typing")
    setShowQuickQuestions(true)
  }

  const quickQuestions = [
    { label: "Me", prompt: "Tell me about Amogha", icon: "👤" },
    { label: "Projects", prompt: "What projects has Amogha built?", icon: "🗂️" },
    { label: "Experience", prompt: "What is Amogha's experience?", icon: "💼" },
    { label: "Skills", prompt: "What are Amogha's skills?", icon: "⚡" },
    { label: "Contact", prompt: "How can I contact Amogha?", icon: "✉️" },
  ]

  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={{ backgroundColor: theme.background }}>
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            key="settings-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ backdropFilter: "blur(18px)", backgroundColor: "rgba(10, 18, 28, 0.24)" }}
            onClick={() => setSettingsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            key="settings-dialog"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 mx-auto z-[70] w-full max-w-xl overflow-hidden rounded-[2rem] shadow-2xl"
            style={{ backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}` }}
          >
            <div className="flex items-start justify-between gap-4 px-5 md:px-6 py-5" style={{ background: theme.gradientPrimary }}>
              <div>
                <p className="text-xl md:text-2xl font-bold" style={{ color: theme.white }}>Settings</p>
                
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.16)", color: theme.white }}
                aria-label="Close settings"
              >
                ×
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              {( ["Light themes", "Dark themes"] as const ).map((groupName) => (
                <section key={groupName} className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: theme.secondary }}>{groupName}</p>
                    <p className="text-sm mt-1" style={{ color: theme.bodyText }}>
                      {groupName === "Light themes"
                        ? "Bright, airy palettes with a softer feel."
                        : "High-contrast palettes with richer night colors."}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {themeCards
                      .filter((card) => card.group === groupName)
                      .map((card) => {
                        const palette = themePresets[card.id]
                        const isSelected = themeId === card.id

                        return (
                          <button
                            key={card.id}
                            onClick={() => onThemeChange(card.id)}
                            className="text-left rounded-2xl p-4 transition-all duration-200"
                            style={{
                              backgroundColor: theme.white,
                              border: `1.5px solid ${isSelected ? palette.accent : palette.tertiary}`,
                              boxShadow: isSelected ? `0 12px 24px ${palette.accent}22` : "none",
                              color: palette.primary,
                            }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold">{card.label}</p>
                                <p className="text-sm mt-1" style={{ color: palette.secondary }}>{card.subtitle}</p>
                              </div>
                              <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: palette.gradientAvatar, color: palette.white }}>
                                <span className="text-lg">✦</span>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                  </div>
                </section>
              )) }

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    stopRef.current = true
                    clearLoadingTimers()
                    setLoading(false)
                    setLoadingStage("typing")
                    setInput("")
                    setMessages([])
                    setShowQuickQuestions(true)
                    setSettingsOpen(false)
                  }}
                  className="rounded-2xl px-4 py-3 text-left transition-all duration-200"
                  style={{
                    backgroundColor: theme.background,
                    border: `1.5px solid ${theme.tertiary}`,
                    color: theme.primary,
                  }}
                >
                  <p className="font-semibold">Clear chat</p>
                  <p className="text-sm mt-1" style={{ color: theme.secondary }}>Wipe the conversation and start fresh.</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}`, color: theme.primary }}
        aria-label="Open settings"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M19.4 13.5a7.8 7.8 0 0 0 .1-1.5 7.8 7.8 0 0 0-.1-1.5l2-1.5-2-3.5-2.4 1a8.4 8.4 0 0 0-2.6-1.5l-.4-2.5H9l-.4 2.5A8.4 8.4 0 0 0 6 6.5l-2.4-1-2 3.5 2 1.5a7.8 7.8 0 0 0-.1 1.5c0 .5 0 1 .1 1.5l-2 1.5 2 3.5 2.4-1a8.4 8.4 0 0 0 2.6 1.5l.4 2.5h6l.4-2.5a8.4 8.4 0 0 0 2.6-1.5l2.4 1 2-3.5-2-1.5Z" />
        </svg>
      </button>

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

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            key="compact-header"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="shrink-0 h-16 flex items-center px-4 md:px-10"
            style={{ borderBottom: `1.5px solid ${theme.tertiary}` }}
          >
            <div>
              <p className="text-xl md:text-2xl font-bold leading-tight" style={{ color: theme.primary }}>Hi, I'm Amogha</p>
              <p className="text-xs md:text-sm mt-0.5" style={{ color: theme.secondary }}>AI Engineer · ML Developer</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <ChatMessage key={i} message={m} theme={theme} />
            ))}
            {loading && (
              <div className="text-sm" style={{ color: theme.secondary }}>
                {loadingStage === "typing" && "AI typing..."}
                {loadingStage === "booting" && "Sorry for the delay, Render takes a couple of minutes to boot up the server for the first time"}
                {loadingStage === "sleepy" && "Hold on! the server is quite a heavy sleeper. trying my best..."}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${theme.background} 75%)`, zIndex: 30 }}
      />

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
                  backgroundColor: theme.white,
                  border: `1.5px solid ${theme.tertiary}`,
                  color: theme.secondary,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = theme.tertiary
                  e.currentTarget.style.color = theme.primary
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = theme.white
                  e.currentTarget.style.color = theme.secondary
                }}
              >
                <span>{q.icon}</span>
                <span>{q.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-5xl flex items-center gap-2 md:gap-3 shadow-xl rounded-full px-4 md:px-6 py-2.5 md:py-3"
        style={{ backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}`, zIndex: 40 }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          rows={1}
          className="flex-1 outline-none resize-none bg-transparent leading-relaxed self-center text-base md:text-[18px]"
          style={{ color: theme.primary }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend(input)
            }
          }}
        />

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
              <motion.svg
                className="absolute inset-0"
                viewBox="0 0 40 40"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="20" cy="20" r="17" stroke={theme.tertiary} strokeWidth="2.5" />
                <path
                  d="M20 3 A17 17 0 0 1 37 20"
                  stroke={theme.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </motion.svg>
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: theme.primary }} />
            </motion.button>
          )}
        </AnimatePresence>

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
              style={{ backgroundColor: theme.primary }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.accent)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = theme.primary)}
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
