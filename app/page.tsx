"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minus, Square, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TerminalPortfolio() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorPosition, setCursorPosition] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isBlinking, setIsBlinking] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [exitStage, setExitStage] = useState(0)
  const [exitText, setExitText] = useState<string[]>([])

  // Terminal welcome message
  useEffect(() => {
    const welcomeMessage = [
      "Microsoft Windows [Version 10.0.22621.3155]",
      "(c) Microsoft Corporation. All rights reserved.",
      "",
      "Welcome to Sumanth Kumar's Portfolio Terminal.",
      "Full Stack Developer | React | Node.js | AI",
      'Type "help" to see available commands.',
      "",
    ]
    setHistory(welcomeMessage)
  }, [])

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input on load and when clicked anywhere in terminal
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let output: string[] = []

    // Add command to history
    if (trimmedCmd) {
      setCommandHistory((prev) => [trimmedCmd, ...prev])
      setHistoryIndex(-1)
    }

    // Process commands
    if (trimmedCmd === "help") {
      output = [
        "Available commands:",
        "  about       - Display information about Sumanth Kumar",
        "  skills      - List technical skills",
        "  projects    - Show portfolio projects",
        "  experience  - Show work experience",
        "  education   - Show educational background",
        "  certifications - Show certifications and achievements",
        "  contact     - Display contact information",
        "  clear       - Clear the terminal screen",
        "  exit        - Close the terminal (refresh to restart)",
        "",
      ]
    } else if (trimmedCmd === "about") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                  SUMANTH KUMAR                  │",
        "│      Full Stack Developer | React | Node.js     │",
        "│                   Bangalore, India              │",
        "└─────────────────────────────────────────────────┘",
        "",
        "PROFESSIONAL SUMMARY",
        "",
        "Passionate Full Stack Developer skilled in React, React Native - Android development,",
        "modern JavaScript, and AI-powered automation, focused on building scalable",
        "real-world applications. Strong communication and collaboration skills,",
        "problem-solving ability, experience in Agile development environments,",
        "and rapid prototyping and development using AI-assisted tools.",
        "",
        "WHY HIRE ME?",
        "✓ Fast problem solver & AI-driven development enthusiast",
        "✓ Frontend expertise with working knowledge of backend technologies",
        "✓ Quick learner, adaptive & strong in collaboration",
        "✓ Proven track record of delivering high-impact projects",
        "✓ Passionate about innovation, AI, and automation",
        "",
        'Type "skills", "projects", or "contact" to learn more.',
        "",
      ]
    } else if (trimmedCmd === "skills") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                    SKILLS                        │",
        "└─────────────────────────────────────────────────┘",
        "",
        "Frontend:",
        "  • React.js, React Native, Next.js, JavaScript (ES6+)",
        "  • TypeScript, HTML5, CSS3, Tailwind CSS",
        "",
        "Backend & Databases:",
        "  • Node.js, Express.js, REST APIs, JWT Authentication",
        "  • MongoDB, PostgreSQL (Supabase), SQL",
        "",
        "Mobile Development:",
        "  • React Native, Expo Go, Ionic Capacitor",
        "",
        "Tools & Platforms:",
        "  • Git, GitHub, Docker, Postman",
        "  • Vercel, Netlify, Hostinger",
        "",
        "AI, Automation & Design:",
        "  • Python, n8n Automation",
        "  • ChatGPT, Claude, Gemini, AI-assisted development, Prompt Engineering",
        "  • Figma, UI/UX Design",
        "",
      ]
    } else if (trimmedCmd === "projects") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                   PROJECTS                       │",
        "└─────────────────────────────────────────────────┘",
        "",
        "1. eMenu - QR-Based Digital Menu Platform",
        "   • Built a React/Next.js platform enabling restaurants to manage menus digitally",
        "   • Integrated Google Sheets/CSV for real-time menu updates",
        "",
        "2. Scavenge - Scavenger Hunt Adventure Platform",
        "   • Developed an interactive platform using React, Node.js, and Maps API",
        "   • Implemented custom hunt creation, real-time GPS tracking, and leaderboards",
        "",
        "3. image-π – Privacy-First Browser Image Toolkit",
        "   • Created a client-side image processing toolkit using Canvas/Web APIs",
        "   • Added features for compression, format conversion, cropping, and watermarking",
        "",
        "4. Code Stack - Developer Tools & Resources Directory",
        "   • Built an open-source Next.js directory for frontend/backend tools",
        "",
        "5. Oryx AI – AI Training Data & Model Evaluation Platform",
        "   • Developed a Node.js/React platform offering standardized AI training datasets",
        "",
        "Type \"project1\", \"project2\", \"project3\", \"project4\", or \"project5\" for more details.",
        "",
      ]
    } else if (["project1", "project2", "project3", "project4", "project5"].includes(trimmedCmd)) {
      const projectNum = trimmedCmd.charAt(7)
      const projectDetails: Record<string, string[]> = {
        "1": [
          "┌─────────────────────────────────────────────────┐",
          "│     eMenu - QR-Based Digital Menu Platform       │",
          "└─────────────────────────────────────────────────┘",
          "",
          "A QR-based digital menu platform that enables restaurants",
          "and cafés to publish and update menus instantly without printing.",
          "",
          "Key Features:",
          "  • Google Sheets/CSV-powered menu management system",
          "  • QR-based menu access & analytics",
          "  • Multi-category menu management",
          "  • Real-time updates for items & pricing",
          "",
          "Technologies:",
          "  • React, Next.js, Node.js, JavaScript",
          "  • Google Sheets Integration",
          "  • QR Code Integration",
          "",
        ],
        "2": [
          "┌─────────────────────────────────────────────────┐",
          "│    Scavenge - Scavenger Hunt Adventure Platform  │",
          "└─────────────────────────────────────────────────┘",
          "",
          "An interactive platform that allows users to create and",
          "participate in real-world scavenger hunt games.",
          "",
          "Key Features:",
          "  • Custom hunt creation & team-based gameplay",
          "  • Real-time GPS tracking & live leaderboards",
          "  • Chat, progress tracking & event management",
          "  • QR code challenges",
          "",
          "Technologies:",
          "  • React, JavaScript, Node.js",
          "  • Maps API, QR Code Integration",
          "",
        ],
        "3": [
          "┌─────────────────────────────────────────────────┐",
          "│   image-π – Privacy-First Browser Image Toolkit  │",
          "└─────────────────────────────────────────────────┘",
          "",
          "A browser-based image processing toolkit that processes",
          "images locally without server uploads ensuring privacy.",
          "",
          "Key Features:",
          "  • Tools: Compression, format conversion, cropping",
          "  • Background removal & EXIF stripping",
          "  • Base64 conversion, QR code & favicon generator",
          "  • Fast client-side processing",
          "",
          "Technologies:",
          "  • React, TypeScript, JavaScript",
          "  • HTML5, CSS3, Canvas API, Web APIs",
          "",
        ],
        "4": [
          "┌─────────────────────────────────────────────────┐",
          "│   Code Stack - Developer Tools Directory         │",
          "└─────────────────────────────────────────────────┘",
          "",
          "An open-source developer resource platform organizing",
          "frameworks, tools, and resources into a structured directory.",
          "",
          "Key Features:",
          "  • Clean, responsive UI for discovering technologies",
          "  • Conceptually organized for frontend, backend, databases",
          "  • Searchable directory structure",
          "",
          "Technologies:",
          "  • Next.js, TypeScript, React",
          "  • Tailwind CSS",
          "",
        ],
        "5": [
          "┌─────────────────────────────────────────────────┐",
          "│ Oryx AI – AI Training Data Evaluation Platform   │",
          "└─────────────────────────────────────────────────┘",
          "",
          "A platform providing standardized training datasets and",
          "evaluation tools for AI/LLM models.",
          "",
          "Key Features:",
          "  • Dataset repositories & preprocessing pipelines",
          "  • Format transformation tools & model analytics",
          "  • API-based data access & credit-based usage",
          "",
          "Technologies:",
          "  • Node.js, React, Python",
          "  • Tailwind CSS, JavaScript",
          "",
        ],
      }
      output = projectDetails[projectNum] || ["Project details not found."]
    } else if (trimmedCmd === "experience") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                  EXPERIENCE                      │",
        "└─────────────────────────────────────────────────┘",
        "",
        "Frontend Programmer (MEAN Stack) | Ants Applied DataScience",
        "Nov 2023 - Mar 2025",
        "  • Developed Ants Portfolio Analyzer, a financial analytics platform for Cap stocks",
        "  • Successfully converted the web application into an Android app using Ionic Capacitor",
        "  • Contributed to Solar Data Lake for real-time solar power plant IoT monitoring",
        "  • Worked on AI and data analysis projects, integrating R scripts for analysis",
        "  • Built interactive dashboards and implemented subscription-based models",
        "",
        "Associate MERN Stack Developer & Test Engineer | Mirchi35 Private Limited",
        "Mar 2023 - Oct 2023",
        "  • Built and launched two React Native (Expo) Android apps for a vendor/user platform",
        "  • Handled Android builds and Google Play Console deployment",
        "  • Designed UI/UX layouts in Figma and developed the responsive landing page",
        "",
        "Assistant Software Programmer (Intern) | Ants Applied DataScience",
        "Mar 2023 - Oct 2023",
        "  • Assisted in AI and ML projects, including data cleaning and standardization",
        "  • Integrated RESTful APIs and applied new technologies to development tasks",
        "",
      ]
    } else if (trimmedCmd === "education") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                  EDUCATION                       │",
        "└─────────────────────────────────────────────────┘",
        "",
        "Bachelor of Computer Applications (BCA)",
        "Manipal University Jaipur | Remote, India | May 2024 - May 2027",
        "",
        "Diploma in Computer Science & Engineering",
        "S J (Govt) Polytechnic | Bangalore, India | Nov 2021 - May 2023 | GPA: 9.0",
        "",
      ]
    } else if (trimmedCmd === "certifications") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│           CERTIFICATIONS & ACHIEVEMENTS          │",
        "└─────────────────────────────────────────────────┘",
        "",
        "• HTML, CSS, and JavaScript for Web Developers – Johns Hopkins University (Coursera)",
        "• Developing Cloud Apps with Node.js and React – IBM (Coursera)",
        "• AI for Everyone – DeepLearning.AI (Coursera)",
        "• Docker for absolute beginners (Coursera)",
        "• ChatGPT Prompt Engineering for Developers (DeepLearning.AI)",
        "",
      ]
    } else if (trimmedCmd === "contact") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                   CONTACT                        │",
        "└─────────────────────────────────────────────────┘",
        "",
        "Email: sumanth.k.0202@gmail.com",
        "Phone: +91 8970732689",
        "GitHub: github.com/Skarycloud",
        "LinkedIn: linkedin.com/in/sumanth-kumar-230194294",
        "Portfolio: sumanth-kumar-portfolio.vercel.app",
        "Location: Bangalore, India",
        "",
        "Feel free to reach out for collaboration or opportunities!",
        "LET'S CONNECT!",
        "",
      ]
    } else if (trimmedCmd === "clear") {
      setHistory([])
      return
    } else if (trimmedCmd === "exit") {
      setIsExiting(true)
      setExitStage(0)
      startExitSequence()
      return
    } else if (trimmedCmd) {
      output = [
        `'${trimmedCmd}' is not recognized as an internal or external command.`,
        'Type "help" to see available commands.',
        "",
      ]
    }

    // Update terminal history
    setHistory((prev) => [...prev, `C:\\Users\\Sumanth>${cmd}`, ...output])
    setInput("")
  }

  // Handle key navigation in command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
        setCursorPosition(commandHistory[newIndex].length)
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = commandHistory[newIndex].length
            inputRef.current.selectionEnd = commandHistory[newIndex].length
          }
        }, 0)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
        setCursorPosition(commandHistory[newIndex].length)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
        setCursorPosition(0)
      }
    } else if (e.key === "ArrowLeft") {
      if (cursorPosition > 0) {
        setCursorPosition(cursorPosition - 1)
      }
    } else if (e.key === "ArrowRight") {
      if (cursorPosition < input.length) {
        setCursorPosition(cursorPosition + 1)
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const commands = ["help", "about", "skills", "projects", "experience", "education", "contact", "clear", "exit"]
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(input.toLowerCase()))

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
        setCursorPosition(matchingCommands[0].length)
      }
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setCursorPosition(e.target.selectionStart || 0)
  }

  // Handle terminal click to focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const startExitSequence = () => {
    // Stage 0: Show "THANK YOU" message
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

    // Stage 1: Convert to binary after 2 seconds
    setTimeout(() => {
      setExitStage(1)
      const binaryLines = generateBinaryAnimation(7, 70)
      setExitText(binaryLines)

      // Stage 2: Show "BYE" after 1.5 more seconds
      setTimeout(() => {
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

        // Finally close the window after 1.5 more seconds
        setTimeout(() => {
          window.location.href = "about:blank"
        }, 1500)
      }, 1500)
    }, 2000)
  }

  // Add this helper function to generate binary animation
  const generateBinaryAnimation = (rows: number, cols: number): string[] => {
    const lines: string[] = [""]
    for (let i = 0; i < rows; i++) {
      let line = ""
      for (let j = 0; j < cols; j++) {
        line += Math.random() > 0.5 ? "1" : "0"
      }
      lines.push(line)
    }
    lines.push("")
    return lines
  }

  return (
    <div className="flex flex-col h-screen bg-[#0C0C0C] text-[#CCCCCC] font-mono selection:bg-[#CCCCCC] selection:text-[#0C0C0C] relative overflow-hidden">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

      {/* Terminal header */}
      <div className="flex items-center justify-between bg-[#1E1E1E] p-2 border-b border-[#333] z-10 select-none shadow-md">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-[#13A10E] mr-2 ml-1 shadow-[0_0_8px_#13A10E]"></div>
          <span className="text-sm font-semibold tracking-wider text-[#CCCCCC]">Command Prompt - Sumanth Kumar Portfolio</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-[#CCCCCC] hover:bg-[#333] p-1 rounded transition-colors">
            <Minus className="h-4 w-4" />
          </button>
          <button className="text-[#CCCCCC] hover:bg-[#333] p-1 rounded transition-colors">
            <Square className="h-4 w-4" />
          </button>
          <button className="text-[#CCCCCC] hover:bg-[#C50F1F] hover:text-white p-1 rounded transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef} 
        className="flex-1 p-4 overflow-auto bg-[#0C0C0C] z-10" 
        style={{ textShadow: "0 0 2px rgba(204, 204, 204, 0.3)" }}
        onClick={handleTerminalClick}
      >
        {isExiting ? (
          <div className="h-full flex flex-col justify-center items-center">
            {exitText.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "font-mono whitespace-pre text-center",
                  exitStage === 0
                    ? "text-[#13A10E] animate-pulse"
                    : exitStage === 1
                      ? "text-[#3A96DD] animate-binary"
                      : "text-[#C50F1F] animate-pulse",
                )}
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Terminal history */}
            {history.map((line, index) => {
              if (line.startsWith("C:\\Users\\Sumanth>")) {
                return (
                  <div key={index} className="whitespace-pre-wrap break-words flex items-start">
                    <span className="text-[#13A10E] mr-2 shrink-0">C:\Users\Sumanth&gt;</span>
                    <span className="text-[#CCCCCC]">{line.substring(17)}</span>
                  </div>
                )
              }
              const isError = line.includes("not recognized")
              return (
                <div key={index} className={cn("whitespace-pre-wrap break-words", isError ? "text-[#C50F1F]" : "")}>
                  {line}
                </div>
              )
            })}

            {/* Current command line */}
            <div className="flex items-start">
              <span className="text-[#13A10E] mr-2 shrink-0">C:\Users\Sumanth&gt;</span>
              <div className="relative flex-1 break-all whitespace-pre-wrap outline-none">
                <span>{input.slice(0, cursorPosition)}</span>
                <span
                  className={cn(
                    "inline-block min-w-[0.6em] h-[1.2rem] align-text-bottom",
                    isBlinking ? "animate-blink bg-[#CCCCCC] text-[#0C0C0C]" : "bg-[#CCCCCC] text-[#0C0C0C]",
                    "whitespace-pre"
                  )}
                >
                  {input.charAt(cursorPosition) || " "}
                </span>
                <span>{input.slice(cursorPosition + 1)}</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="opacity-0 absolute w-0 h-0"
                autoFocus
              />
            </div>
          </>
        )}
      </div>

      {/* Social links footer */}
      <div className="flex items-center justify-between bg-[#1E1E1E] p-2 text-xs border-t border-[#333] z-10 select-none">
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Skarycloud"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#AAAAAA] hover:text-[#13A10E] transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/sumanth-kumar-230194294"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#AAAAAA] hover:text-[#13A10E] transition-colors"
          >
            <Linkedin className="h-4 w-4 mr-1" />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:sumanth.k.0202@gmail.com" className="flex items-center text-[#AAAAAA] hover:text-[#13A10E] transition-colors">
            <Mail className="h-4 w-4 mr-1" />
            <span>Email</span>
          </a>
          <a
            href="https://sumanth-kumar-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#AAAAAA] hover:text-[#13A10E] transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>Portfolio</span>
          </a>
        </div>
        <div className="flex items-center text-[#AAAAAA]">
          <span>Bangalore, India</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </div>
      </div>
    </div>
  )
}

