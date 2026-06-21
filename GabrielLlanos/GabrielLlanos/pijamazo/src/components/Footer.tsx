import { Moon } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-display text-base text-foreground">
          <Moon className="size-4 text-primary" />
          Pijamazo
        </div>
        <p>Todo para el modo cueva. Hecho con cariño para no salir de la cama.</p>
        <p>&copy; {new Date().getFullYear()} Pijamazo</p>
      </div>
    </footer>
  )
}