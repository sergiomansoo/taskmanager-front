import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import api from '../api/api'

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
      })

      localStorage.setItem('token', response.data.token)
      onLoginSuccess()
      navigate('/tarefas')
      
    }   
    catch (error) {
    console.log(error)
    console.log(error.response?.status)
    console.log(error.response?.data)
    setErro('Nao foi possivel fazer login.')  
}
finally{
      setLoading(false)
    }
if(loading){
  return<article>Carregando... A primeira Requisição pode demorar um pouco</article>
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
      <Link to="/">Voltar para página inicial</Link>
      
    </form>
    
  )
}

export default LoginPage
