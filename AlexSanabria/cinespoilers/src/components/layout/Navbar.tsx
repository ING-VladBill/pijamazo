import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/movies', label: 'Catálogo' },
    { to: '/cart', label: 'Carrito' },
  ]

  return (
    <header style={{
      background: '#141414',
      borderBottom: '1px solid #e50914',
      padding: '0 3rem',
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontWeight: 900, fontSize: '1.6rem', color: '#e50914', letterSpacing: '-1px', fontFamily: 'Georgia, serif' }}>
          Pijamazo
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {links.map(link => (
          <Link key={link.to} to={link.to} style={{
            textDecoration: 'none',
            color: location.pathname === link.to ? '#fff' : '#aaa',
            fontWeight: location.pathname === link.to ? 700 : 400,
            fontSize: '0.95rem',
            borderBottom: location.pathname === link.to ? '2px solid #e50914' : '2px solid transparent',
            paddingBottom: '2px',
            transition: 'all 0.2s',
          }}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Navbar