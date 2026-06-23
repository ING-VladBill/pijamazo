import { useParams, Link } from 'react-router-dom'
import { useMovie } from '../hooks/useMovies'
import { IMG_BASE } from '../api/tmdb'

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError } = useMovie(id!)

  if (isLoading) return (
    <div style={{ background: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem' }}>
      Cargando...
    </div>
  )

  if (isError) return (
    <div style={{ background: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e50914', fontSize: '1.5rem' }}>
      Error al cargar la película
    </div>
  )

  return (
    <div style={{ background: '#141414', color: '#fff', minHeight: '100vh' }}>
      {/* Backdrop */}
      <div style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.5), #141414), url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) center/cover no-repeat`,
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '2rem 4rem',
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0 }}>{movie.title}</h1>
      </div>

      {/* Detalle */}
      <div style={{ padding: '2rem 4rem', display: 'flex', gap: '3rem' }}>
        <img
          src={`${IMG_BASE}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '250px', borderRadius: '8px', flexShrink: 0 }}
        />
        <div>
          <p style={{ color: '#e50914', fontWeight: 700, marginBottom: '1rem' }}>
            ⭐ {movie.vote_average?.toFixed(1)} · {movie.release_date?.slice(0, 4)} · {movie.runtime} min
          </p>
          <p style={{ color: '#aaa', lineHeight: 1.8, maxWidth: '600px', marginBottom: '2rem' }}>{movie.overview}</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {movie.genres?.map((g: any) => (
              <span key={g.id} style={{ background: '#e50914', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                {g.name}
              </span>
            ))}
          </div>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <button style={{ background: '#e50914', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
              ← Volver al catálogo
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage