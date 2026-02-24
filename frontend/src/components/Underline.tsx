import { motion, useScroll, useTransform } from "framer-motion"

export default function Underline() {
  const { scrollYProgress } = useScroll()

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 20]
  )

  return (
    <motion.div
      style={{ scaleX: scale }}
      className="origin-left h-1 bg-black w-40 mx-auto mt-3"
    />
  )
}