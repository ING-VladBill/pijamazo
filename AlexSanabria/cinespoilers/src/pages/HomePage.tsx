import { Link } from 'react-router-dom'
import { useMovies } from '../hooks/useMovies'
import { IMG_BASE } from '../api/tmdb'

const HomePage = () => {
  const { data: movies } = useMovies()

  return (
    <div style={{ background: '#141414', color: '#fff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), #141414), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600) center/cover no-repeat',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 4rem',
      }}>
        <p style={{ color: '#e50914', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          🎬 Ahora en cartelera
        </p>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: '0 0 1rem', maxWidth: '600px', lineHeight: 1.1 }}>
          Pijamazo,<br /><span style={{ color: '#e50914' }}>modo cueva.</span>
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2rem', lineHeight: 1.6 }}>
          Descubre las mejores películas, compra tus entradas y vive la experiencia del cine desde casa.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <button style={{ background: '#e50914', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              ▶ Ver Catálogo
            </button>
          </Link>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              ℹ Más info
            </button>
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '2rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>🔥 Tendencias</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {movies?.slice(0, 6).map((movie: any) => (
            <Link key={movie.id} to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
              <div
                style={{ background: '#1f1f1f', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '0.8rem' }}>
                  <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 0.3rem', fontSize: '0.9rem' }}>{movie.title}</p>
                  <p style={{ color: '#aaa', margin: '0 0 0.3rem', fontSize: '0.8rem' }}>{movie.release_date?.slice(0, 4)}</p>
                  <p style={{ color: '#e50914', margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>⭐ {movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage