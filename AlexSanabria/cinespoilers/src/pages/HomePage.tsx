import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#141414', color: '#fff' }}>
      <div style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), #141414), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600) center/cover no-repeat',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 4rem',
      }}>
        <p style={{ color: '#e50914', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          🎬 Ahora en cartelera
        </p>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: '0 0 1rem', maxWidth: '600px', lineHeight: 1.1 }}>
          Pijamazo<br /><span style={{ color: '#e50914' }}>sin límites.</span>
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2rem', lineHeight: 1.6 }}>
          Descubre las mejores películas, compra tus entradas y vive la experiencia del cine desde casa.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#e50914', color: '#fff', border: 'none',
              padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700,
              fontSize: '1rem', cursor: 'pointer',
            }}>
              ▶ Ver Catálogo
            </button>
          </Link>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700,
              fontSize: '1rem', cursor: 'pointer', backdropFilter: 'blur(4px)',
            }}>
              ℹ Más info
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage