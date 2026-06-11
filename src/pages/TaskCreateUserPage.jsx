import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
function TaskCreateUserPage() {
  const [loading,setLoading]=useState(false)
  const [erro,setErro]=useState(null)
  const [titulo,setTitulo]=useState('')
  const [descricao,setDescricao]=useState('')
  const[status,setStatus]=useState('')
  const[prioridade,setPrioridade]=useState('')
  const[dataEntrega,setDataEntrega]=useState('')
  const[idUser,setIdUser]=useState('')


  const navigate=useNavigate()
 

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        try{
          const token=localStorage.getItem('token')
            await api.post(`/tarefa/${idUser}`,{
            titulo,
            descricao,
            status,
            prioridade,
            dataEntrega
          },{headers:{Authorization:`Bearer ${token}`}},)
          navigate('/tarefas')
        }
        catch(error){
            console.log(error.response) 
            setErro('erro')
        }
        finally{
          setLoading(false)
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
        <input value={idUser} type='text' placeholder='ID USER' 
        onChange={(event)=>setIdUser(event.target.value)}></input>
        <input value={titulo} type='text' placeholder='Título' 
        onChange={(event)=>setTitulo(event.target.value)}></input>
        <input value={descricao} type='text' placeholder='Descrição' 
        onChange={(event)=>setDescricao(event.target.value)}></input>
        <select value={status}
        onChange={(event)=>setStatus(event.target.value)}>
            <option value={''}>Selecione o Status</option>
            <option value='PENDENTE'>PENDENTE</option>
            <option value='EM_ANDAMENTO'>EM ANDAMENTO</option>
            <option value='CONCLUIDA'>CONCLUIDA</option>
        </select>
        <select value={prioridade}
        onChange={(event)=>setPrioridade(event.target.value)}>
          <option value={''}>Selecione a Prioridade</option>
          <option value='BAIXA'>BAIXA</option>
          <option value='MEDIA'>MÉDIA</option>
          <option value='ALTA'>ALTA</option>
        </select>
        <input value={dataEntrega} type='date' placeholder='Data de Entrega'
         onChange={(event)=>setDataEntrega(event.target.value)}></input>
         <button type='submit'>Criar</button>
        </form>
        </>
  )
}

export default TaskCreateUserPage