import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  r: number
  baseOpacity: number
  phase: number
  speed: number
  bright: boolean
  spikeLen: number
  color: string
}

interface Comet {
  x: number; y: number; vx: number; vy: number
  len: number; life: number; maxLife: number
}

const COLORS = ["255,255,255","220,200,255","255,210,240","200,200,255","255,255,210"]

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    const stars: Star[] = []

    // 130 small background stars
    for (let i = 0; i < 130; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 0.8 + 0.2,
        baseOpacity: Math.random() * 0.35 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.003,
        bright: false, spikeLen: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    // 10 LARGE spike stars — very prominent
    for (let i = 0; i < 10; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 2.5,
        baseOpacity: 0.5 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003,
        bright: true,
        spikeLen: 22 + Math.random() * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const drawSpike = (x: number, y: number, r: number, spike: number, op: number, col: string) => {
      // Big soft glow behind everything
      const glow = ctx.createRadialGradient(x, y, 0, x, y, spike * 1.8)
      glow.addColorStop(0, `rgba(${col},${op * 0.6})`)
      glow.addColorStop(0.3, `rgba(${col},${op * 0.2})`)
      glow.addColorStop(1, `rgba(${col},0)`)
      ctx.beginPath()
      ctx.arc(x, y, spike * 1.8, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // 4 long main spikes
      const dirs = [[0,-1],[0,1],[-1,0],[1,0]]
      dirs.forEach(([dx, dy]) => {
        const g = ctx.createLinearGradient(x, y, x + dx * spike, y + dy * spike)
        g.addColorStop(0, `rgba(${col},${op})`)
        g.addColorStop(0.4, `rgba(${col},${op * 0.6})`)
        g.addColorStop(1, `rgba(${col},0)`)
        ctx.beginPath()
        ctx.moveTo(x - dy * r * 0.3, y - dx * r * 0.3)
        ctx.lineTo(x + dx * spike, y + dy * spike)
        ctx.lineTo(x + dy * r * 0.3, y + dx * r * 0.3)
        ctx.closePath()
        ctx.fillStyle = g
        ctx.fill()
      })

      // 4 shorter diagonal spikes
      const diag = spike * 0.5
      const diagDirs = [[-1,-1],[1,-1],[-1,1],[1,1]]
      diagDirs.forEach(([dx, dy]) => {
        const nx = dx / Math.SQRT2, ny = dy / Math.SQRT2
        const g = ctx.createLinearGradient(x, y, x + nx * diag, y + ny * diag)
        g.addColorStop(0, `rgba(${col},${op * 0.7})`)
        g.addColorStop(1, `rgba(${col},0)`)
        ctx.beginPath()
        ctx.moveTo(x - ny * r * 0.2, y - nx * r * 0.2)
        ctx.lineTo(x + nx * diag, y + ny * diag)
        ctx.lineTo(x + ny * r * 0.2, y + nx * r * 0.2)
        ctx.closePath()
        ctx.fillStyle = g
        ctx.fill()
      })

      // Bright core dot
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${op})`
      ctx.fill()
    }

    const comets: Comet[] = []
    let timer = 0
    let nextAt = 150 + Math.random() * 120

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(s => {
        s.phase += s.speed
        const pulse = Math.sin(s.phase)

        if (!s.bright) {
          const op = Math.max(0, s.baseOpacity + pulse * s.baseOpacity * 0.6)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.color},${op})`
          ctx.fill()
        } else {
          // pulse between ~0.1 and full brightness — each star independent
          const op = Math.max(0.08, s.baseOpacity + pulse * 0.42)
          const spikeNow = s.spikeLen * (0.35 + ((pulse + 1) / 2) * 0.65)
          drawSpike(s.x, s.y, s.r, spikeNow, op, s.color)
        }
      })

      // Comets
      timer++
      if (timer >= nextAt) {
        comets.push({
          x: Math.random() * window.innerWidth * 0.6,
          y: Math.random() * window.innerHeight * 0.35,
          vx: 5 + Math.random() * 5, vy: 2.5 + Math.random() * 3,
          len: 70 + Math.random() * 90, life: 0,
          maxLife: 55 + Math.random() * 45,
        })
        timer = 0; nextAt = 150 + Math.random() * 130
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i]
        c.life++; c.x += c.vx; c.y += c.vy
        const p = c.life / c.maxLife
        const op = p < 0.15 ? p / 0.15 : p > 0.65 ? 1 - (p - 0.65) / 0.35 : 1
        const mag = Math.hypot(c.vx, c.vy)
        const tx = c.x - (c.vx / mag) * c.len, ty = c.y - (c.vy / mag) * c.len
        const g = ctx.createLinearGradient(tx, ty, c.x, c.y)
        g.addColorStop(0, `rgba(255,255,255,0)`)
        g.addColorStop(0.5, `rgba(210,190,255,${op * 0.35})`)
        g.addColorStop(1, `rgba(255,255,255,${op * 0.95})`)
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(c.x, c.y)
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.beginPath(); ctx.arc(c.x, c.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${op})`; ctx.fill()
        if (c.life >= c.maxLife || c.x > canvas.width + 150 || c.y > canvas.height + 150)
          comets.splice(i, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
}
