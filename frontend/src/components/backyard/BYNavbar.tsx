import { colors } from "@/lib/colors"

interface Props {
  onBack: () => void
}

const navLinks = ["About", "Experience", "Projects", "Contact"]

export default function BYNavbar({ onBack }: Props) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: colors.navbarBg, borderBottom: `1px solid ${colors.tertiary}` }}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight" style={{ color: colors.primary }}>
          Amogha K.
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-sm transition-colors duration-200" style={{ color: colors.secondary }}
              onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={e => (e.currentTarget.style.color = colors.secondary)}
            >
              {link}
            </button>
          ))}
        </nav>

        <button
          onClick={onBack}
          className="px-8 py-3.5 text-lg font-semibold rounded-full shadow-md text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          style={{ backgroundColor: colors.primary }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
        >
          ← Back to Chat
        </button>
      </div>
    </header>
  )
}
