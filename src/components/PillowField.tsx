import { useEffect, useRef, useState } from "react"

function PillowSVG({ color = "#7c3aed", rotate = 0, scale = 1 }: {
  color?: string; rotate?: number; scale?: number
}) {
  const w = 110 * scale
  const h = 72 * scale
  return (
    <svg width={w} height={h} viewBox="0 0 110 72" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>

      {/* Sombra */}
      <ellipse cx="55" cy="69" rx="44" ry="4" fill="#000" fillOpacity="0.35" />

      {/* Cuerpo sólido */}
      <path
        d="M14 8 Q6 8 5 18 Q2 36 5 54 Q6 64 14 64 L96 64 Q104 64 105 54 Q108 36 105 18 Q104 8 96 8 Z"
        fill={color}
      />

      {/* Cara más clara arriba para dar volumen */}
      <path
        d="M14 8 Q55 4 96 8 Q104 8 105 18 Q55 13 5 18 Q6 8 14 8 Z"
        fill="white" fillOpacity="0.18"
      />

      {/* Lado izquierdo más oscuro */}
      <path
        d="M5 18 Q2 36 5 54 Q6 64 14 64 L14 8 Q6 8 5 18 Z"
        fill="#000" fillOpacity="0.12"
      />

      {/* Ribete costura interior */}
      <path
        d="M20 14 Q13 14 12 22 Q10 36 12 50 Q13 58 20 58 L90 58 Q97 58 98 50 Q100 36 98 22 Q97 14 90 14 Z"
        fill="none"
        stroke="white" strokeOpacity="0.20"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />

      {/* Abultamiento central */}
      <ellipse cx="55" cy="36" rx="26" ry="14"
        fill="white" fillOpacity="0.07" />

      {/* Arrugas */}
      <path d="M33 30 Q55 27 77 30" stroke="white" strokeOpacity="0.15" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M31 36 Q55 33 79 36" stroke="white" strokeOpacity="0.10" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M33 42 Q55 39 77 42" stroke="white" strokeOpacity="0.15" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </svg>
  )
}

const PILLOWS = [
  { x:  0, rotate: -8,  scale: 0.78, color: "#5b21b6", delay:  80, row: 1 },
  { x:  9, rotate:  5,  scale: 0.72, color: "#7c3aed", delay: 200, row: 1 },
  { x: 18, rotate: -3,  scale: 0.80, color: "#be185d", delay:  40, row: 1 },
  { x: 27, rotate:  9,  scale: 0.74, color: "#9333ea", delay: 160, row: 1 },
  { x: 36, rotate: -6,  scale: 0.77, color: "#db2777", delay: 100, row: 1 },
  { x: 45, rotate:  4,  scale: 0.73, color: "#6d28d9", delay: 240, row: 1 },
  { x: 54, rotate: -10, scale: 0.79, color: "#7c3aed", delay:  60, row: 1 },
  { x: 63, rotate:  7,  scale: 0.75, color: "#be185d", delay: 180, row: 1 },
  { x: 72, rotate: -4,  scale: 0.78, color: "#9333ea", delay: 120, row: 1 },
  { x: 81, rotate:  6,  scale: 0.72, color: "#db2777", delay: 220, row: 1 },
  { x: 90, rotate: -7,  scale: 0.76, color: "#6d28d9", delay:  30, row: 1 },
  { x: -2, rotate:  5,  scale: 1.0,  color: "#7c3aed", delay:   0, row: 0 },
  { x:  8, rotate: -12, scale: 0.92, color: "#db2777", delay: 140, row: 0 },
  { x: 18, rotate:  8,  scale: 1.05, color: "#5b21b6", delay:  70, row: 0 },
  { x: 28, rotate: -5,  scale: 0.95, color: "#9333ea", delay: 190, row: 0 },
  { x: 38, rotate: 14,  scale: 1.0,  color: "#be185d", delay:  50, row: 0 },
  { x: 48, rotate: -9,  scale: 0.90, color: "#7c3aed", delay: 210, row: 0 },
  { x: 58, rotate:  6,  scale: 1.02, color: "#db2777", delay:  90, row: 0 },
  { x: 68, rotate: -14, scale: 0.93, color: "#6d28d9", delay: 170, row: 0 },
  { x: 78, rotate:  10, scale: 1.0,  color: "#9333ea", delay: 130, row: 0 },
  { x: 88, rotate:  -6, scale: 0.95, color: "#be185d", delay: 250, row: 0 },
  { x: 97, rotate:  11, scale: 0.88, color: "#7c3aed", delay:  20, row: 0 },
]

export default function PillowField() {
  const ref = useRef<HTMLDivElement>(null)
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setRatio(e.intersectionRatio),
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const op = Math.min(1, ratio * 2.8)
  const ty = (1 - Math.min(1, ratio * 2.2)) * 55

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 140 }} aria-hidden>
      {PILLOWS.filter(p => p.row === 1).map((p, i) => (
        <div key={`b${i}`} className="absolute" style={{
          left: `${p.x}%`, bottom: 12, zIndex: 1,
          opacity: op,
          transform: `translateY(${ty}px)`,
          transition: `opacity 0.7s ease ${p.delay}ms, transform 0.8s ease ${p.delay}ms`,
        }}>
          <PillowSVG color={p.color} rotate={p.rotate} scale={p.scale} />
        </div>
      ))}
      {PILLOWS.filter(p => p.row === 0).map((p, i) => (
        <div key={`f${i}`} className="absolute" style={{
          left: `${p.x}%`, bottom: 0, zIndex: 2,
          opacity: op,
          transform: `translateY(${ty}px)`,
          transition: `opacity 0.7s ease ${p.delay}ms, transform 0.8s ease ${p.delay}ms`,
        }}>
          <PillowSVG color={p.color} rotate={p.rotate} scale={p.scale} />
        </div>
      ))}
    </div>
  )
}
