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
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
          className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
          style={{ border: `1.5px solid ${colors.secondary}`, color: colors.primary }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.color = colors.accent }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = colors.secondary; e.currentTarget.style.color = colors.primary }}
        >
          ← Back to Chat
        </button>
      </div>
    </header>
  )
}
