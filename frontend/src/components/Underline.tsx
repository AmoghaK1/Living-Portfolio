import { colors } from "@/lib/colors"

export default function Underline() {
  return (
    <div
      className="h-[3px] w-32 mx-auto mt-3 rounded-full"
      style={{ backgroundColor: colors.primary }}
    />
  )
}