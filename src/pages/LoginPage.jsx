import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const[loading,setLoading]=useState('')
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
      })

      localStorage.setItem('token', response.data.token)
      setErro('')
      onLoginSuccess()
      navigate('/tarefas')
    }    catch (error) {
    console.log(error)
    console.log(error.response?.status)
    console.log(error.response?.data)
    setErro('Nao foi possivel fazer login.')
}
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(event) => setSenha(event.target.value)}
      />

      {erro && <p>{erro}</p>}

      <button type="submit">Entrar</button>
    </form>
  )
}

export default LoginPage
