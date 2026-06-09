import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
function TaskCreatePage() {
  const [loading,setLoading]=useState(false)
  const [erro,setErro]=useState(null)
  const [tarefa,setTarefa]=useState([])
  const [titulo,setTitulo]=useState('')
  const [descricao,setDescricao]=useState('')
  const[status,setStatus]=useState('')
  const[prioridade,setPrioridade]=useState('')
  const[dataEntrega,setDataEntrega]=useState('')

  const navigate=useNavigate()
 

    async function handleSubmit(event) {
        event.preventDefault()
        try{
          const token=localStorage.getItem('token')
          const res= await api.post('/tarefa',{
            titulo,
            descricao,
            status,
            prioridade,
            dataEntrega
          },{headers:{Authorization:`Bearer ${token}`}},)
          navigate('/tarefas')
        }
        catch(error){
            setErro("Nao foi possível criar Tarefa.")
        }
        finally{
          setLoading(true)
        }
        
    } 

    if(loading){
      return <h3>Carregando...</h3>
    }
    if(erro){
      return <h3>{erro}</h3>
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Criar tarefa</h1>
        <input value={titulo} type='text' placeholder='Título' 
        onChange={(event)=>setTitulo(event.target.value)}></input>
        <input value={descricao} type='text' placeholder='Descrição' 
        onChange={(event)=>setDescricao(event.target.value)}></input>
        <input value={status} type='text' placeholder='Status' 
        onChange={(event)=>setStatus(event.target.value)}></input>
        <input value={prioridade} type='text' placeholder='Prioridade' 
        onChange={(event)=>setPrioridade(event.target.value)}></input>
        <input value={dataEntrega} type='date' placeholder='Data de Entrega'
         onChange={(event)=>setDataEntrega(event.target.value)}></input>
         <button type='submit'>Criar</button>
        </form>
        </>
  )
}

export default TaskCreatePage