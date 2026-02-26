import { motion, useScroll, useTransform } from "framer-motion"
import { colors } from "@/lib/colors"

export default function Underline() {
  const { scrollYProgress } = useScroll()

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 20]
  )

  return (
    <motion.div
      style={{ scaleX: scale, backgroundColor: colors.primary }}
      className="origin-left h-1 w-40 mx-auto mt-3"
    />
  )
}