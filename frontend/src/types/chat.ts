export type Message = {
  role: "user" | "ai"
  content: string
}

export type ChatResponse = {
  response: string
}