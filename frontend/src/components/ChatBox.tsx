import { useState, FC } from "react"
import { sendMessage } from "../lib/api"

const ChatBox: FC = () => {

const [message, setMessage] = useState<string>("")
const [response, setResponse] = useState<string>("")

const handleSend = async (): Promise<void> => {
  const res = await sendMessage(message)
  setResponse(res.response)
}

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        className="border p-3 w-96 rounded-xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
      />

      <button
        onClick={handleSend}
        className="bg-black text-white px-6 py-2 rounded-xl"
      >
        Send
      </button>

      <div className="w-96">
        {response}
      </div>
    </div>
  )
}

export default ChatBox