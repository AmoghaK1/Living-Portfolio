import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import { colors } from "@/lib/colors"

const links = [
  { icon: Mail, label: "Email", value: "amogha.khare@gmail.com", href: "mailto:amogha.khare@gmail.com" },
  { icon: Github, label: "GitHub", value: "github.com/amogha-khare", href: "https://github.com/amogha-khare" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/amogha-khare", href: "https://linkedin.com/in/amogha-khare" },
]

export default function BYContact() {
  return (
    <section id="contact" className="py-16 md:py-32" style={{ backgroundColor: colors.sectionTint }}>
      <div className="max-w-5xl mx-auto px-5 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base font-semibold tracking-widest uppercase mb-3" style={{ color: colors.secondary }}>
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-5" style={{ color: colors.primary }}>Contact Me</h2>
          <p className="text-base md:text-xl mb-10 md:mb-14 max-w-2xl mx-auto" style={{ color: colors.secondary }}>
            I'm open to opportunities, collaborations, and interesting conversations.
            Reach out via any of the channels below.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 px-5 md:px-8 py-4 md:py-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-left"
                style={{ backgroundColor: colors.white, border: `1.5px solid ${colors.tertiary}` }}
              >
                <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.tertiary }}>
                  <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.secondary }}>{label}</p>
                  <p className="text-base font-semibold transition-colors duration-200" style={{ color: colors.primary }}>
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-28 text-center text-sm" style={{ color: colors.accent }}>
        Built with React, Tailwind & FastAPI · Amogha K. © {new Date().getFullYear()}
      </div>
    </section>
  )
}
