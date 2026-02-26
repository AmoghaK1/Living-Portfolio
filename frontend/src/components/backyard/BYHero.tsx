import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

export default function BYHero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-20 items-center w-full">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base font-semibold tracking-widest uppercase mb-4" style={{ color: colors.secondary }}>
            AI Engineer & ML Developer
          </p>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8" style={{ color: colors.primary }}>
            Hi, I'm{" "}
            <span style={{ background: colors.gradientPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Amogha Khare
            </span>
          </h1>
          <p className="text-xl leading-relaxed mb-10 max-w-lg" style={{ color: colors.secondary }}>
            I build intelligent systems — from conversational AI to computer vision
            pipelines. I'm passionate about turning research into real-world products
            that are fast, reliable, and human-centred.
          </p>

          <div className="flex gap-5 flex-wrap">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-none text-base font-semibold text-white shadow-md hover:rounded-3xl hover:scale-105 transition-all duration-200 ease-in-out"
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-none text-base font-semibold hover:rounded-3xl transition-all duration-200 ease-in-out"
              style={{ border: `1.5px solid ${colors.secondary}`, color: colors.primary }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.color = colors.accent }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = colors.secondary; e.currentTarget.style.color = colors.primary }}
            >
              Contact Me
            </button>
          </div>
        </motion.div>

        {/* Avatar / visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 rounded-full opacity-40 blur-3xl" style={{ background: colors.glowTeal }} />
            <div className="relative w-full h-full rounded-full border-4 shadow-2xl flex items-center justify-center" style={{ borderColor: colors.tertiary, background: colors.gradientAvatarBg }}>
              <span className="text-8xl font-bold" style={{ background: colors.gradientAvatar, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                AK
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
