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
      "Frontend Developer | React | AI & ML",
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
        "│         Frontend Developer | React | AI & ML    │",
        "│                   Mangalore, India              │",
        "└─────────────────────────────────────────────────┘",
        "",
        "PROFESSIONAL SUMMARY",
        "",
        "Passionate Frontend Developer with expertise in React.js, JavaScript, and AI-driven",
        "development. Experienced in building scalable web applications, integrating APIs, and",
        "optimizing workflows using AI technologies. Adept at solving complex problems efficiently,",
        "working with cross-functional teams, and leading frontend development. Working knowledge of",
        "Node.js, Express, MongoDB for backend integration. Fast learner, adaptable, and always",
        "innovating!",
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
        "  • React.js, HTML, CSS, JavaScript",
        "  • Tailwind CSS, Bootstrap",
        "  • Ionic Framework",
        "",
        "Backend Knowledge:",
        "  • Node.js, Express.js (working knowledge)",
        "",
        "Databases Knowledge:",
        "  • MongoDB, Firebase (working knowledge)",
        "",
        "DevOps & Tools:",
        "  • Docker, Git, GitHub",
        "  • Postman",
        "  • CI/CD (Netlify, Vercel)",
        "",
        "AI & ML:",
        "  • Python, AI-driven development",
        "",
        "Other:",
        "  • API Integration",
        "  • JWT Authentication",
        "  • Performance Optimization",
        "",
      ]
    } else if (trimmedCmd === "projects") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                   PROJECTS                       │",
        "└─────────────────────────────────────────────────┘",
        "",
        "1. Solar Data Lake",
        "   • Built a real-time global monitoring platform for solar power plants",
        "   • Integrated APIs to fetch and visualize live power generation & performance analytics",
        "   • Developed a role-based user system for plant operators, analysts, and admins",
        "",
        "2. Ants Portfolio Analyzer",
        "   • Developed an investment tracking platform with React, API integrations, and real-time analytics",
        "   • Built interactive tables & ROI calculations for Large Cap, Mid Cap, and Small Cap stocks",
        "   • Transformed the platform into an Android app for mobile accessibility",
        "",
        "3. Market Basket Analysis",
        "   • Designed the UI for Market Basket Analysis and integrated R scripts for data processing",
        "   • Implemented a dashboard to display association rules & product recommendations",
        "",
        'Type "project1", "project2", or "project3" for more details.',
        "",
      ]
    } else if (["project1", "project2", "project3"].includes(trimmedCmd)) {
      const projectNum = trimmedCmd.charAt(7)
      const projectDetails = {
        "1": [
          "┌─────────────────────────────────────────────────┐",
          "│                Solar Data Lake                   │",
          "└─────────────────────────────────────────────────┘",
          "",
          "A real-time global monitoring platform for solar power plants.",
          "",
          "Key Features:",
          "  • Real-time monitoring of solar power plants globally",
          "  • Live power generation and performance analytics visualization",
          "  • Role-based user system (plant operators, analysts, admins)",
          "  • API integrations for seamless data flow",
          "  • Performance optimizations for handling large datasets",
          "",
          "Technologies:",
          "  • React.js for frontend interface",
          "  • API integrations for real-time data",
          "  • Role-based authentication system",
          "  • Data visualization components",
          "",
        ],
        "2": [
          "┌─────────────────────────────────────────────────┐",
          "│             Ants Portfolio Analyzer              │",
          "└─────────────────────────────────────────────────┘",
          "",
          "An investment tracking platform for stock market analysis.",
          "",
          "Key Features:",
          "  • Investment tracking with real-time analytics",
          "  • Interactive tables for stock performance",
          "  • ROI calculations for Large Cap, Mid Cap, and Small Cap stocks",
          "  • Mobile accessibility through Android app conversion",
          "  • API integrations for market data",
          "",
          "Technologies:",
          "  • React.js for web platform",
          "  • Ionic Framework for Android conversion",
          "  • API integrations for market data",
          "  • Interactive data visualization",
          "",
        ],
        "3": [
          "┌─────────────────────────────────────────────────┐",
          "│             Market Basket Analysis               │",
          "└─────────────────────────────────────────────────┘",
          "",
          "A dashboard for market basket analysis and product recommendations.",
          "",
          "Key Features:",
          "  • UI for Market Basket Analysis",
          "  • Integration with R scripts for data processing",
          "  • Dashboard for association rules display",
          "  • Product recommendation system",
          "  • Data visualization for analytics",
          "",
          "Technologies:",
          "  • React.js for frontend interface",
          "  • R script integration",
          "  • Data visualization components",
          "  • Dashboard design and implementation",
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
        "Frontend Developer | Ants Applied DataScience",
        "Nov 2024 - Present",
        "  • Developed and optimized Ants Portfolio Analyzer, a React-based stock market tool",
        "    for investment tracking",
        "  • Designed and built the Momentum Discovery Page, integrating line graphs and",
        "    API-driven data visualization",
        "  • Converted Ants Portfolio Analyzer into an Android app using Ionic Framework",
        "    and Android Studio",
        "  • Led frontend development for Solar Data Lake, a real-time solar power monitoring",
        "    platform, collaborating with backend & data science teams",
        "  • Implemented performance optimizations, API integrations, and AI-driven features",
        "    to enhance workflow automation",
        "",
        "Frontend Programmer Intern | Ants Applied DataScience",
        "March 2024 - October 2024",
        "  • Designed the Market Basket Analysis UI using React.js and integrated R scripts",
        "    for real-time analytics",
        "  • Developed the AntsAI.in company homepage using WordPress, HTML, CSS, and",
        "    JavaScript for a high-performance landing page",
        "  • Collaborated with backend teams to integrate APIs and ensure seamless data flow",
        "",
      ]
    } else if (trimmedCmd === "education") {
      output = [
        "┌─────────────────────────────────────────────────┐",
        "│                  EDUCATION                       │",
        "└─────────────────────────────────────────────────┘",
        "",
        "Bachelor of Computer Applications (BCA) [Remote Learning]",
        "Manipal University Jaipur | Sept 2024 - Present",
        "",
        "Diploma in Computer Science",
        "S J (Govt) Polytechnic | Nov 2021 - May 2023",
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
        "Location: Mangalore, India",
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
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300 font-mono">
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-gray-800 p-2">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-blue-500 mr-2"></div>
          <span className="text-sm">Command Prompt - Sumanth Kumar Portfolio</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white">
            <Minus className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Square className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div ref={terminalRef} className="flex-1 p-4 overflow-auto bg-black" onClick={handleTerminalClick}>
        {isExiting ? (
          <div className="h-full flex flex-col justify-center items-center">
            {exitText.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "font-mono whitespace-pre text-center",
                  exitStage === 0
                    ? "text-green-400 animate-pulse"
                    : exitStage === 1
                      ? "text-blue-400 animate-binary"
                      : "text-red-400 animate-pulse",
                )}
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Terminal history */}
            {history.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap break-words">
                {line}
              </div>
            ))}

            {/* Current command line */}
            <div className="flex items-center">
              <span>C:\Users\Sumanth&gt;</span>
              <div className="relative flex-1 ml-0.5">
                <span>{input}</span>
                <span
                  className={cn("absolute inline-block w-2 h-5 bg-gray-300", isBlinking ? "animate-blink" : "")}
                  style={{
                    left: `${cursorPosition * 0.6}rem`,
                    opacity: isBlinking ? undefined : 1,
                  }}
                ></span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 w-0 h-0"
                autoFocus
              />
            </div>
          </>
        )}
      </div>

      {/* Social links footer */}
      <div className="flex items-center justify-between bg-gray-800 p-2 text-xs">
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Skarycloud"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-white"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/sumanth-kumar-230194294"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-white"
          >
            <Linkedin className="h-4 w-4 mr-1" />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:sumanth.k.0202@gmail.com" className="flex items-center hover:text-white">
            <Mail className="h-4 w-4 mr-1" />
            <span>Email</span>
          </a>
          <a
            href="https://sumanth-kumar-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-white"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>Portfolio</span>
          </a>
        </div>
        <div className="flex items-center">
          <span>Mangalore, India</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </div>
      </div>
    </div>
  )
}

