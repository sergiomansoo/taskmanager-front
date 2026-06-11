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
    const[erroSenha,setErroSenha]=useState('')
    const navigate=useNavigate()
    function senhaValida(){
         const tamMininmo=senha.length>=6
        return tamMininmo
        }
    async function handleSubmit(event){
        event.preventDefault()
        setLoading(true)
        if(!senhaValida()){
            setErroSenha('Senha deve ter pelo menos 6 caracteres')
            setLoading(false)
            return
        }
        setErroSenha('')
        
        try{
            const token=localStorage.getItem('token')
            const res= await api.post('/usuario',{nome,email,senha,role},
                {headers:{Authorization:`Bearer ${token}`},})

            navigate('/usuarios')
        }
        catch(error){
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
            {erroSenha&&<p style={{color:'red',fontSize:'15px',margin:'0px',padding:'0px'}}>{erroSenha}</p>}
            <select value={role}
            onChange={(event)=>setRole(event.target.value)}>
                <option value={''}>Selecione a Role</option>
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
            </select>
            <button type='submit'>Criar</button>
      </form>
      
    </main>
  )
}

export default UserCreatePage