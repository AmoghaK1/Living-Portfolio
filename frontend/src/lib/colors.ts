export type ThemeId =
  | "sunlit-red"
  | "peach-dream"
  | "mint-breeze"
  | "sky-spark"
  | "midnight-plum"
  | "neon-forest"
  | "cobalt-ink"
  | "ember-night"

export type ColorTokens = {
  primary: string
  secondary: string
  tertiary: string
  background: string
  accent: string
  white: string
  bodyText: string
  navbarBg: string
  sectionTint: string
  gradientPrimary: string
  gradientAvatar: string
  gradientAvatarBg: string
  gradientTimeline: string
  glowTeal: string
}

export const themePresets: Record<ThemeId, ColorTokens> = {
  "sunlit-red": {
    primary: "#8A1F2D",
    secondary: "#E05D5D",
    tertiary: "#F4C7C3",
    background: "#FFF4F2",
    accent: "#FF7A70",
    white: "#FFFDFD",
    bodyText: "#7D5A5A",
    navbarBg: "rgba(255,244,242,0.9)",
    sectionTint: "rgba(244,199,195,0.28)",
    gradientPrimary: "linear-gradient(to right, #8A1F2D, #FF7A70)",
    gradientAvatar: "linear-gradient(135deg, #8A1F2D, #FF7A70)",
    gradientAvatarBg: "linear-gradient(135deg, #FFF4F2, #F4C7C3)",
    gradientTimeline: "linear-gradient(135deg, #8A1F2D, #FF7A70)",
    glowTeal: "radial-gradient(circle, #FF7A70, #F4C7C3)",
  },
  "peach-dream": {
    primary: "#A6562A",
    secondary: "#E58A54",
    tertiary: "#F8D6B7",
    background: "#FFF8F1",
    accent: "#FFB36B",
    white: "#FFFEFC",
    bodyText: "#85695A",
    navbarBg: "rgba(255,248,241,0.9)",
    sectionTint: "rgba(248,214,183,0.28)",
    gradientPrimary: "linear-gradient(to right, #A6562A, #FFB36B)",
    gradientAvatar: "linear-gradient(135deg, #A6562A, #FFB36B)",
    gradientAvatarBg: "linear-gradient(135deg, #FFF8F1, #F8D6B7)",
    gradientTimeline: "linear-gradient(135deg, #A6562A, #FFB36B)",
    glowTeal: "radial-gradient(circle, #FFB36B, #F8D6B7)",
  },
  "mint-breeze": {
    primary: "#175B50",
    secondary: "#4CB58F",
    tertiary: "#C9F0E1",
    background: "#F1FFF9",
    accent: "#64D0A5",
    white: "#FBFFFD",
    bodyText: "#56756A",
    navbarBg: "rgba(241,255,249,0.9)",
    sectionTint: "rgba(201,240,225,0.3)",
    gradientPrimary: "linear-gradient(to right, #175B50, #64D0A5)",
    gradientAvatar: "linear-gradient(135deg, #175B50, #64D0A5)",
    gradientAvatarBg: "linear-gradient(135deg, #F1FFF9, #C9F0E1)",
    gradientTimeline: "linear-gradient(135deg, #175B50, #64D0A5)",
    glowTeal: "radial-gradient(circle, #64D0A5, #C9F0E1)",
  },
  "sky-spark": {
    primary: "#0D4B7A",
    secondary: "#4F99E8",
    tertiary: "#C9E5FF",
    background: "#F2F8FF",
    accent: "#62C0FF",
    white: "#FCFEFF",
    bodyText: "#59758A",
    navbarBg: "rgba(242,248,255,0.9)",
    sectionTint: "rgba(201,229,255,0.3)",
    gradientPrimary: "linear-gradient(to right, #0D4B7A, #62C0FF)",
    gradientAvatar: "linear-gradient(135deg, #0D4B7A, #62C0FF)",
    gradientAvatarBg: "linear-gradient(135deg, #F2F8FF, #C9E5FF)",
    gradientTimeline: "linear-gradient(135deg, #0D4B7A, #62C0FF)",
    glowTeal: "radial-gradient(circle, #62C0FF, #C9E5FF)",
  },
  "midnight-plum": {
    primary: "#ECE1FF",
    secondary: "#B69AEF",
    tertiary: "#33214F",
    background: "#140F21",
    accent: "#A86CFF",
    white: "#1B162B",
    bodyText: "#D4C8EA",
    navbarBg: "rgba(20,15,33,0.9)",
    sectionTint: "rgba(182,154,239,0.16)",
    gradientPrimary: "linear-gradient(to right, #4A256E, #A86CFF)",
    gradientAvatar: "linear-gradient(135deg, #4A256E, #A86CFF)",
    gradientAvatarBg: "linear-gradient(135deg, #140F21, #33214F)",
    gradientTimeline: "linear-gradient(135deg, #4A256E, #A86CFF)",
    glowTeal: "radial-gradient(circle, #A86CFF, #33214F)",
  },
  "neon-forest": {
    primary: "#D8FCEB",
    secondary: "#7AE39C",
    tertiary: "#203D32",
    background: "#091311",
    accent: "#49E38A",
    white: "#111C19",
    bodyText: "#B4D8C3",
    navbarBg: "rgba(9,19,17,0.9)",
    sectionTint: "rgba(122,227,156,0.16)",
    gradientPrimary: "linear-gradient(to right, #17604A, #49E38A)",
    gradientAvatar: "linear-gradient(135deg, #17604A, #49E38A)",
    gradientAvatarBg: "linear-gradient(135deg, #091311, #203D32)",
    gradientTimeline: "linear-gradient(135deg, #17604A, #49E38A)",
    glowTeal: "radial-gradient(circle, #49E38A, #203D32)",
  },
  "cobalt-ink": {
    primary: "#E3ECFF",
    secondary: "#7EA2FF",
    tertiary: "#263A66",
    background: "#0B1120",
    accent: "#4D79FF",
    white: "#10192E",
    bodyText: "#C0CEE9",
    navbarBg: "rgba(11,17,32,0.9)",
    sectionTint: "rgba(126,162,255,0.16)",
    gradientPrimary: "linear-gradient(to right, #243C88, #4D79FF)",
    gradientAvatar: "linear-gradient(135deg, #243C88, #4D79FF)",
    gradientAvatarBg: "linear-gradient(135deg, #0B1120, #263A66)",
    gradientTimeline: "linear-gradient(135deg, #243C88, #4D79FF)",
    glowTeal: "radial-gradient(circle, #4D79FF, #263A66)",
  },
  "ember-night": {
    primary: "#FFE8DD",
    secondary: "#FF9B74",
    tertiary: "#4A2320",
    background: "#170C0D",
    accent: "#FF6D4F",
    white: "#201012",
    bodyText: "#F1C8B8",
    navbarBg: "rgba(23,12,13,0.9)",
    sectionTint: "rgba(255,155,116,0.16)",
    gradientPrimary: "linear-gradient(to right, #7A241E, #FF6D4F)",
    gradientAvatar: "linear-gradient(135deg, #7A241E, #FF6D4F)",
    gradientAvatarBg: "linear-gradient(135deg, #170C0D, #4A2320)",
    gradientTimeline: "linear-gradient(135deg, #7A241E, #FF6D4F)",
    glowTeal: "radial-gradient(circle, #FF6D4F, #4A2320)",
  },
}

export let colors: ColorTokens = themePresets["sunlit-red"]

export function setThemeColors(themeId: ThemeId) {
  colors = themePresets[themeId]
}
