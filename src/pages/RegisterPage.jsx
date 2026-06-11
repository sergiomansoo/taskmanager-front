import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

function RegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function handleRegister(event) {
    event.preventDefault()

    try {
      await api.post('/auth/register', {
        nome,
        email,
        senha,
      })

      setErro('')
      navigate('/')
    } catch {
      setErro('Nao foi possivel se registrar, verifique seus dados.')
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h1>Cadastro</h1>
      <p className="form-notice">A primeira requisição pode demorar um pouco.</p>

      <input
        value={nome}
        type="text" 
        placeholder="Nome"
        onChange={(event) => setNome(event.target.value)}
      />

      <input
        value={email}
        type="email"
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        value={senha}
        type="password"
        placeholder="Senha"
        onChange={(event) => setSenha(event.target.value)}
      />

      {erro && <p>{erro}</p>}

      <button type="submit">Registrar</button>
      <Link to="/">Voltar para página inicial</Link>
    </form>
  )
}

export default RegisterPage
