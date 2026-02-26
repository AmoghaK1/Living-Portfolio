import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"

const links = [
  { icon: Mail, label: "Email", value: "amogha@example.com", href: "mailto:amogha@example.com" },
  { icon: Github, label: "GitHub", value: "github.com/amogha", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/amogha", href: "https://linkedin.com" },
]

export default function BYContact() {
  return (
    <section id="contact" className="py-32 bg-gray-50/60">
      <div className="max-w-5xl mx-auto px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base font-semibold tracking-widest text-purple-500 uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-5xl font-bold text-gray-900 mb-5">Contact Me</h2>
          <p className="text-gray-500 text-xl mb-14 max-w-2xl mx-auto">
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
                className="
                  flex items-center gap-4 px-8 py-5 rounded-2xl bg-white border border-gray-100
                  shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-1
                  transition-all duration-300 group text-left
                "
              >
                <span className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-500" />
                </span>
                <div>
                  <p className="text-sm text-gray-400 font-medium">{label}</p>
                  <p className="text-base text-gray-700 font-semibold group-hover:text-purple-600 transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-28 text-center text-sm text-gray-400">
        Built with React, Tailwind & FastAPI · Amogha K. © {new Date().getFullYear()}
      </div>
    </section>
  )
}
