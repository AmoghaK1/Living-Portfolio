import { motion } from "framer-motion"

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
          <p className="text-base font-semibold tracking-widest text-purple-500 uppercase mb-4">
            AI Engineer & ML Developer
          </p>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              Amogha Khare
            </span>
          </h1>
          <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-lg">
            I build intelligent systems — from conversational AI to computer vision
            pipelines. I'm passionate about turning research into real-world products
            that are fast, reliable, and human-centred.
          </p>

          <div className="flex gap-5 flex-wrap">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="
                px-8 py-4 rounded-none text-base font-semibold
                bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500
                text-white shadow-md
                hover:rounded-3xl hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
                transition-all duration-200 ease-in-out
              "
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="
                px-8 py-4 rounded-none text-base font-semibold border border-gray-300
                text-gray-700 hover:rounded-3xl hover:border-purple-400 hover:text-purple-600
                transition-all duration-200 ease-in-out
              "
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300 via-blue-300 to-pink-300 opacity-40 blur-3xl" />
            <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center">
              <span className="text-8xl font-bold bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                AK
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
