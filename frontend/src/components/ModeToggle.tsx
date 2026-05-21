import { colors } from "@/lib/colors"

interface Props {
  onSwitch: () => void
  onOpenSettings: () => void
  isDarkTheme: boolean
}

export default function ModeToggle({ onSwitch, onOpenSettings, isDarkTheme }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-4 md:px-6 h-16"
      style={{ borderBottom: `1px solid transparent` }}
    >
      <button
        onClick={onOpenSettings}
        className="mr-2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        style={{ backgroundColor: colors.primary, color: isDarkTheme ? "#000000" : "#ffffff" }}
        aria-label="Open settings"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 md:h-6 md:w-6">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 13.5a7.8 7.8 0 0 0 .1-1.5 7.8 7.8 0 0 0-.1-1.5l2-1.5-2-3.5-2.4 1a8.4 8.4 0 0 0-2.6-1.5l-.4-2.5H9l-.4 2.5A8.4 8.4 0 0 0 6 6.5l-2.4-1-2 3.5 2 1.5a7.8 7.8 0 0 0-.1 1.5c0 .5 0 1 .1 1.5l-2 1.5 2 3.5 2.4-1a8.4 8.4 0 0 0 2.6 1.5l.4 2.5h6l.4-2.5a8.4 8.4 0 0 0 2.6-1.5l2.4 1 2-3.5-2-1.5Z" />
        </svg>
      </button>

      <button
        onClick={onSwitch}
        className="
          relative px-4 py-2 text-xs md:px-8 md:py-3.5 md:text-base font-semibold rounded-full
          shadow-md
          transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
        "
        style={{ backgroundColor: colors.primary, color: isDarkTheme ? "#000000" : "#ffffff" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
      >
        <span className="md:hidden">Standard View</span>
        <span className="hidden md:inline">Switch to Standard View</span>
      </button>
    </div>
  )
}
