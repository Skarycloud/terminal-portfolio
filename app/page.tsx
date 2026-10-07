"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Minus, Square, Github, Linkedin, Mail, ExternalLink, Palette, TerminalSquare, Twitter, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type Line,
  type Out,
  type Tone,
  out,
  art,
  header,
  profile,
  projects,
  findProject,
  aboutLines,
  skillsLines,
  projectsLines,
  projectDetailLines,
  experienceLines,
  educationLines,
  certificationLines,
  contactLines,
  bigText,
  jokes,
  quotes,
} from "@/lib/portfolio"
import { themes, themeNames, themeVars } from "@/lib/themes"
import SnakeGame from "@/components/terminal/snake-game"
import MatrixRain from "@/components/terminal/matrix-rain"

type Mode = "boot" | "terminal" | "snake" | "matrix" | "exiting"

type CommandInfo = { name: string; usage?: string; desc: string; group: "Portfolio" | "System" | "Fun"; aliases?: string[] }

const COMMANDS: CommandInfo[] = [
  { name: "about", desc: "Who is Sumanth Kumar?", group: "Portfolio" },
  { name: "skills", desc: "Technical skills", group: "Portfolio" },
  { name: "projects", desc: "Portfolio projects", group: "Portfolio" },
  { name: "project", usage: "project <n>", desc: "Details for one project", group: "Portfolio" },
  { name: "open", usage: "open <n>", desc: "Open a project in a new tab", group: "Portfolio" },
  { name: "experience", desc: "Work experience", group: "Portfolio" },
  { name: "education", desc: "Educational background", group: "Portfolio" },
  { name: "certifications", desc: "Certifications", group: "Portfolio" },
  { name: "github", desc: "Live list of my latest GitHub repos", group: "Portfolio" },
  { name: "contact", desc: "Contact information", group: "Portfolio" },
  { name: "download", desc: "Download CV", group: "Portfolio" },
  { name: "hire", desc: "Open a pre-filled email to me", group: "Portfolio" },
  { name: "help", desc: "Show this list", group: "System" },
  { name: "ls", desc: "List files", group: "System", aliases: ["dir"] },
  { name: "cd", usage: "cd <dir>", desc: "Change directory", group: "System" },
  { name: "cat", usage: "cat <file>", desc: "Print a file", group: "System", aliases: ["type"] },
  { name: "theme", usage: "theme [name]", desc: "Change the color theme", group: "System" },
  { name: "history", desc: "Commands you have run", group: "System" },
  { name: "neofetch", desc: "System info, terminal style", group: "System" },
  { name: "whoami", desc: "Who are you?", group: "System" },
  { name: "date", desc: "Current date & time", group: "System" },
  { name: "uptime", desc: "How long you've been here", group: "System" },
  { name: "echo", usage: "echo <text>", desc: "Print text", group: "System" },
  { name: "clear", desc: "Clear the screen (Ctrl+L)", group: "System", aliases: ["cls"] },
  { name: "exit", desc: "Close the terminal", group: "System" },
  { name: "snake", desc: "Play snake 🐍", group: "Fun" },
  { name: "matrix", desc: "Enter the Matrix", group: "Fun" },
  { name: "calc", usage: "calc <expr>", desc: "Calculator, e.g. calc (2+3)*4", group: "Fun" },
  { name: "joke", desc: "A programmer joke", group: "Fun" },
  { name: "quote", desc: "An inspiring dev quote", group: "Fun" },
  { name: "coinflip", desc: "Heads or tails?", group: "Fun" },
  { name: "banner", desc: "Print the ASCII banner", group: "Fun" },
]

// Commands that work but aren't advertised in help.
const HIDDEN = ["hi", "hello", "hey", "sudo", "pwd", "link", "rm", "vim", "emacs", "nano", "coffee", "ping"]
const ALL_COMMANDS = [...COMMANDS.flatMap((c) => [c.name, ...(c.aliases ?? [])]), ...HIDDEN].sort()

const ROOT_FILES = [
  "about.txt",
  "skills.txt",
  "experience.txt",
  "education.txt",
  "certifications.txt",
  "contact.txt",
  "resume.pdf",
]
const projectFile = (slug: string) => `${slug}.md`

const QUICK = ["help", "about", "projects", "skills", "experience", "contact", "download", "theme", "snake"]

const LS = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v)
    } catch {}
  },
}

const normalize = (lines: Out[]): Line[] => lines.map((l) => (typeof l === "string" ? out(l) : l))

const toneClass: Record<Tone, string> = {
  default: "",
  accent: "text-[var(--t-accent)]",
  success: "text-[var(--t-success)]",
  warning: "text-[var(--t-warning)]",
  error: "text-[var(--t-error)]",
  muted: "text-[var(--t-muted)]",
}

// Only digits, operators and parens reach Function(), so this can't run arbitrary code.
const calculate = (expr: string): number => {
  const cleaned = expr.replace(/\^/g, "**").replace(/×/g, "*").replace(/÷/g, "/")
  if (!/^[\d\s+\-*/().%]+$/.test(cleaned)) throw new Error("invalid")
  const result = Function(`"use strict"; return (${cleaned})`)()
  if (typeof result !== "number" || !Number.isFinite(result)) throw new Error("invalid")
  return result
}

const formatDuration = (ms: number) => {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return [h && `${h}h`, (h || m) && `${m}m`, `${s % 60}s`].filter(Boolean).join(" ")
}

const commonPrefix = (words: string[]) =>
  words.reduce((acc, w) => {
    let i = 0
    while (i < acc.length && acc[i] === w[i]) i++
    return acc.slice(0, i)
  })

const BOOT_LINES = [
  "SK-BIOS v2.6  (c) Sumanth Kumar Systems",
  "Memory check ........................ 16384K OK",
  "Detecting developer .................. found",
  "Loading kernel: portfolio.sys ........ OK",
  `Mounting /projects ................... ${projects.length} found`,
  "Initializing coffee driver ........... OK ☕",
  "Starting shell...",
]

export default function TerminalPortfolio() {
  const [mode, setMode] = useState<Mode>("boot")
  const [bootLines, setBootLines] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Line[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorPosition, setCursorPosition] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [exitStage, setExitStage] = useState(0)
  const [exitText, setExitText] = useState<string[]>([])
  const [minimized, setMinimized] = useState(false)
  const startedAt = useRef(Date.now())
  const commandCount = useRef(0)

  const [themeName, setThemeName] = useState("cmd")
  const theme = themes[themeName] ?? themes.cmd

  // Interactive greeting state
  const [isAskingName, setIsAskingName] = useState(false)
  const [userName, setUserName] = useState("")

  // Busy state (download / network) hides the prompt
  const [busy, setBusy] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Filesystem + link state
  const [cwd, setCwd] = useState("")
  const [currentProjectLink, setCurrentProjectLink] = useState("")

  const prompt = `C:\\Users\\${userName || "Guest"}${cwd ? `\\${cwd}` : ""}>`

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const print = useCallback((lines: Out[]) => setHistory((prev) => [...prev, ...normalize(lines)]), [])

  const welcome = useCallback((name: string): Line[] => {
    return normalize([
      out("Microsoft Windows [Version 10.0.22621.3155]", "muted"),
      out("(c) Microsoft Corporation. All rights reserved.", "muted"),
      "",
      ...bigText("SUMANTH").map((l) => art(l, "accent")),
      "",
      name ? out(`Welcome back, ${name}! 👋`, "success") : "Welcome to Sumanth Kumar's Portfolio Terminal.",
      out(profile.tagline, "warning"),
      out(profile.stack, "muted"),
      "",
      "Type [[help]] to see available commands, or try [[neofetch]], [[snake]] or [[theme]].",
      out("Tip: underlined text is clickable · ↑/↓ for history · Tab to autocomplete", "muted"),
      "",
    ])
  }, [])

  const finishBoot = (name: string) => {
    try {
      sessionStorage.setItem("sk-booted", "1")
    } catch {}
    setHistory(welcome(name))
    setMode("terminal")
  }

  // Restore saved preferences, then boot (only once per browser session).
  useEffect(() => {
    const savedTheme = LS.get("sk-theme")
    if (savedTheme && themes[savedTheme]) setThemeName(savedTheme)
    const savedName = LS.get("sk-username") ?? ""
    setUserName(savedName)

    let booted = false
    try {
      booted = sessionStorage.getItem("sk-booted") === "1"
    } catch {}

    if (booted) return finishBoot(savedName)

    BOOT_LINES.forEach((line, i) => later(() => setBootLines((prev) => [...prev, line]), 150 + i * 170))
    later(() => finishBoot(savedName), 150 + BOOT_LINES.length * 170 + 350)
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      setBootLines([])
    }
  }, [welcome])

  // Any key or click skips the boot sequence.
  useEffect(() => {
    if (mode !== "boot") return
    const skip = () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      finishBoot(LS.get("sk-username") ?? "")
    }
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)
    return () => {
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
    }
  }, [mode, welcome])

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, bootLines, downloadProgress, busy])

  // Refocus the prompt whenever we return to the terminal
  useEffect(() => {
    if (mode === "terminal" && !busy && !minimized) inputRef.current?.focus()
  }, [mode, busy, minimized])

  // Typing anywhere on the page goes to the prompt
  useEffect(() => {
    if (mode !== "terminal") return
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (document.activeElement !== inputRef.current) inputRef.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mode])

  const setInputValue = (value: string) => {
    setInput(value)
    setCursorPosition(value.length)
    requestAnimationFrame(() => inputRef.current?.setSelectionRange(value.length, value.length))
  }

  const changeTheme = (name: string) => {
    setThemeName(name)
    LS.set("sk-theme", name)
  }

  const cycleTheme = () => {
    const next = themeNames[(themeNames.indexOf(themeName) + 1) % themeNames.length]
    changeTheme(next)
    return next
  }

  const startDownload = () => {
    setBusy(true)
    setDownloadProgress(0)
    print(["Initiating secure connection to download server...", "Preparing CV document for transfer..."])

    let progress = 0
    const interval = setInterval(() => {
      progress = Math.min(100, progress + Math.floor(Math.random() * 15) + 5)
      setDownloadProgress(progress)
      if (progress < 100) return
      clearInterval(interval)
      later(() => {
        const link = document.createElement("a")
        link.href = profile.resume
        link.download = profile.resumeFile
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setBusy(false)
        setDownloadProgress(null)
        print([
          "",
          out("✅ Download complete! The file has been saved to your local device.", "success"),
          out("If the download didn't start automatically, please make sure your browser allows downloads.", "muted"),
          "",
        ])
      }, 500)
    }, 300)
    timers.current.push(interval as unknown as ReturnType<typeof setTimeout>)
  }

  const fetchGithub = async () => {
    setBusy(true)
    print([out(`Fetching repositories for @${profile.githubUser}...`, "muted")])
    try {
      const res = await fetch(
        `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=8&type=owner`,
      )
      if (!res.ok) throw new Error(res.status === 403 ? "GitHub rate limit hit, try again later." : `HTTP ${res.status}`)
      const repos: {
        name: string
        description: string | null
        html_url: string
        stargazers_count: number
        language: string | null
        fork: boolean
        updated_at: string
      }[] = await res.json()
      const own = repos.filter((r) => !r.fork)
      print([
        "",
        ...header("LATEST GITHUB REPOS"),
        ...own.flatMap((r) => [
          out(`★ ${r.stargazers_count}  ${r.name}${r.language ? `  (${r.language})` : ""}`, "warning"),
          ...(r.description ? [`   ${r.description}`] : []),
          out(`   updated ${new Date(r.updated_at).toLocaleDateString()} · ${r.html_url}`, "muted"),
          "",
        ]),
        `More at ${profile.github}`,
        "",
      ])
    } catch (e) {
      print([out(`Could not reach GitHub: ${e instanceof Error ? e.message : "unknown error"}`, "error"), ""])
    } finally {
      setBusy(false)
    }
  }

  const startExitSequence = () => {
    setMode("exiting")
    setExitStage(0)
    setExitText([
      "",
      "████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗    ██╗   ██╗ ██████╗ ██╗   ██╗",
      "╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝    ╚██╗ ██╔╝██╔═══██╗██║   ██║",
      "   ██║   ███████║███████║██╔██╗ ██║█████╔╝      ╚████╔╝ ██║   ██║██║   ██║",
      "   ██║   ██╔══██║██╔══██║██║╚██╗██║██╔═██╗       ╚██╔╝  ██║   ██║██║   ██║",
      "   ██║   ██║  ██║██║  ██║██║ ╚████║██║  ██╗       ██║   ╚██████╔╝╚██████╔╝",
      "   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝       ╚═╝    ╚═════╝  ╚═════╝ ",
      "",
    ])
    later(() => {
      setExitStage(1)
      setExitText(generateBinaryAnimation(7, 70))
      later(() => {
        setExitStage(2)
        setExitText([
          "",
          "██████╗ ██╗   ██╗███████╗",
          "██╔══██╗╚██╗ ██╔╝██╔════╝",
          "██████╔╝ ╚████╔╝ █████╗  ",
          "██╔══██╗  ╚██╔╝  ██╔══╝  ",
          "██████╔╝   ██║   ███████╗",
          "╚═════╝    ╚═╝   ╚══════╝",
          "",
        ])
        later(() => {
          window.location.href = "about:blank"
        }, 1500)
      }, 1500)
    }, 2000)
  }

  const generateBinaryAnimation = (rows: number, cols: number): string[] => [
    "",
    ...Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.5 ? "1" : "0")).join(""),
    ),
    "",
  ]

  // Resolve a path like "projects/emenu.md" or "../about.txt" against cwd.
  const resolvePath = (path: string): string[] => {
    let segs = cwd ? [cwd] : []
    for (const s of path.split(/[\\/]/)) {
      if (!s || s === ".") continue
      if (s === "..") segs.pop()
      else if (s === "~") segs = []
      else segs.push(s.toLowerCase())
    }
    return segs
  }

  const readFile = (path: string): Out[] | null => {
    const segs = resolvePath(path)
    if (segs.length === 1) {
      const files: Record<string, () => Out[]> = {
        "about.txt": aboutLines,
        "skills.txt": skillsLines,
        "experience.txt": experienceLines,
        "education.txt": educationLines,
        "certifications.txt": certificationLines,
        "contact.txt": contactLines,
        "resume.pdf": () => [
          out("%PDF-1.7 ����  ⌂♠♣ obj<</Type/Catalog>> stream x��}ے�...", "muted"),
          out("This is a binary file. Try [[download]] instead. 📄", "warning"),
          "",
        ],
      }
      return files[segs[0]]?.() ?? null
    }
    if (segs.length === 2 && segs[0] === "projects") {
      const p = projects.findIndex((pr) => projectFile(pr.slug) === segs[1])
      if (p === -1) return null
      setCurrentProjectLink(projects[p].links[0].url)
      return projectDetailLines(projects[p], p)
    }
    return null
  }

  const showProject = (query: string): Out[] => {
    const found = findProject(query)
    if (!found) {
      setCurrentProjectLink("")
      return [out(`Project '${query}' not found.`, "error"), `Try a number 1-${projects.length} or see [[projects]].`, ""]
    }
    setCurrentProjectLink(found.project.links[0].url)
    return projectDetailLines(found.project, found.index)
  }

  const openUrl = (url: string, label = url): Out[] => {
    window.open(url, "_blank", "noopener,noreferrer")
    return [out(`Opening ${label} in a new tab...`, "success"), ""]
  }

  const hireMe = (message: string): Out[] => {
    const subject = encodeURIComponent("Let's work together!")
    const body = encodeURIComponent(
      `Hi Sumanth,\n\nI found your terminal portfolio and would love to talk about an opportunity.\n\n${userName}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    return [out(message, "success"), ""]
  }

  // Handle command execution
  const executeCommand = (raw: string) => {
    const trimmed = raw.trim()

    if (isAskingName) {
      const name = trimmed.slice(0, 24) || "Guest"
      setUserName(name)
      LS.set("sk-username", name)
      setIsAskingName(false)
      setHistory((prev) => [
        ...prev,
        { kind: "prompt", prompt: "What is your name? >", text: raw },
        ...normalize([
          "",
          out(`Hello, ${name}! How are you doing? Hope you're doing well! 😊`, "success"),
          "I'm Sumanth Kumar's digital assistant.",
          "What can I help you with?",
          "Type [[help]] to see what I can do for you.",
          "",
        ]),
      ])
      setInputValue("")
      return
    }

    setHistory((prev) => [...prev, { kind: "prompt", prompt, text: raw }])
    setInputValue("")
    if (!trimmed) return

    commandCount.current++
    setCommandHistory((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)].slice(0, 100))
    setHistoryIndex(-1)

    const [first, ...args] = trimmed.split(/\s+/)
    const cmd = first.toLowerCase()
    const argStr = args.join(" ")

    // Legacy "project1".."project5"
    const legacy = cmd.match(/^project(\d+)$/)
    if (legacy) return print(showProject(legacy[1]))

    switch (cmd) {
      case "help": {
        const width = Math.max(...COMMANDS.map((c) => (c.usage ?? c.name).length)) + 2
        const groups = ["Portfolio", "System", "Fun"] as const
        return print([
          ...groups.flatMap((g) => [
            out(`${g}:`, "warning"),
            ...COMMANDS.filter((c) => c.group === g).map((c) => {
              const label = c.usage ?? c.name
              const alias = c.aliases ? ` (${c.aliases.join(", ")})` : ""
              return `  [[${label}|${c.name}]]${" ".repeat(width - label.length)}${c.desc}${alias}`
            }),
            "",
          ]),
          out("Psst... there are a few hidden commands too. Try saying hi.", "muted"),
          "",
        ])
      }
      case "hi":
      case "hello":
      case "hey":
        setIsAskingName(true)
        return print(["", "Hi there! 👋 I'm Sumanth Kumar (well, his terminal portfolio at least!).", "It's great to meet you.", ""])
      case "about":
        return print(aboutLines())
      case "skills":
        return print(skillsLines())
      case "projects":
        return print(projectsLines())
      case "project":
        return print(argStr ? showProject(argStr) : projectsLines())
      case "open": {
        if (!argStr) {
          return print(currentProjectLink ? openUrl(currentProjectLink) : ["Usage: [[open <n>|open 1]]", ""])
        }
        const found = findProject(argStr)
        if (found) return print(openUrl(found.project.links[0].url, found.project.name))
        const socials: Record<string, string> = {
          github: profile.github,
          linkedin: profile.linkedin,
          x: profile.x,
          twitter: profile.x,
          instagram: profile.instagram,
          portfolio: profile.portfolio,
        }
        if (socials[argStr.toLowerCase()]) return print(openUrl(socials[argStr.toLowerCase()]))
        return print([out(`Nothing called '${argStr}' to open.`, "error"), ""])
      }
      case "link":
        return print(
          currentProjectLink
            ? openUrl(currentProjectLink)
            : ["No project currently selected to open.", "View a project first, e.g. [[project 1]].", ""],
        )
      case "experience":
        return print(experienceLines())
      case "education":
        return print(educationLines())
      case "certifications":
      case "certs":
        return print(certificationLines())
      case "contact":
        return print(contactLines())
      case "github":
        fetchGithub()
        return
      case "download":
        startDownload()
        return
      case "hire":
        return print(hireMe("Excellent choice! 🎉 Opening your email client..."))
      case "sudo":
        if (["hire-me", "hire"].includes(args[0]?.toLowerCase()))
          return print(hireMe("Permission granted. 🔓 Opening your email client..."))
        return print([
          out(`[sudo] password for ${userName || "guest"}: ********`, "muted"),
          out(`Nice try, ${userName || "Guest"}. This incident will be reported. 🚨`, "error"),
          "(Hint: try [[sudo hire-me|sudo hire-me]])",
          "",
        ])
      case "rm":
        return print([out("rm: permission denied. This portfolio is read-only (and quite proud of it).", "error"), ""])
      case "vim":
      case "nano":
      case "emacs":
        return print([`${cmd}: the editor wars are not fought here. Peace. ☮️`, ""])
      case "coffee":
        return print(["      ( (", "       ) )", "    ........", "    |      |]", "    \\      /", "     `----'", "", "Brewing... ☕ Sumanth runs on this.", ""])
      case "ping":
        return print([
          `Pinging ${new URL(profile.portfolio).host} with 32 bytes of data:`,
          "Reply: bytes=32 time=1ms TTL=128  (available for opportunities)",
          "Reply: bytes=32 time=1ms TTL=128  (open to collaboration)",
          "Type [[contact]] to establish a real connection.",
          "",
        ])

      // ── Filesystem ─────────────────────────────────────────
      case "ls":
      case "dir": {
        const segs = argStr ? resolvePath(argStr) : cwd ? [cwd] : []
        if (segs.length === 0)
          return print([
            out("projects/", "accent"),
            ...ROOT_FILES.map((f) => `[[${f}|cat ~/${f}]]`),
            "",
          ])
        if (segs.length === 1 && segs[0] === "projects")
          return print([...projects.map((p) => `[[${projectFile(p.slug)}|cat ~/projects/${projectFile(p.slug)}]]`), ""])
        return print([out(`ls: cannot access '${argStr}': No such directory`, "error"), ""])
      }
      case "cd": {
        const segs = argStr ? resolvePath(argStr) : []
        if (segs.length === 0) return setCwd("")
        if (segs.length === 1 && segs[0] === "projects") return setCwd("projects")
        return print([out(`cd: ${argStr}: No such directory`, "error"), ""])
      }
      case "pwd":
        return print([`C:\\Users\\${userName || "Guest"}${cwd ? `\\${cwd}` : ""}`, ""])
      case "cat":
      case "type": {
        if (!argStr) return print(["Usage: cat <file>   (see [[ls]])", ""])
        const content = readFile(argStr)
        if (content) return print(content)
        if (resolvePath(argStr).join("/") === "projects") return print([out(`cat: ${argStr}: Is a directory`, "error"), ""])
        return print([out(`cat: ${argStr}: No such file`, "error"), ""])
      }

      // ── System ─────────────────────────────────────────────
      case "theme": {
        const name = args[0]?.toLowerCase()
        if (!name)
          return print([
            out("Available themes:", "warning"),
            ...themeNames.map(
              (n) => `  [[${n}|theme ${n}]]${" ".repeat(12 - n.length)}${themes[n].label}${n === themeName ? "  ← current" : ""}`,
            ),
            "",
            "Usage: theme <name>  ·  [[theme next|theme next]] to cycle",
            "",
          ])
        if (name === "next") return print([out(`Theme set to '${cycleTheme()}'.`, "success"), ""])
        if (!themes[name]) return print([out(`Unknown theme '${name}'. Type [[theme]] to list them.`, "error"), ""])
        changeTheme(name)
        return print([out(`Theme set to '${name}'.`, "success"), ""])
      }
      case "history":
        return print([
          ...[trimmed, ...commandHistory.filter((c) => c !== trimmed)]
            .slice(0, 50)
            .reverse()
            .map((c, i) => `  ${String(i + 1).padStart(3)}  [[${c}|${c}]]`),
          "",
        ])
      case "whoami":
        return print([
          userName ? `${userName.toLowerCase()} — a very welcome visitor.` : "guest — say [[hi]] and introduce yourself!",
          "",
        ])
      case "date":
        return print([new Date().toString(), ""])
      case "uptime":
        return print([`Session uptime: ${formatDuration(Date.now() - startedAt.current)} · ${commandCount.current} commands run`, ""])
      case "echo":
        return print([argStr, ""])
      case "neofetch": {
        const logo = bigText("SK")
        const user = (userName || "guest").toLowerCase()
        const info = [
          `${user}@sumanth-portfolio`,
          "-".repeat(user.length + 18),
          `OS: PortfolioOS 2.0 (Next.js)`,
          `Host: ${profile.location}`,
          `Role: ${profile.role}`,
          `Uptime: ${formatDuration(Date.now() - startedAt.current)}`,
          `Shell: sk-term`,
          `Theme: ${themeName}`,
          `Stack: React, Next.js, React Native, Expo, Node.js`,
          `Now: Mirchi35 · eMenu · Auralion Labs`,
          `Projects: ${projects.filter((p) => p.tier === "featured").length} featured, ${projects.length} total`,
        ]
        const rows = Math.max(logo.length, info.length)
        return print([
          ...Array.from({ length: rows }, (_, i) => art(`${(logo[i] ?? "").padEnd(18)}  ${info[i] ?? ""}`)),
          "",
        ])
      }
      case "clear":
      case "cls":
        setCurrentProjectLink("")
        setHistory([])
        return
      case "exit":
        startExitSequence()
        return

      // ── Fun ────────────────────────────────────────────────
      case "snake":
        setMode("snake")
        return
      case "matrix":
        setMode("matrix")
        return
      case "calc": {
        if (!argStr) return print(["Usage: calc <expression>   e.g. [[calc (2+3)*4|calc (2+3)*4]]", ""])
        try {
          const result = calculate(argStr)
          return print([out(`${argStr} = ${Number(result.toPrecision(12))}`, "success"), ""])
        } catch {
          return print([out("calc: invalid expression. Use numbers and + - * / % ^ ( )", "error"), ""])
        }
      }
      case "joke":
        return print([jokes[Math.floor(Math.random() * jokes.length)], "", "Want another? [[joke]]", ""])
      case "quote": {
        const [q, who] = quotes[Math.floor(Math.random() * quotes.length)]
        return print([`"${q}"`, out(`   — ${who}`, "muted"), ""])
      }
      case "coinflip":
      case "flip":
        return print([`🪙 ${Math.random() < 0.5 ? "Heads" : "Tails"}!`, ""])
      case "banner":
        return print([...bigText("SUMANTH").map((l) => art(l, "accent")), "", profile.tagline, profile.stack, ""])
    }

    const suggestion =
      cmd.length > 1 ? ALL_COMMANDS.find((c) => !HIDDEN.includes(c) && c.startsWith(cmd.slice(0, 2))) : undefined
    print([
      out(`'${first}' is not recognized as an internal or external command.`, "error"),
      suggestion ? `Did you mean [[${suggestion}]]? Type [[help]] to see available commands.` : "Type [[help]] to see available commands.",
      "",
    ])
  }

  const complete = () => {
    const parts = input.split(" ")
    const last = parts[parts.length - 1].toLowerCase()
    let candidates: string[]
    if (parts.length === 1) {
      candidates = ALL_COMMANDS.filter((c) => !HIDDEN.includes(c))
    } else {
      const cmd = parts[0].toLowerCase()
      if (cmd === "theme") candidates = [...themeNames, "next"]
      else if (cmd === "project" || cmd === "open") candidates = projects.map((p) => p.slug)
      else if (cmd === "cd") candidates = cwd ? ["..", "~"] : ["projects"]
      else if (["cat", "type", "ls", "dir"].includes(cmd))
        candidates = cwd ? projects.map((p) => projectFile(p.slug)) : [...ROOT_FILES, "projects/"]
      else candidates = []
    }
    const matches = candidates.filter((c) => c.startsWith(last))
    if (matches.length === 0) return
    const replace = (word: string) => setInputValue([...parts.slice(0, -1), word].join(" "))
    if (matches.length === 1) {
      replace(matches[0] + (parts.length === 1 || !matches[0].endsWith("/") ? " " : ""))
      return
    }
    replace(commonPrefix(matches))
    print([{ kind: "prompt", prompt, text: input }, out(matches.join("   "), "muted")])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputValue("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (!isAskingName) complete()
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault()
      setHistory([])
    } else if (e.ctrlKey && e.key.toLowerCase() === "c" && !window.getSelection()?.toString()) {
      e.preventDefault()
      print([{ kind: "prompt", prompt: isAskingName ? "What is your name? >" : prompt, text: `${input}^C` }])
      setIsAskingName(false)
      setInputValue("")
    }
  }

  const syncCursor = (e: React.SyntheticEvent<HTMLInputElement>) =>
    setCursorPosition(e.currentTarget.selectionStart ?? e.currentTarget.value.length)

  const runClicked = (cmd: string) => {
    if (busy || mode !== "terminal") return
    if (isAskingName) setIsAskingName(false)
    executeCommand(cmd)
  }

  // Turns [[label|command]], URLs and emails into clickable elements.
  const renderRich = (text: string) =>
    text.split(/(\[\[[^\]]+\]\]|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]*\w)/g).map((part, i) => {
      if (i % 2 === 0) return part
      if (part.startsWith("[[")) {
        const [label, cmd = label] = part.slice(2, -2).split("|")
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              runClicked(cmd)
            }}
            className="underline decoration-dotted underline-offset-4 text-[var(--t-prompt)] hover:decoration-solid focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--t-prompt)]"
          >
            {label}
          </button>
        )
      }
      const href = part.startsWith("http") ? part : `mailto:${part}`
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline underline-offset-4 text-[var(--t-accent)] hover:opacity-80"
        >
          {part}
        </a>
      )
    })

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }

  const showPrompt = mode === "terminal" && !busy

  if (minimized) {
    return (
      <div style={themeVars(theme)} className="h-screen bg-[var(--t-bg)] flex items-end justify-center p-6 font-mono">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-4 py-2 rounded border border-[var(--t-border)] bg-[var(--t-chrome)] text-[var(--t-fg)] hover:border-[var(--t-prompt)] transition-colors"
        >
          <TerminalSquare className="h-4 w-4 text-[var(--t-prompt)]" />
          Terminal - Sumanth Kumar
        </button>
      </div>
    )
  }

  return (
    <div
      style={themeVars(theme)}
      className="flex flex-col h-[100dvh] bg-[var(--t-bg)] text-[var(--t-fg)] font-mono selection:bg-[var(--t-fg)] selection:text-[var(--t-bg)] relative overflow-hidden transition-colors duration-300"
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

      {mode === "matrix" && <MatrixRain color={themeName === "amber" ? theme.fg : "#00FF41"} onExit={() => setMode("terminal")} />}

      {/* Terminal header */}
      <div className="flex items-center justify-between bg-[var(--t-chrome)] p-2 border-b border-[var(--t-border)] z-10 select-none shadow-md">
        <div className="flex items-center min-w-0">
          <div className="h-3 w-3 md:h-4 md:w-4 bg-[var(--t-prompt)] mr-2 ml-1 shadow-[0_0_8px_var(--t-prompt)] shrink-0"></div>
          <span className="text-xs md:text-sm font-semibold tracking-wider truncate">
            Terminal - Sumanth Kumar{mode === "snake" ? " — snake.exe" : ""}
          </span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            onClick={() => {
              const next = cycleTheme()
              if (mode === "terminal") print([out(`Theme set to '${next}'.`, "muted")])
            }}
            title={`Theme: ${themeName} (click to cycle)`}
            aria-label="Cycle theme"
            className="hover:bg-[var(--t-border)] p-1 rounded transition-colors"
          >
            <Palette className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button
            onClick={() => setMinimized(true)}
            aria-label="Minimize"
            className="hover:bg-[var(--t-border)] p-1 rounded transition-colors hidden sm:block"
          >
            <Minus className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="hover:bg-[var(--t-border)] p-1 rounded transition-colors hidden sm:block"
          >
            <Square className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button
            onClick={() => mode !== "exiting" && startExitSequence()}
            aria-label="Close"
            className="hover:bg-[#C50F1F] hover:text-white p-1 rounded transition-colors"
          >
            <X className="h-3 w-3 md:h-4 md:w-4" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="flex-1 p-2 md:p-4 overflow-auto z-10 text-xs sm:text-sm md:text-base w-full overflow-x-hidden"
        style={{ textShadow: "0 0 2px color-mix(in srgb, var(--t-fg) 30%, transparent)" }}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus()
        }}
      >
        {mode === "exiting" ? (
          <div className="h-full flex flex-col justify-center items-center">
            {exitText.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "font-mono whitespace-pre text-center leading-tight text-[min(1.9vw,1rem)]",
                  exitStage === 0
                    ? "text-[var(--t-prompt)] animate-pulse"
                    : exitStage === 1
                      ? "text-[var(--t-accent)] animate-binary"
                      : "text-[var(--t-error)] animate-pulse",
                )}
              >
                {line}
              </div>
            ))}
          </div>
        ) : mode === "boot" ? (
          <div>
            {bootLines.map((line, i) => (
              <div key={i} className={cn("whitespace-pre-wrap break-words", i === 0 && "text-[var(--t-accent)]")}>
                {line}
              </div>
            ))}
            <span className="inline-block w-[0.6em] h-[1.2em] bg-[var(--t-fg)] animate-blink align-text-bottom" />
            <div className="mt-4 text-[var(--t-muted)] text-xs">press any key to skip</div>
          </div>
        ) : mode === "snake" ? (
          <SnakeGame
            colors={{
              bg: theme.bg,
              fg: theme.fg,
              snake: theme.prompt,
              food: theme.error,
              muted: theme.muted,
              border: theme.border,
            }}
            onExit={(score, best) => {
              setMode("terminal")
              print([out(`🐍 Snake ended · score ${score} · best ${best}`, "success"), "Play again? [[snake]]", ""])
            }}
          />
        ) : (
          <>
            {history.map((line, index) =>
              line.kind === "prompt" ? (
                <div key={index} className="whitespace-pre-wrap break-words flex items-start">
                  <span className="text-[var(--t-prompt)] mr-2 shrink-0">{line.prompt}</span>
                  <span className="break-all">{line.text}</span>
                </div>
              ) : (
                <div
                  key={index}
                  className={cn(
                    line.art
                      ? "whitespace-pre leading-tight text-[min(2.3vw,0.95rem)]"
                      : "whitespace-pre-wrap break-words",
                    toneClass[line.tone ?? "default"],
                  )}
                >
                  {line.text ? renderRich(line.text) : "\u00A0"}
                </div>
              ),
            )}

            {downloadProgress !== null && (
              <div className="mb-2">
                <div className="mb-1">Downloading: {profile.resumeFile}</div>
                <div className="flex items-center text-[var(--t-prompt)]">
                  <span className="mr-2">[</span>
                  <span className="whitespace-pre">
                    {"=".repeat(Math.floor(downloadProgress / 5))}
                    {" ".repeat(20 - Math.floor(downloadProgress / 5))}
                  </span>
                  <span className="ml-2">] {downloadProgress}%</span>
                </div>
              </div>
            )}

            {showPrompt && (
              <div className="flex items-start">
                <span className="text-[var(--t-prompt)] mr-2 shrink-0">{isAskingName ? "What is your name? >" : prompt}</span>
                <div className="relative flex-1 break-all whitespace-pre-wrap outline-none">
                  <span>{input.slice(0, cursorPosition)}</span>
                  <span className="inline-block min-w-[0.6em] h-[1.2em] align-text-bottom animate-blink bg-[var(--t-fg)] text-[var(--t-bg)] whitespace-pre">
                    {input.charAt(cursorPosition) || " "}
                  </span>
                  <span>{input.slice(cursorPosition + 1)}</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    syncCursor(e)
                  }}
                  onSelect={syncCursor}
                  onKeyDown={handleKeyDown}
                  className="opacity-0 absolute w-0 h-0"
                  aria-label="Terminal input"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoFocus
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick commands for touch screens */}
      {mode === "terminal" && (
        <div className="sm:hidden flex gap-2 overflow-x-auto px-2 py-2 bg-[var(--t-chrome)] border-t border-[var(--t-border)] z-10 [scrollbar-width:none]">
          {QUICK.map((c) => (
            <button
              key={c}
              onClick={() => runClicked(c)}
              disabled={busy}
              className="shrink-0 px-3 py-1 text-xs rounded-full border border-[var(--t-border)] text-[var(--t-fg)] active:bg-[var(--t-border)] disabled:opacity-40"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Social links footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[var(--t-chrome)] p-3 text-xs md:text-sm border-t border-[var(--t-border)] z-10 select-none gap-2 sm:gap-0">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:space-x-4 sm:gap-0">
          {[
            { href: profile.github, icon: Github, label: "GitHub" },
            { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: profile.x, icon: Twitter, label: "X" },
            { href: profile.instagram, icon: Instagram, label: "Instagram" },
            { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            { href: profile.portfolio, icon: ExternalLink, label: "Portfolio" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center text-[var(--t-muted)] hover:text-[var(--t-prompt)] transition-colors"
            >
              <Icon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[var(--t-muted)]">
          <span>theme: {themeName}</span>
          <span>© {new Date().getFullYear()} Sumanth Kumar</span>
        </div>
      </div>
    </div>
  )
}
