import Typewriter from "typewriter-effect"
import { motion } from "framer-motion"
import Underline from "./Underline"

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center pt-32 pb-10"
    >
      <h1 className="text-6xl font-bold">
        Hi, I'm Amogha
      </h1>
      <Underline />

      <div className="text-2xl mt-6 text-gray-600">
        <Typewriter
          options={{
            strings: [
              "AI Engineer",
              "Machine Learning Developer",
              "Computer Vision Builder"
            ],
            autoStart: true,
            loop: true
          }}
        />
      </div>
    </motion.div>
  )
}