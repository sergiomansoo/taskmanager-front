import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useEffect,useState } from 'react'
import api from '../api/api'



function Navbar({ onLogout , usuario }) {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    async function usuarioAtual() {
      try{
        const token=localStorage.getItem('token')
      const res=await api.get('/usuario/me',{headers:{Authorization:`Bearer ${token}`}})
      setUser(res.data)    }
    catch(error){
      
      console.log("erro")
    }
    
      
      
    }
    usuarioAtual()
    
  },[])
  
  return (
    <nav>
      <NavLink to="/tarefas">Tarefas</NavLink>
      <NavLink to="/criar-tarefa">Criar Tarefa</NavLink>
      {user?.role==='ADMIN' && <NavLink to="/criar-tarefa-id-usuario">Criar Tarefa | ID USER</NavLink>}
      {user?.role==='ADMIN' && <NavLink to="/usuarios">Usuários</NavLink>}
      {user?.role==='ADMIN' && <NavLink  to="/criar-usuario">Criar Usuário</NavLink>}

      <NavLink className={'profile'} to="/usuarios/me">Meu perfil</NavLink>

      <button type="button" onClick={onLogout}>
        Sair
      </button>
    </nav>
  )
}

export default Navbar
