import type { LucideIcon } from "lucide-react"

interface PagePlaceholderProps {
  icon: LucideIcon
  title: string
  route: string
}

export function PagePlaceholder({ icon: Icon, title, route }: PagePlaceholderProps) {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-6 text-primary" />
      </div>
      <div>
        <h1 className="font-display text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">ruta: {route}</p>
      </div>
    </main>
  )
}