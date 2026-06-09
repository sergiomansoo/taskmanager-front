import {useState,useEffect} from 'react'
import api from '../api/api'
function TaskListPage() {
    const [tarefas,setTarefas]=useState([])
    const [loading,setLoading]=useState(true)
    const[erro,setErro]=useState('')
    useEffect(()=>
    async function buscarTarefas(){
        try{
            const token=localStorage.getItem('token')
            const response = await api.get('/tarefa',{headers:{Authorization:`Bearer ${token}`},})
            setTarefas(response.data)
        }
        catch(error){
            setErro('Nao foi possivel carregar as tarefas.')
        }
        finally{
            setLoading(false)
            
        }
        buscarTarefas()

    },[])
    if (loading){
        return <p>Carregando Tarefas...</p>
    }
    if(erro){
        return<p>Algo inesperado ocorreu...</p>
    }

  return (
        <main>
      <h1>Tarefas</h1>

      {tarefas.length === 0 && <p>Nenhuma tarefa encontrada.</p>}

      {tarefas.map((tarefa) => (
        <article className='card-tarefa' key={tarefa.id}>
          <h2>{tarefa.titulo}</h2>
          <p>{tarefa.descricao}</p>
          <p>Status: {tarefa.status}</p>
          <p>Prioridade: {tarefa.prioridade}</p>
          <p>Entrega: {tarefa.dataEntrega}</p>
          <p>Usuario id: {tarefa.usuarioId};
          </p>
        </article>
      ))}
    </main>
  )
}

export default TaskListPage
