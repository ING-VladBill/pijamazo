import { Link, NavLink, Outlet } from "react-router-dom"
import { ShoppingBag, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Catálogo" },
  { to: "/cart", label: "Carrito" },
]

export default function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-[#0D0D0F] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0D0D0F]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="group flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <Moon size={20} className="text-purple-400 transition-transform group-hover:rotate-12" />
            <span className="font-mono text-lg font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pijamazo
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-purple-300" : "text-slate-400 hover:text-slate-100"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-400" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/cart" className="relative rounded-lg p-2 text-slate-400 transition-colors hover:text-slate-100" aria-label="Ver carrito">
            <ShoppingBag size={20} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-mono text-[10px] font-bold text-white">
              0
            </span>
          </Link>

          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-slate-100 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-white/5 bg-[#0D0D0F] px-6 pb-4 md:hidden">
            <ul className="flex flex-col gap-1 pt-3">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-purple-500/10 text-purple-300"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-[#0A0A0C]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <div className="flex items-center gap-2">
                <Moon size={16} className="text-purple-400" />
                <span className="font-mono font-bold text-slate-100">Pijamazo</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">No salgas. es tu era.</p>
            </div>
            <div className="flex gap-6 text-xs text-slate-500">
              <Link to="/products" className="transition-colors hover:text-slate-300">Catálogo</Link>
              <span className="cursor-default transition-colors hover:text-slate-300">Envíos</span>
              <span className="cursor-default transition-colors hover:text-slate-300">Contacto</span>
            </div>
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} Pijamazo · Lima, Perú</p>
          </div>
        </div>
      </footer>
    </div>
  )
}