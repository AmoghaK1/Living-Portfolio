import { motion } from "framer-motion"

const projects = [
  {
    title: "Living Portfolio",
    description:
      "An AI-powered portfolio chatbot built with FastAPI, FAISS vector search, and React. Users can ask questions about me and receive context-aware streamed responses.",
    tags: ["FastAPI", "FAISS", "React", "OpenAI"],
    gradient: "from-purple-400 to-blue-400",
  },
  {
    title: "AI Stylist",
    description:
      "A conversational fashion assistant that recommends outfits based on user preferences, occasion, and wardrobe inventory using multimodal LLM capabilities.",
    tags: ["LLM", "Computer Vision", "Python", "React"],
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    title: "Real-Time Object Detection",
    description:
      "Edge-deployed YOLOv8 model optimised with TensorRT running at 60 FPS on Jetson Nano, performing 15-class detection with 94% mAP on a custom dataset.",
    tags: ["YOLOv8", "TensorRT", "OpenCV", "CUDA"],
    gradient: "from-pink-400 to-purple-400",
  },
  {
    title: "Workflow Automation Suite",
    description:
      "A no-code automation platform integrating n8n, Zapier-style triggers, and custom Python workers to automate repetitive business processes end-to-end.",
    tags: ["n8n", "FastAPI", "PostgreSQL", "Docker"],
    gradient: "from-cyan-400 to-blue-400",
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
          <p className="text-base font-semibold tracking-widest text-purple-500 uppercase mb-3">
            What I've Built
          </p>
          <h2 className="text-5xl font-bold text-gray-900">Projects</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300"
            >
              {/* Gradient bar */}
              <div className={`w-12 h-2 rounded-full bg-gradient-to-r ${project.gradient} mb-6`} />

              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium"
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
