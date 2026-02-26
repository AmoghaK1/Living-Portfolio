import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Top-left — light blue glow */}
      <motion.div
        animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle at 40% 40%, ${colors.tertiary} 0%, transparent 70%)`, opacity: 0.7 }}
      />

      {/* Top-right — medium teal glow */}
      <motion.div
        animate={{ x: [20, -20, 20], y: [-25, 25, -25] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle at 60% 40%, ${colors.secondary} 0%, transparent 70%)`, opacity: 0.35 }}
      />

      {/* Bottom-right — deep teal glow */}
      <motion.div
        animate={{ x: [25, -25, 25], y: [20, -20, 20] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full blur-[130px]"
        style={{ background: `radial-gradient(circle at 60% 60%, ${colors.secondary} 0%, ${colors.tertiary} 50%, transparent 75%)`, opacity: 0.45 }}
      />

      {/* Bottom-left — warm accent glow */}
      <motion.div
        animate={{ x: [-20, 20, -20], y: [15, -15, 15] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full blur-[110px]"
        style={{ background: `radial-gradient(circle at 40% 60%, ${colors.primary} 0%, transparent 70%)`, opacity: 0.2 }}
      />
    </div>
  )
}