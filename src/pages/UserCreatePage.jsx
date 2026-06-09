import{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

function UserCreatePage() {
    const [nome,setNome]=useState('')
    const [email,setEmail]=useState('')
    const [senha,setSenha]=useState('')
    const [role,setRole]=useState('')
    const[loading,setLoading]=useState(false)
    const[erro,setErro]=useState('')
    const navigate=useNavigate
    async function handleSubmit(event){
        event.preventDefault()
        try{
            const token=localStorage.getItem('token')
            const res= await api.post('/usuario',{nome,email,senha,role},
                {headers:{Authorization:`Bearer ${token}`},},)

            navigate('/usuarios')
        }
        catch{
            setErro("Nao foi possivel criar usuário.")

        }
        finally{
            setLoading(false)
        }
    }
    if(erro){
        return <h1>{erro}</h1>
    }
    if(loading){
        return <h1>Carregando...</h1>
    }
  return (
    <main>
        <form onSubmit={handleSubmit}>
            <h1>Criar usuário</h1>
            <input value={nome} type='text' placeholder = 'Nome'
            onChange={(event)=>setNome(event.target.value)}></input>
            <input value={email} type='email' placeholder = 'Email'
            onChange={(event)=>setEmail(event.target.value)}></input>
            <input value={senha} type='password' placeholder = 'Senha'
            onChange={(event)=>setSenha(event.target.value)}></input>
            <input value={role} type='text' placeholder = 'Role (USER | ADMIN)'
            onChange={(event)=>setRole(event.target.value)}></input>
            <button type='submit'>Criar</button>
      </form>
      
    </main>
  )
}

export default UserCreatePage