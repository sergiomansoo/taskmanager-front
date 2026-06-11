import { useNavigate } from 'react-router-dom'


function HomePage() {
  const navigate = useNavigate()

  return (
    <main
      className="home-page"
    >
      <section className="home-content">
        <p className="home-label">Organização simples para o seu dia</p>
        <h1>TaskManager</h1>

        <div className="home-actions">
          <button type="button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => navigate('/registrar')}
          >
            Registrar-se
          </button>
        </div>
      </section>
    </main>
  )
}

export default HomePage
