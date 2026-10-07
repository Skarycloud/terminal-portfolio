"use client"

import { useEffect, useRef } from "react"

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789SUMANTH<>/{}=+*"

export default function MatrixRain({ color, onExit }: { color: string; onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const fontSize = window.innerWidth < 640 ? 12 : 16
    let drops: number[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.ceil(canvas.width / fontSize)
      drops = Array.from({ length: columns }, (_, i) => drops[i] ?? Math.floor((Math.random() * -canvas.height) / fontSize))
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`
      drops.forEach((y, i) => {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        // Leading glyph is brighter than the trail.
        ctx.fillStyle = Math.random() > 0.95 ? "#FFFFFF" : color
        ctx.fillText(ch, i * fontSize, y * fontSize)
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }
    const interval = setInterval(draw, 40)

    // Ignore input briefly so the Enter that launched us doesn't close it.
    const armedAt = Date.now() + 400
    const exit = () => {
      if (Date.now() > armedAt) onExit()
    }
    window.addEventListener("keydown", exit)
    window.addEventListener("pointerdown", exit)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", exit)
      window.removeEventListener("pointerdown", exit)
    }
  }, [color, onExit])

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <canvas ref={canvasRef} className="block" />
      <div className="absolute bottom-4 inset-x-0 text-center text-xs text-white/60 font-mono pointer-events-none">
        Wake up, Neo... press any key to exit
      </div>
    </div>
  )
}
