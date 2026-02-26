import { useState, useRef, useEffect } from "react"
import { sendMessage } from "@/lib/api"
import { Message } from "@/types/chat"
import ChatMessage from "./ChatMessage"
import Hero from "./Hero"
import { colors } from "@/lib/colors"

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages, loading])


  const typeMessage = async (text: string) => {
    let current = ""
    for (let i = 0; i < text.length; i++) {
      current += text[i]
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "ai",
          content: current
        }
        return updated
      })
      await new Promise((r) => setTimeout(r, 10))
    }
  }


  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    const res = await sendMessage(input)

    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "" }
    ])

    await typeMessage(res.response)
    setLoading(false)
  }


  return (
    <div className="h-screen flex flex-col">
      <Hero />

      <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full p-6 space-y-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}

        {loading && (
          <div style={{ color: colors.secondary }}>
            AI typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-2xl flex gap-2 shadow-xl rounded-2xl p-3" style={{ backgroundColor: colors.white, border: `1.5px solid ${colors.tertiary}` }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 outline-none resize-none bg-transparent"
          style={{ color: colors.primary }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />

        <button
          onClick={handleSend}
          className="text-white px-6 rounded-xl font-semibold transition-colors duration-200"
          style={{ backgroundColor: colors.primary }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
          Send
        </button>
      </div>
    </div>
  )
}