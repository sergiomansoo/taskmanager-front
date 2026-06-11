import { useEffect,useState } from "react"
import api from '../api/api'
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
      return <div>Carregando...</div>
    }
    if(!loading &&usuarios.length===0){
      return <div>Não há usuários</div>
    }
    if(erro){
      return <div>{erro}</div>
    }
  return (
    <main>
      <h1>Usuários</h1>
      {usuarios.map((usuario)=>(
        
        <article key={usuario.id}>
          <div className="card-tarefa-header">
            <h2>{usuario.nome}</h2>
            <button
              className="lixeira"
              type="button"
              onClick={() => handleDelete(usuario.id)}
            >
              x
            </button>
          </div>
          <h2>Nome: {usuario.nome}</h2>
        <p>Id: {usuario.id}</p>
        <p>Email: {usuario.email}</p>
        <p>Role: {usuario.role}</p>
        <p>Data de Criação: {usuario.data_criacao}</p>
        </article>
      ))} 
    </main>
  )
}

export default UserListPage
