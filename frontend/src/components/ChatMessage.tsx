import ReactMarkdown from "react-markdown"
import { Message } from "@/types/chat"
import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

type Props = {
  message: Message
  theme?: typeof colors
}

export default function ChatMessage({ message, theme = colors }: Props) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[88%] md:max-w-[70%] p-3 md:p-4 rounded-2xl shadow-sm leading-relaxed text-base md:text-[18px]"
        style={isUser
          ? { backgroundColor: theme.primary, color: theme.background }
          : { backgroundColor: theme.white, border: `1.5px solid ${theme.tertiary}`, color: theme.primary }
        }
      >
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  )
}