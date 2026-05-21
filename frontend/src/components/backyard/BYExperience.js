import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { colors } from "@/lib/colors";
const experiences = [
    {
        role: "Data Engineering Intern",
        company: "Techknowgreen Solutions Global · Govt. of Maharashtra",
        period: "Jul 2025 – Sep 2025",
        description: "Worked on environmental data processing for government performance evaluation. Validated village-level datasets against official guidelines and automated repetitive data processing workflows, improving dataset accuracy significantly.",
        tags: ["Python", "Pandas", "NumPy", "Data Validation", "Automation"],
    },
    {
        role: "AWS Developer Intern",
        company: "TechEasy Consultancy",
        period: "May 2025 – Jun 2025",
        description: "Contributed to backend API development for Real Review, a real-time real estate web application. Worked with AWS serverless infrastructure and participated in Agile Scrum meetings to track weekly progress.",
        tags: ["AWS Lambda", "EC2", "S3", "API Gateway", "Python", "REST API"],
    },
    {
        role: "Data Analyst & Power BI Intern",
        company: "Vodafone Idea Foundation",
        period: "Jun 2024 – Jul 2024",
        description: "Analyzed structured datasets to identify patterns and trends. Cleaned and prepared data for analysis and applied data analytics techniques to generate actionable business insights.",
        tags: ["Power BI", "Data Analysis", "Python", "Excel"],
    },
];
export default function BYExperience() {
    return (_jsx("section", { id: "experience", className: "py-16 md:py-32", style: { backgroundColor: colors.sectionTint }, children: _jsxs("div", { className: "max-w-5xl mx-auto px-5 md:px-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "mb-16", children: [_jsx("p", { className: "text-base font-semibold tracking-widest uppercase mb-3", style: { color: colors.secondary }, children: "Where I've Worked" }), _jsx("h2", { className: "text-4xl md:text-5xl font-bold", style: { color: colors.primary }, children: "Experience" })] }), _jsx("div", { className: "relative pl-5 md:pl-8 space-y-10 md:space-y-14", style: { borderLeft: `2px solid ${colors.tertiary}` }, children: experiences.map((exp, i) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.1 }, className: "relative", children: [_jsx("span", { className: "absolute -left-[2.1rem] top-2 w-4 h-4 rounded-full shadow", style: { background: colors.gradientTimeline, border: `2px solid ${colors.background}` } }), _jsxs("div", { className: "rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300", style: { backgroundColor: colors.white, border: `1px solid ${colors.tertiary}` }, children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold", style: { color: colors.primary }, children: exp.role }), _jsx("p", { className: "text-base font-medium", style: { color: colors.secondary }, children: exp.company })] }), _jsx("span", { className: "text-sm font-medium whitespace-nowrap", style: { color: colors.secondary }, children: exp.period })] }), _jsx("p", { className: "text-base leading-relaxed mb-5", style: { color: colors.bodyText }, children: exp.description }), _jsx("div", { className: "flex flex-wrap gap-2", children: exp.tags.map((tag) => (_jsx("span", { className: "text-sm px-4 py-1.5 rounded-full font-medium", style: { backgroundColor: colors.tertiary, color: colors.primary }, children: tag }, tag))) })] })] }, i))) })] }) }));
}
