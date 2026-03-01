import { colors } from "@/lib/colors"

interface Props {
  onSwitch: () => void
}

export default function ModeToggle({ onSwitch }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-4 md:px-6 h-16"
      style={{ borderBottom: `1px solid transparent` }}
    >
      <button
        onClick={onSwitch}
        className="
          relative px-4 py-2 text-xs md:px-8 md:py-3.5 md:text-base font-semibold rounded-full
          text-white shadow-md
          transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
        "
        style={{ backgroundColor: colors.primary }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
      >
        <span className="md:hidden">Pro Mode</span>
        <span className="hidden md:inline">Switch to Professional Mode</span>
      </button>
    </div>
  )
}
