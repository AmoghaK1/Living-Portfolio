import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

const experiences = [
  {
    role: "AI Engineer Intern",
    company: "TechCorp AI",
    period: "Jun 2025 – Dec 2025",
    description:
      "Built end-to-end RAG pipelines using FAISS and LangChain, reducing hallucination rates by 35%. Integrated OpenAI APIs into production chat workflows serving 10k+ users.",
    tags: ["RAG", "LangChain", "FastAPI", "OpenAI"],
  },
  {
    role: "Machine Learning Developer",
    company: "VisionLab",
    period: "Jan 2025 – May 2025",
    description:
      "Designed a real-time object detection system using YOLOv8 and OpenCV, achieving 94% mAP on a custom dataset. Deployed on edge devices with TensorRT optimisation.",
    tags: ["YOLOv8", "OpenCV", "TensorRT", "Python"],
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "2024 – Present",
    description:
      "Delivered 5+ client projects involving React frontends, Node/FastAPI backends, and cloud deployments on AWS and Vercel. Focused on clean architecture and performance.",
    tags: ["React", "FastAPI", "AWS", "Tailwind"],
  },
]

export default function BYExperience() {
  return (
    <section id="experience" className="py-32" style={{ backgroundColor: colors.sectionTint }}>
      <div className="max-w-5xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-base font-semibold tracking-widest uppercase mb-3" style={{ color: colors.secondary }}>
            Where I've Worked
          </p>
          <h2 className="text-5xl font-bold" style={{ color: colors.primary }}>Experience</h2>
        </motion.div>

        <div className="relative pl-8 space-y-14" style={{ borderLeft: `2px solid ${colors.tertiary}` }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[2.1rem] top-2 w-4 h-4 rounded-full shadow" style={{ background: colors.gradientTimeline, border: `2px solid ${colors.background}` }} />

              <div className="rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: colors.white, border: `1px solid ${colors.tertiary}` }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: colors.primary }}>{exp.role}</h3>
                    <p className="text-base font-medium" style={{ color: colors.secondary }}>{exp.company}</p>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap" style={{ color: colors.secondary }}>{exp.period}</span>
                </div>
                <p className="text-base leading-relaxed mb-5" style={{ color: colors.bodyText }}>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-4 py-1.5 rounded-full font-medium"
                      style={{ backgroundColor: colors.tertiary, color: colors.primary }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
