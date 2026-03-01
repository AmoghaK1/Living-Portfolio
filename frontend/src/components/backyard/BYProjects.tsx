import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { colors } from "@/lib/colors"

const barColors = [colors.primary, colors.secondary, colors.accent, colors.tertiary]

const allProjects = [
  {
    title: "Living Portfolio",
    description:
      "An AI-powered chatbot portfolio that answers questions about my skills, projects, and experience. Built with FastAPI, FAISS vector search, and RAG architecture using structured markdown knowledge sources.",
    tags: ["FastAPI", "FAISS", "RAG", "React", "LLM"],
  },
  {
    title: "Alzheimer Detection System",
    description:
      "Deep learning system that classifies brain scan images into Alzheimer's disease stages using CNNs and transfer learning. Trained with data augmentation and early stopping to handle limited medical datasets.",
    tags: ["Python", "TensorFlow", "Keras", "CNN", "Transfer Learning"],
  },
  {
    title: "AI-Resistant Phishing Detection",
    description:
      "Machine learning system that analyzes textual and structural features of suspicious content to classify phishing attempts. Applied TF-IDF vectorization and classification models to automate cybersecurity detection.",
    tags: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Cybersecurity"],
  },
  {
    title: "Physiotherapy Exercise Correction",
    description:
      "Real-time computer vision system that detects body posture during physiotherapy exercises using MediaPipe and OpenCV, providing instant feedback on exercise form to prevent injuries.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
  },
  {
    title: "Land Encroachment Detection",
    description:
      "Machine learning and computer vision pipeline that detects land encroachment patterns from spatial image data. Processes images to identify irregular land usage using classification models and feature extraction.",
    tags: ["Python", "OpenCV", "Scikit-learn", "NumPy", "ML"],
  },
  {
    title: "Real Review System",
    description:
      "NLP-based system that analyzes text reviews and classifies them by authenticity. Applied TF-IDF vectorization and feature extraction to distinguish genuine reviews from misleading ones.",
    tags: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Pandas"],
  },
  {
    title: "Electronic Health Record System",
    description:
      "Full-stack web application for storing and managing patient medical records. Supports data entry, retrieval, and structured storage with a Node.js backend and MongoDB database.",
    tags: ["Node.js", "MongoDB", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Smart Text Reader (Parrot)",
    description:
      "OCR system that extracts readable text from images using Tesseract and OpenCV. Applies image preprocessing techniques to reduce noise and significantly improve text detection accuracy.",
    tags: ["Python", "OpenCV", "Tesseract OCR", "Image Processing"],
  },
  {
    title: "AniVerse",
    description:
      "Web-based anime tracking and organization platform where users can browse and manage anime entries in a clean, structured interface. Focused on building solid frontend fundamentals.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    title: "Scribbl.io Clone",
    description:
      "Browser-based multiplayer drawing and guessing game replicating the core mechanics of Scribbl.io. Built using the Canvas API with event-driven game state logic.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas API"],
  },
  {
    title: "Code Debugger Tool",
    description:
      "Python-based static code analysis tool that automatically identifies potential errors and inefficiencies in code inputs. Uses regex pattern matching to surface meaningful issues.",
    tags: ["Python", "Regex", "Static Analysis", "Automation"],
  },
  {
    title: "Narrative Based RPG",
    description:
      "Text-driven RPG system where player choices shape story outcomes through branching logic trees. Built entirely in Python with state management for dynamic storytelling.",
    tags: ["Python", "Game Logic", "State Management"],
  },
]

const PAGE_SIZE = 4

export default function BYProjects() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalPages = Math.ceil(allProjects.length / PAGE_SIZE)
  const currentProjects = allProjects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const goTo = (next: number) => {
    setDirection(next > page ? 1 : -1)
    setPage(next)
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

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

        {/* Grid + Arrows wrapper */}
        <div className="relative flex items-center gap-4">
          {/* Left arrow */}
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center shadow transition-all duration-200 disabled:opacity-25 hover:scale-110 active:scale-95"
            style={{ backgroundColor: colors.white, border: `1.5px solid ${colors.tertiary}`, color: colors.primary }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Animated grid */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid sm:grid-cols-2 gap-8"
              >
                {currentProjects.map((project, i) => (
                  <div
                    key={project.title}
                    className="group rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.tertiary}` }}
                  >
                    {/* Color bar */}
                    <div className="w-12 h-2 rounded-full mb-6" style={{ backgroundColor: barColors[i % barColors.length] }} />

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
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages - 1}
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center shadow transition-all duration-200 disabled:opacity-25 hover:scale-110 active:scale-95"
            style={{ backgroundColor: colors.white, border: `1.5px solid ${colors.tertiary}`, color: colors.primary }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === page ? "24px" : "10px",
                height: "10px",
                backgroundColor: i === page ? colors.primary : colors.tertiary,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
