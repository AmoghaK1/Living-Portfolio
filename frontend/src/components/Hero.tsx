import { useId } from "react"
import Typewriter from "typewriter-effect"
import { motion } from "framer-motion"
import { colors as defaultColors, ColorTokens } from "@/lib/colors"

type Props = {
  theme?: ColorTokens
}

export default function Hero({ theme }: Props) {
  const t = theme ?? defaultColors
  
  const isHex = (s: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s)
  const hexToRgb = (hex: string) => {
    const h = hex.replace('#','')
    if (h.length === 3) {
      return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)]
    }
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
  }
  const isColorDark = (col: string) => {
    try {
      if (isHex(col)) {
        const [r,g,b] = hexToRgb(col)
        const lum = (0.299*r + 0.587*g + 0.114*b)/255
        return lum < 0.5
      }
      // fallback: consider dark if contains low-light keywords
      if (/rgba?\(/i.test(col)) {
        const nums = col.replace(/rgba?\(|\)|\s/g,'').split(',').map(Number)
        const [r,g,b] = nums
        const lum = (0.299*r + 0.587*g + 0.114*b)/255
        return lum < 0.5
      }
    } catch (e) {
      return false
    }
    return false
  }

  const isDark = isColorDark(String(t.background))

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center pt-20 md:pt-28 pb-8 px-4"
    >
      <style>{`
        @keyframes blinkCursor { 0% { opacity: 1 } 50% { opacity: 0 } 100% { opacity: 1 } }
        .blink-cursor { display: inline-block; margin-left: 6px; width: 8px; animation: blinkCursor 1s steps(1) infinite; }
        @media (max-width: 768px) {
          .mobile-translate-x-20 { transform: translateX(5rem) !important; }
        }
      `}</style>

      {/* Welcome pill removed per request */}

      {/* Heading */}
      <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
        <span style={{ color: isDark ? '#ededed' : '#2b2b2bed' }}>Hi, I'm</span>{' '}
        {
          (() => {
            // try to parse two colors from the theme gradientPrimary string
            const m = String(t.gradientPrimary).match(/linear-gradient\([^,]*,\s*([^,]+)\s*,\s*([^\)]+)\)/i)
            const id = useId()
            if (m) {
              const c1 = m[1].trim()
              const c2 = m[2].trim()
              return (
                <svg
                  role="img"
                  aria-label="Amogha"
                  className="inline-block h-[1em] w-auto align-middle mobile-translate-x-20 md:translate-x-0 -translate-y-1 md:translate-y-0"
                  style={{ height: '1em', width: 'auto' }}
                >
                  <defs>
                    <linearGradient id={id} x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor={c1} />
                      <stop offset="100%" stopColor={c2} />
                    </linearGradient>
                  </defs>
                  <text x="0" y="80%" style={{ fontSize: '1em', fontWeight: 800, fontFamily: 'inherit' }} fill={`url(#${id})`}>Amogha</text>
                </svg>
              )
            }

            // fallback to background-clip text if parsing fails
            return (
              <span
                className="inline-block -translate-y-1 md:translate-y-0"
                style={{
                  background: t.gradientPrimary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  backgroundPosition: '0 0'
                }}
              >
                Amogha
              </span>
            )
          })()
        }
      </h1>

      {/* thin underline */}
      <div className="h-[2px] w-36 mx-auto mt-3 rounded-full" style={{ background: t.tertiary }} />

      {/* Subtitle with typewriter animation + blinking cursor */}
      <div className="text-lg md:text-2xl mt-6" style={{ color: t.secondary }}>
        <span>
          <Typewriter
            options={{
              strings: [
                "AI Engineer",
                "Machine Learning Developer",
                "Computer Vision Builder",
                "Researcher", 
                "Software Engineer",
                "Problem Solver",
                "Tech Nerd"
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              pauseFor: 1800,
            }}
          />
        </span>
        <span className="blink-cursor" style={{ background: t.primary }} />
      </div>
    </motion.div>
  )
}