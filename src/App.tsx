import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 text-zinc-50">
      <h1 className="text-4xl font-bold">Pijamazo</h1>
      <p className="text-zinc-400">Todo para el modo cueva.</p>
      <Button>Explorar productos</Button>
    </main>
  )
}

export default App