const CartPage = () => {
  return (
    <div style={{ background: '#141414', color: '#fff', minHeight: '100vh', padding: '2rem 4rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>🛒 Carrito</h1>
      <p style={{ color: '#aaa', marginBottom: '2rem' }}>Tu selección de entradas</p>

      <div style={{
        background: '#1f1f1f',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '3rem',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</p>
        <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '2rem' }}>Tu carrito está vacío</p>
        <a href="/movies" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#e50914', color: '#fff', border: 'none',
            padding: '0.8rem 2rem', borderRadius: '4px',
            fontWeight: 700, fontSize: '1rem', cursor: 'pointer'
          }}>
            Ver Catálogo
          </button>
        </a>
      </div>
    </div>
  )
}

export default CartPage