import { useEffect,useState } from "react"
import api from '../api/api'
import UserCard from "../components/UserCard"
function UserListPage() {
  const[usuarios,setUsuarios]=useState([])
  const[erro,setErro]=useState("")
  const[loading,setLoading]=useState(true)
  async function handleDelete(id){
    try{
      const token=localStorage.getItem('token')
      await api.delete(`/usuario/${id}`,{headers:{Authorization:`Bearer ${token}`}})
      setUsuarios((usuarios)=>usuarios.filter((usuario)=>usuario.id!==id))
    }
    catch(error){
      setErro("Nao foi possível deletar usuário")

    }

  }
  useEffect(()=>{
      async function buscarUsuarios(){
        try{
          const token=localStorage.getItem('token')
          const res=await api.get('/usuario',{headers: {Authorization:`Bearer ${token}`}},)
          setUsuarios(res.data)
        } 
        catch(error){
          setErro("Nao foi possivel buscar Usuários")
        }
        finally{
          setLoading(false)
        }
    }
    buscarUsuarios()
  },[])
    if(loading){
      return <main><h1>Usuários</h1>
      <article>Carregando...</article></main>
    }
    if(erro){
      return <div>{erro}</div>
    }
    if(!loading &&usuarios.length===0){
      return <div>Não há usuários</div>
    }
    
  return (
    <main>
      <h1>Usuários</h1>
      {usuarios.map((usuario)=>(
        
        <UserCard 
        key={usuario.id}
        usuario={usuario}
        onDelete={handleDelete}
       />
      ))} 
    </main>
  )
}

export default UserListPage
