import type React from "react"

export type Theme = {
  label: string
  bg: string
  fg: string
  prompt: string
  accent: string
  success: string
  warning: string
  error: string
  muted: string
  chrome: string
  border: string
}

export const themes: Record<string, Theme> = {
  cmd: {
    label: "Windows CMD (default)",
    bg: "#0C0C0C",
    fg: "#CCCCCC",
    prompt: "#13A10E",
    accent: "#3A96DD",
    success: "#16C60C",
    warning: "#C19C00",
    error: "#E74856",
    muted: "#767676",
    chrome: "#1E1E1E",
    border: "#333333",
  },
  powershell: {
    label: "PowerShell blue",
    bg: "#012456",
    fg: "#EEEDF0",
    prompt: "#F9F1A5",
    accent: "#61D6D6",
    success: "#16C60C",
    warning: "#F9F1A5",
    error: "#E74856",
    muted: "#8A9BB8",
    chrome: "#001A3D",
    border: "#1B3A6B",
  },
  matrix: {
    label: "Follow the white rabbit",
    bg: "#000500",
    fg: "#00FF41",
    prompt: "#00FF41",
    accent: "#7CFC9A",
    success: "#00FF41",
    warning: "#B6FF00",
    error: "#FF3B3B",
    muted: "#0F8A2F",
    chrome: "#001A07",
    border: "#003B10",
  },
  ubuntu: {
    label: "Ubuntu aubergine",
    bg: "#300A24",
    fg: "#FFFFFF",
    prompt: "#8AE234",
    accent: "#729FCF",
    success: "#8AE234",
    warning: "#FCE94F",
    error: "#EF2929",
    muted: "#AD7FA8",
    chrome: "#2C001E",
    border: "#4E1A3D",
  },
  dracula: {
    label: "Dracula",
    bg: "#282A36",
    fg: "#F8F8F2",
    prompt: "#50FA7B",
    accent: "#BD93F9",
    success: "#50FA7B",
    warning: "#F1FA8C",
    error: "#FF5555",
    muted: "#6272A4",
    chrome: "#21222C",
    border: "#44475A",
  },
  amber: {
    label: "Retro amber CRT",
    bg: "#1A1000",
    fg: "#FFB000",
    prompt: "#FFCC00",
    accent: "#FFD580",
    success: "#FFCC00",
    warning: "#FFE0A0",
    error: "#FF5F1F",
    muted: "#9A6A00",
    chrome: "#120B00",
    border: "#3A2600",
  },
}

export const themeNames = Object.keys(themes)

export const themeVars = (t: Theme): React.CSSProperties =>
  ({
    "--t-bg": t.bg,
    "--t-fg": t.fg,
    "--t-prompt": t.prompt,
    "--t-accent": t.accent,
    "--t-success": t.success,
    "--t-warning": t.warning,
    "--t-error": t.error,
    "--t-muted": t.muted,
    "--t-chrome": t.chrome,
    "--t-border": t.border,
  }) as React.CSSProperties
