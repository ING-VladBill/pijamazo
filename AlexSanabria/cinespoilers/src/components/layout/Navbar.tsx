import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: '2rem', padding: '1rem 2rem', borderBottom: '1px solid #27272a', alignItems: 'center', background: '#09090b' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#a78bfa' }}>🎬 CineSpoilerS</span>
      <Link to="/" style={{ color: '#fafafa', textDecoration: 'none' }}>Home</Link>
      <Link to="/movies" style={{ color: '#fafafa', textDecoration: 'none' }}>Catálogo</Link>
      <Link to="/cart" style={{ color: '#fafafa', textDecoration: 'none' }}>Carrito</Link>
    </nav>
  )
}

export default Navbar