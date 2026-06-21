import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

function App() {
  return (
    <main className="min-h-svh flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6 max-w-sm">
        <Badge>
          <Moon className="size-3" />
          Modo cueva activado
        </Badge>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pijamazo</CardTitle>
            <CardDescription>Todo para el modo cueva.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Tema oscuro, paleta cálida y tipografía lista.
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button>Explorar catálogo</Button>
            <Button variant="outline">Ver más</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default App