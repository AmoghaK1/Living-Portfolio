interface Props {
  onSwitch: () => void
}

export default function ModeToggle({ onSwitch }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-6 py-4">
      <button
        onClick={onSwitch}
        className="
          relative px-5 py-2.5 text-sm font-semibold rounded-full
          bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400
          text-white shadow-md
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
          hover:from-purple-500 hover:via-blue-500 hover:to-pink-500
          active:scale-95
        "
      >
        Switch to Professional Mode
      </button>
    </div>
  )
}
