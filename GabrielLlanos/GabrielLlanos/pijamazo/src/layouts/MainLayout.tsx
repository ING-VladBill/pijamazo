import { Outlet } from "react-router-dom"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <div className="flex-1"><Outlet /></div>
      <Footer />
    </div>
  )
}