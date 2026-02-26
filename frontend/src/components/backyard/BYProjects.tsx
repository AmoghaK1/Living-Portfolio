import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

const projects = [
  {
    title: "Living Portfolio",
    description:
      "An AI-powered portfolio chatbot built with FastAPI, FAISS vector search, and React. Users can ask questions about me and receive context-aware streamed responses.",
    tags: ["FastAPI", "FAISS", "React", "OpenAI"],
    barColor: colors.primary,
  },
  {
    title: "AI Stylist",
    description:
      "A conversational fashion assistant that recommends outfits based on user preferences, occasion, and wardrobe inventory using multimodal LLM capabilities.",
    tags: ["LLM", "Computer Vision", "Python", "React"],
    barColor: colors.secondary,
  },
  {
    title: "Real-Time Object Detection",
    description:
      "Edge-deployed YOLOv8 model optimised with TensorRT running at 60 FPS on Jetson Nano, performing 15-class detection with 94% mAP on a custom dataset.",
    tags: ["YOLOv8", "TensorRT", "OpenCV", "CUDA"],
    barColor: colors.accent,
  },
  {
    title: "Workflow Automation Suite",
    description:
      "A no-code automation platform integrating n8n, Zapier-style triggers, and custom Python workers to automate repetitive business processes end-to-end.",
    tags: ["n8n", "FastAPI", "PostgreSQL", "Docker"],
    barColor: colors.tertiary,
  },
]

export default function BYProjects() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-base font-semibold tracking-widest uppercase mb-3" style={{ color: colors.secondary }}>
            What I've Built
          </p>
          <h2 className="text-5xl font-bold" style={{ color: colors.primary }}>Projects</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: colors.white, border: `1px solid ${colors.tertiary}` }}
            >
              {/* Color bar */}
              <div className="w-12 h-2 rounded-full mb-6" style={{ backgroundColor: project.barColor }} />

              <h3 className="text-xl font-semibold mb-3 transition-colors duration-200" style={{ color: colors.primary }}>
                {project.title}
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: colors.bodyText }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-4 py-1.5 rounded-full font-medium"
                    style={{ backgroundColor: colors.background, color: colors.primary }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
