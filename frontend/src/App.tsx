import { FC } from "react"
import ChatBox from "./components/ChatBox"

const App: FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ChatBox />
    </div>
  )
}

export default App