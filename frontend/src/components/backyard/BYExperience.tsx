import { motion } from "framer-motion"
import { colors } from "@/lib/colors"

const experiences = [
  {
    role: "Data Engineering Intern",
    company: "Techknowgreen Solutions Global · Govt. of Maharashtra",
    period: "Jul 2025 – Sep 2025",
    description:
      "Worked on environmental data processing for government performance evaluation. Validated village-level datasets against official guidelines and automated repetitive data processing workflows, improving dataset accuracy significantly.",
    tags: ["Python", "Pandas", "NumPy", "Data Validation", "Automation"],
  },
  {
    role: "AWS Developer Intern",
    company: "TechEasy Consultancy",
    period: "May 2025 – Jun 2025",
    description:
      "Contributed to backend API development for Real Review, a real-time real estate web application. Worked with AWS serverless infrastructure and participated in Agile Scrum meetings to track weekly progress.",
    tags: ["AWS Lambda", "EC2", "S3", "API Gateway", "Python", "REST API"],
  },
  {
    role: "Data Analyst & Power BI Intern",
    company: "Vodafone Idea Foundation",
    period: "Jun 2024 – Jul 2024",
    description:
      "Analyzed structured datasets to identify patterns and trends. Cleaned and prepared data for analysis and applied data analytics techniques to generate actionable business insights.",
    tags: ["Power BI", "Data Analysis", "Python", "Excel"],
  },
]

export default function BYExperience() {
  return (
    <section id="experience" className="py-16 md:py-32" style={{ backgroundColor: colors.sectionTint }}>
      <div className="max-w-5xl mx-auto px-5 md:px-10">
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
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.primary }}>Experience</h2>
        </motion.div>

        <div className="relative pl-5 md:pl-8 space-y-10 md:space-y-14" style={{ borderLeft: `2px solid ${colors.tertiary}` }}>
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

              <div className="rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: colors.white, border: `1px solid ${colors.tertiary}` }}>
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
