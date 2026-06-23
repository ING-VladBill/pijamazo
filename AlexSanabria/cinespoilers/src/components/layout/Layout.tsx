import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout