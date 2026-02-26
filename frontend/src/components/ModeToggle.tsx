import { colors } from "@/lib/colors"

interface Props {
  onSwitch: () => void
}

export default function ModeToggle({ onSwitch }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-6 py-4">
      <button
        onClick={onSwitch}
        className="
          relative px-8 py-3.5 text-lg font-semibold rounded-full
          text-white shadow-md
          transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
        "
        style={{ backgroundColor: colors.primary }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primary)}
      >
        Switch to Professional Mode
      </button>
    </div>
  )
}
