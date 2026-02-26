import { useState, useRef } from "react"
import ChatBox from "./components/ChatBox"
import AnimatedBackground from "./components/AnimatedBackground"
import ModeToggle from "./components/ModeToggle"
import Backyard from "./pages/Backyard"

export default function App() {
  const [mode, setMode] = useState<"chat" | "portfolio">("chat")
  const [contentVisible, setContentVisible] = useState(true)
  const transitioning = useRef(false)

  const switchTo = (target: "chat" | "portfolio") => {
    if (transitioning.current) return
    transitioning.current = true
    // Step 1: fade out content only (250ms)
    setContentVisible(false)
    setTimeout(() => {
      // Step 2: swap page while invisible
      setMode(target)
      // Step 3: fade content back in (250ms)
      setTimeout(() => {
        setContentVisible(true)
        setTimeout(() => { transitioning.current = false }, 250)
      }, 50)
    }, 250)
  }

  return (
    <>
      {/* Background always stays visible */}
      <AnimatedBackground />

      {/* Only the content fades */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 250ms ease-in-out",
        }}
      >
        {mode === "portfolio" ? (
          <Backyard onBack={() => switchTo("chat")} />
        ) : (
          <>
            <ModeToggle onSwitch={() => switchTo("portfolio")} />
            <ChatBox />
          </>
        )}
      </div>
    </>
  )
}