"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type Point = { x: number; y: number }
type Status = "playing" | "paused" | "over"

const GRID = 20
const BEST_KEY = "sk-snake-best"

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

const writeBest = (score: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(score))
  } catch {}
}

const randomFood = (snake: Point[]): Point => {
  while (true) {
    const p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p
  }
}

const initialState = () => {
  const snake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ]
  return { snake, dir: { x: 1, y: 0 }, queued: [] as Point[], food: randomFood(snake), score: 0 }
}

type Colors = { bg: string; fg: string; snake: string; food: string; muted: string; border: string }

export default function SnakeGame({ colors, onExit }: { colors: Colors; onExit: (score: number, best: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const game = useRef(initialState())
  const [status, setStatus] = useState<Status>("playing")
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [size, setSize] = useState(320)

  useEffect(() => setBest(readBest()), [])

  // Fit the board to the available space.
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const s = Math.max(GRID * 8, Math.min(width, height - 120, 520))
      setSize(Math.floor(s / GRID) * GRID)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    const cell = size / GRID
    const { snake, food } = game.current
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = colors.border
    for (let i = 0; i < GRID; i++)
      for (let j = 0; j < GRID; j++) ctx.fillRect(i * cell + cell / 2 - 0.5, j * cell + cell / 2 - 0.5, 1, 1)
    ctx.fillStyle = colors.food
    ctx.fillRect(food.x * cell + 2, food.y * cell + 2, cell - 4, cell - 4)
    snake.forEach((p, i) => {
      ctx.fillStyle = i === 0 ? colors.fg : colors.snake
      ctx.fillRect(p.x * cell + 1, p.y * cell + 1, cell - 2, cell - 2)
    })
  }, [colors, size])

  useEffect(draw, [draw])

  const turn = useCallback((d: Point) => {
    const g = game.current
    const last = g.queued[g.queued.length - 1] ?? g.dir
    if (last.x === -d.x && last.y === -d.y) return
    if (last.x === d.x && last.y === d.y) return
    if (g.queued.length < 3) g.queued.push(d)
  }, [])

  const restart = useCallback(() => {
    game.current = initialState()
    setScore(0)
    setStatus("playing")
  }, [])

  const quit = useCallback(() => onExit(game.current.score, Math.max(best, game.current.score)), [onExit, best])

  // Game loop: speeds up as the score climbs.
  useEffect(() => {
    if (status !== "playing") return
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const g = game.current
      g.dir = g.queued.shift() ?? g.dir
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }
      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
      const hitSelf = g.snake.some((p) => p.x === head.x && p.y === head.y)
      if (hitWall || hitSelf) {
        setStatus("over")
        if (g.score > readBest()) {
          writeBest(g.score)
          setBest(g.score)
        }
        return
      }
      g.snake.unshift(head)
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 10
        setScore(g.score)
        g.food = randomFood(g.snake)
      } else {
        g.snake.pop()
      }
      draw()
      timer = setTimeout(tick, Math.max(55, 130 - g.score))
    }
    timer = setTimeout(tick, 130)
    return () => clearTimeout(timer)
  }, [status, draw])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const dirs: Record<string, Point> = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      }
      if (dirs[k]) {
        e.preventDefault()
        if (status === "playing") turn(dirs[k])
      } else if (k === "escape" || k === "q") {
        quit()
      } else if (k === " " || k === "p") {
        e.preventDefault()
        if (status !== "over") setStatus((s) => (s === "playing" ? "paused" : "playing"))
      } else if ((k === "enter" || k === "r") && status === "over") {
        restart()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [status, turn, quit, restart])

  // Swipe controls for touch screens.
  const touchStart = useRef<Point | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current
    if (!start) return
    const dx = e.changedTouches[0].clientX - start.x
    const dy = e.changedTouches[0].clientY - start.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return
    turn(Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) })
  }

  const btn =
    "px-3 py-2 border border-[var(--t-border)] rounded text-[var(--t-fg)] active:bg-[var(--t-border)] select-none"

  return (
    <div ref={boxRef} className="h-full w-full flex flex-col items-center justify-center gap-3 select-none">
      <div className="flex gap-6 text-[var(--t-accent)]">
        <span>SCORE: {score}</span>
        <span className="text-[var(--t-muted)]">BEST: {Math.max(best, score)}</span>
      </div>
      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ touchAction: "none" }}>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="border border-[var(--t-border)]"
          style={{ width: size, height: size }}
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-center gap-2 px-4">
            {status === "over" ? (
              <>
                <div className="text-[var(--t-error)] text-lg">GAME OVER</div>
                <div>Score: {score}</div>
                <div className="text-[var(--t-muted)] text-xs">Enter / R to restart · Esc / Q to quit</div>
                <div className="flex gap-2 mt-2 sm:hidden">
                  <button className={btn} onClick={restart}>
                    Restart
                  </button>
                  <button className={btn} onClick={quit}>
                    Quit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-[var(--t-warning)] text-lg">PAUSED</div>
                <div className="text-[var(--t-muted)] text-xs">Space / P to resume</div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="hidden sm:block text-xs text-[var(--t-muted)]">
        Arrows / WASD to move · Space to pause · Esc to quit
      </div>
      <div className="grid grid-cols-3 gap-1 sm:hidden">
        <span />
        <button className={btn} onClick={() => turn({ x: 0, y: -1 })} aria-label="Up">
          ▲
        </button>
        <span />
        <button className={btn} onClick={() => turn({ x: -1, y: 0 })} aria-label="Left">
          ◀
        </button>
        <button className={btn} onClick={quit} aria-label="Quit">
          ✕
        </button>
        <button className={btn} onClick={() => turn({ x: 1, y: 0 })} aria-label="Right">
          ▶
        </button>
        <span />
        <button className={btn} onClick={() => turn({ x: 0, y: 1 })} aria-label="Down">
          ▼
        </button>
        <span />
      </div>
    </div>
  )
}
