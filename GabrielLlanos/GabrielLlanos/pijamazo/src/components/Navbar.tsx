import { Menu, Moon, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { cn } from "@/lib/utils"

const links = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Catálogo" },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2 font-display text-xl font-semibold">
          <Moon className="size-5 text-primary transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:-rotate-12" />
          Pijamazo
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-1 transition-colors duration-150 ease-[var(--ease-snappy)] hover:text-primary",
                  "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 after:ease-[var(--ease-snappy)]",
                  isActive ? "text-primary after:scale-x-100" : "text-muted-foreground hover:after:scale-x-100"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label={`Carrito, ${itemCount} productos`}>
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <Badge
                  key={itemCount}
                  className="absolute -right-1 -top-1 h-5 min-w-5 animate-[badge-in_200ms_var(--ease-snappy)] justify-center rounded-full px-1 text-[10px]"
                >
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex origin-top animate-[menu-in_200ms_var(--ease-snappy)] flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2 py-2 text-sm font-medium transition-colors duration-150 ease-[var(--ease-snappy)]",
                  isActive ? "bg-accent text-primary" : "text-muted-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}