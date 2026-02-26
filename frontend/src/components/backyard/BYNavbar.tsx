interface Props {
  onBack: () => void
}

const navLinks = ["About", "Experience", "Projects", "Contact"]

export default function BYNavbar({ onBack }: Props) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
          Amogha K.
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </nav>

        <button
          onClick={onBack}
          className="
            px-4 py-2 text-sm font-medium rounded-full border border-gray-200
            text-gray-600 hover:border-purple-400 hover:text-purple-600
            transition-all duration-200
          "
        >
          ← Back to Chat
        </button>
      </div>
    </header>
  )
}
