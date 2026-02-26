import BYHero from "@/components/backyard/BYHero"
import BYExperience from "@/components/backyard/BYExperience"
import BYProjects from "@/components/backyard/BYProjects"
import BYContact from "@/components/backyard/BYContact"
import AnimatedBackground from "@/components/AnimatedBackground"

interface Props {
  onBack: () => void
}

export default function Backyard({ onBack }: Props) {
  return (
    <div className="min-h-screen text-gray-900">
      <AnimatedBackground />
      {/* Back to Chat button — same position & style as ModeToggle */}
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
