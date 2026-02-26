import BYHero from "@/components/backyard/BYHero"
import BYExperience from "@/components/backyard/BYExperience"
import BYProjects from "@/components/backyard/BYProjects"
import BYContact from "@/components/backyard/BYContact"

interface Props {
  onBack: () => void
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:bg-[#0077B5]",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    color: "hover:bg-gray-800",
  },
  {
    name: "Email",
    href: "mailto:amogha@example.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    color: "hover:bg-purple-600",
  },
]

export default function Backyard({ onBack }: Props) {
  return (
    <div className="min-h-screen text-gray-900">
      {/* Floating social links — left side */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {socialLinks.map(({ name, href, icon, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center
              bg-white/90 backdrop-blur-sm
              text-gray-700 shadow-lg
              rounded-r-xl overflow-hidden
              transition-all duration-300 ease-in-out
              w-20 hover:w-44
              h-20
              ${color} hover:text-white
              border border-gray-200 hover:border-transparent
            `}
          >
            <span className="flex items-center justify-center w-20 h-20 shrink-0">
              {icon}
            </span>
            <span className="pr-5 text-base font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
              {name}
            </span>
          </a>
        ))}
      </div>

      {/* Back to Chat button */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-6 py-4 pointer-events-none">
        <button
          onClick={onBack}
          className="
            pointer-events-auto
            relative px-5 py-2.5 text-sm font-semibold rounded-full
            bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400
            text-white shadow-md
            transition-all duration-300 ease-in-out
            hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
            hover:from-purple-500 hover:via-blue-500 hover:to-pink-500
            active:scale-95
          "
        >
          ← Back to Chat
        </button>
      </div>

      <main>
        <BYHero />
        <BYExperience />
        <BYProjects />
        <BYContact />
      </main>
    </div>
  )
}
