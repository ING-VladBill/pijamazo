import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>CineSpoilerS</h1>
      <p style={{ color: '#a1a1aa' }}>Tu cine, sin spoilers... o con todos.</p>
      <Link to="/movies">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#a78bfa', border: 'none', color: '#09090b', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold' }}>
          Explorar películas
        </button>
      </Link>
    </div>
  )
}

export default HomePage