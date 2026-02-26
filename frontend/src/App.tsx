import { useState } from "react"
import ChatBox from "./components/ChatBox"
import AnimatedBackground from "./components/AnimatedBackground"
import ModeToggle from "./components/ModeToggle"
import Backyard from "./pages/Backyard"

export default function App() {
  const [mode, setMode] = useState<"chat" | "portfolio">("chat")

  if (mode === "portfolio") {
    return <Backyard onBack={() => setMode("chat")} />
  }

  return (
    <div>
      <AnimatedBackground />
      <ModeToggle onSwitch={() => setMode("portfolio")} />
      <ChatBox />
    </div>
  )
}