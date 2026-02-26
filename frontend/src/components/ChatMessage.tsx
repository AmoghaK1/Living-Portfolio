import ReactMarkdown from "react-markdown"
import { Message } from "@/types/chat"
import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

type Props = {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[70%] p-4 rounded-2xl shadow-sm leading-relaxed"
        style={isUser
          ? { backgroundColor: colors.primary, color: colors.background }
          : { backgroundColor: colors.white, border: `1.5px solid ${colors.tertiary}`, color: colors.primary }
        }
      >
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  )
}