import { Outlet, useLocation } from "react-router-dom"

import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <div key={location.pathname} className="flex-1 animate-page-in">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}