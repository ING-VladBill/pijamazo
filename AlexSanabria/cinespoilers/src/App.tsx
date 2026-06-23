function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Pijamazo</h1>
      <p style={{ color: '#a1a1aa' }}>Tu cine, sin spoilers... o con todos.</p>
      <button style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid #fafafa', color: '#fafafa', cursor: 'pointer' }}>
        Explorar películas
      </button>
    </div>
  )
}

export default App