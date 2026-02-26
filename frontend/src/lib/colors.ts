// Coastal Retreat — single source of truth for the colour palette
export const colors = {
  // Core palette
  primary:    '#335765', // deep teal    — headings, buttons, strong text
  secondary:  '#74A8A4', // medium teal  — labels, body text, icons
  tertiary:   '#B6D9E0', // light blue   — borders, tags, card accents
  background: '#DBE2DC', // mint cream   — page background, light fills
  accent:     '#7F543D', // warm brown   — hover states, footer, highlights

  // Derived / composite
  white:           '#ffffff',
  bodyText:        '#555e5c',       // slightly darker muted body copy
  navbarBg:        'rgba(219,226,220,0.88)', // background @ 88% opacity
  sectionTint:     'rgba(182,217,224,0.18)', // tertiary @ 18% opacity

  // Gradients (as CSS strings)
  gradientPrimary: 'linear-gradient(to right,  #335765, #74A8A4)',
  gradientAvatar:  'linear-gradient(135deg, #335765, #74A8A4)',
  gradientAvatarBg:'linear-gradient(135deg, #DBE2DC, #B6D9E0)',
  gradientTimeline:'linear-gradient(135deg, #335765, #74A8A4)',
  glowTeal:        'radial-gradient(circle, #74A8A4, #B6D9E0)',
} as const
