import ReactMarkdown from "react-markdown"
import { Message } from "@/types/chat"
import { motion } from "framer-motion"

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
      <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm leading-relaxed ${
        isUser
          ? "bg-black text-white"
          : "bg-white border"
      }`}>
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  )
}