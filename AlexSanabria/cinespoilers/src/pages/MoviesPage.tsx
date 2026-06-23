import { Link } from 'react-router-dom'
import { useMovies } from '../hooks/useMovies'
import { IMG_BASE } from '../api/tmdb'

const MoviesPage = () => {
  const { data: movies, isLoading, isError } = useMovies()

  if (isLoading) return (
    <div style={{ background: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem' }}>
      Cargando películas...
    </div>
  )

  if (isError) return (
    <div style={{ background: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e50914', fontSize: '1.5rem' }}>
      Error al cargar películas
    </div>
  )

  return (
    <div style={{ background: '#141414', color: '#fff', minHeight: '100vh', padding: '2rem 4rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>🎬 Catálogo</h1>
      <p style={{ color: '#aaa', marginBottom: '2rem' }}>Películas populares</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.2rem' }}>
        {movies?.map((movie: any) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
            <div
              style={{ background: '#1f1f1f', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
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
  )
}

export default MoviesPage