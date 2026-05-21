import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

export default function AnimatedBackground() {
  // helper: if a token is a CSS gradient, try to extract a usable hex color stop
  const solidFrom = (token: string | undefined, fallback: string) => {
    if (!token) return fallback
    // quick match for #rrggbb or #rgb
    const mHex = String(token).match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/)
    if (mHex) return mHex[0]
    // match rgb(...) numbers
    const mRgb = String(token).match(/rgba?\(([^)]+)\)/)
    if (mRgb) {
      const parts = mRgb[1].split(',').map(p => p.trim())
      if (parts.length >= 3) return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`
    }
    return fallback
  }

  const circleA = solidFrom(colors.sectionTint, colors.tertiary)
  const circleB = solidFrom(colors.tertiary, colors.primary)
  const circleC = solidFrom(colors.gradientAvatarBg as unknown as string, colors.tertiary)

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ backgroundColor: colors.background }}>
      {/* Top-left — light blue glow (hidden on mobile) */}
      <motion.div
        animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute md:-top-40 md:-left-40 -top-20 -left-16 w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full md:blur-[100px] blur-[28px]"
        style={{ background: `radial-gradient(circle at 40% 40%, ${colors.tertiary} 0%, transparent 70%)`, opacity: 0.62 }}
      />

      {/* Top-right — medium teal glow (hidden on mobile) */}
      <motion.div
        animate={{ x: [20, -20, 20], y: [-25, 25, -25] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute md:-top-32 md:-right-32 -top-16 -right-12 w-[220px] h-[220px] md:w-[500px] md:h-[500px] rounded-full md:blur-[90px] blur-[28px]"
        style={{ background: `radial-gradient(circle at 60% 40%, ${colors.secondary} 0%, transparent 70%)`, opacity: 0.34 }}
      />

      {/* Bottom-right — deep teal glow (hidden on mobile) */}
      <motion.div
        animate={{ x: [25, -25, 25], y: [20, -20, 20] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute md:-bottom-40 md:-right-40 -bottom-20 -right-16 w-[320px] h-[320px] md:w-[650px] md:h-[650px] rounded-full md:blur-[110px] blur-[36px]"
        style={{ background: `radial-gradient(circle at 60% 60%, ${colors.secondary} 0%, ${colors.tertiary} 50%, transparent 75%)`, opacity: 0.42 }}
      />

      {/* Bottom-left — warm accent glow (hidden on mobile) */}
      <motion.div
        animate={{ x: [-20, 20, -20], y: [15, -15, 15] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute md:-bottom-32 md:-left-32 -bottom-16 -left-12 w-[260px] h-[260px] md:w-[480px] md:h-[480px] rounded-full md:blur-[90px] blur-[28px]"
        style={{ background: `radial-gradient(circle at 40% 60%, ${colors.primary} 0%, transparent 70%)`, opacity: 0.18 }}
      />

      {/* Decorative SVG layer: dotted pattern + circles */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none md:scale-100 scale-75 md:opacity-100 opacity-60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            {/* DEBUG: bright red dots to verify rendering; will revert after confirmation */}
            <circle cx="3" cy="3" r="1.6" fill={colors.primary} />
          </pattern>
        </defs>

        {/* dotted overlay */}
        {/* <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" opacity="0.3" /> */}

        {/* top-left dotted cluster */}
        <rect x="10%" y="4%" width="12%" height="16%" fill="url(#dotPattern)" opacity="0.7" />

        {/* bottom-right dotted cluster */}
        <rect x="82%" y="72%" width="22%" height="24%" fill="url(#dotPattern)" opacity="0.6" />

        {/* soft circular shapes */}
        <circle cx="8%" cy="18%" r="180" fill={circleA} opacity="0.35" />
        <circle cx="85%" cy="22%" r="140" fill={circleB} opacity="0.22" />
        <circle cx="78%" cy="72%" r="240" fill={circleC} opacity="0.08" />
        <circle cx="22%" cy="78%" r="120" fill={circleA} opacity="0.06" />
      </svg>

      {/* Mobile-only subtle blur layer (no animations or SVG decorations) */}
      <div className="absolute inset-0 block md:hidden pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.tertiary} 0%, transparent 30%), radial-gradient(circle at 70% 70%, ${colors.secondary} 0%, transparent 35%)`,
            filter: 'blur(28px)',
            opacity: 0.28,
          }}
        />
      </div>
    </div>
  )
}