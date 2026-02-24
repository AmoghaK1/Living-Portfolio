import { ChatResponse } from "@/types/chat"

export async function sendMessage(
  message: string
): Promise<ChatResponse> {
  const res = await fetch("http://localhost:8000/chat/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message
    })
  })

  return res.json()
}