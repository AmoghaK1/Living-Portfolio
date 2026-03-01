import Typewriter from "typewriter-effect"
import { motion } from "framer-motion"
import Underline from "./Underline"
import { colors } from "@/lib/colors"

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center pt-24 md:pt-32 pb-10 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold" style={{ color: colors.primary }}>
        Hi, I'm Amogha
      </h1>
      <Underline />

      <div className="text-xl md:text-2xl mt-6" style={{ color: colors.secondary }}>
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