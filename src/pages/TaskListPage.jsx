import { useEffect, useState } from 'react'
import api from '../api/api'
import TaskCard from '../components/TaskCard'
import TaskFilters from '../components/TaskFilters'

function TaskListPage() {
  const [tarefas, setTarefas] = useState([])
  const [todasTarefas, setTodasTarefas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [id, setId] = useState('')
  const [usuario, setUsuario] = useState(null)

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem('token')

      await api.delete(`/tarefa/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setTodasTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa.id !== id),
      )
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa.id !== id),
      )
    } catch (error) {
      console.log(error.response)
      setErro('Nao foi possivel deletar a tarefa.')
    }
  }

  function handleBuscar() {
    setTarefas(filtrarPorId(todasTarefas))
  }

  function filtrarPorId(lista) {
    if (id === '') return lista
    return lista.filter((tarefa) => tarefa.usuarioId === Number(id))
  }

  function getHojeLocal() {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')

    return `${ano}-${mes}-${dia}`
  }

  function handleToday() {
    const hoje = getHojeLocal()

    setTarefas(
      filtrarPorId(
        todasTarefas.filter((tarefa) => tarefa.dataEntrega === hoje),
      ),
    )
  }

  function handleWeek() {
    const hoje = new Date()
    const diaDaSemana = hoje.getDay()
    const diff = diaDaSemana === 0 ? -6 : 1 - diaDaSemana

    const inicioSemana = new Date(hoje)
    inicioSemana.setDate(hoje.getDate() + diff)

    const fimSemana = new Date(inicioSemana)
    fimSemana.setDate(inicioSemana.getDate() + 6)

    function formatarData(date) {
      const ano = date.getFullYear()
      const mes = String(date.getMonth() + 1).padStart(2, '0')
      const dia = String(date.getDate()).padStart(2, '0')
      return `${ano}-${mes}-${dia}`
    }

    const inicioStr = formatarData(inicioSemana)
    const fimStr = formatarData(fimSemana)

    const porData = todasTarefas.filter(
      (tarefa) =>
        tarefa.dataEntrega >= inicioStr && tarefa.dataEntrega <= fimStr,
    )

    setTarefas(filtrarPorId(porData))
  }

  function handleMonth() {
    const hoje = new Date()
    const mes = hoje.toISOString().slice(0, 7)

    const porData = todasTarefas.filter(
      (tarefa) => tarefa.dataEntrega.slice(0, 7) === mes,
    )

    setTarefas(filtrarPorId(porData))
  }

  function handleAll() {
    setTarefas(filtrarPorId(todasTarefas))
  }

  async function handleConcluir(id) {
    try {
      const token = localStorage.getItem('token')
      const response = await api.patch(
        `/tarefa/${id}/concluir`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )

      const atualizar = (lista) =>
        lista.map((tarefa) => (tarefa.id === id ? response.data : tarefa))

      setTodasTarefas(atualizar)
      setTarefas(atualizar)
    } catch (error) {
      setErro('erro')
    }
  }

  useEffect(() => {
    async function buscarTarefas() {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get('/tarefa', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setTodasTarefas(response.data)
        setTarefas(response.data)
      } catch (error) {
        setErro('Nao foi possivel carregar as tarefas.')
      } finally {
        setLoading(false)
      }
    }

    async function buscarUsuarioLogado() {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get('/usuario/me', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUsuario(response.data)
      } catch (error) {
        setErro('Erro')
      }
    }

    buscarTarefas()
    buscarUsuarioLogado()
  }, [])

  if (loading) {
    return (
      <article>
        <p>Carregando Tarefas...</p>
        <p>A primeira requisicao pode demorar um pouco...</p>
      </article>
    )
  }

  if (erro) {
    return <p>{erro}</p>
  }

  return (
    <main>
      <div className="task-list-header">
        <h1>Tarefas</h1>
        {usuario?.role === 'ADMIN' && (
          <div className="buscar-usuario">
            <input
              value={id}
              onChange={(event) => setId(event.target.value)}
              type="text"
              placeholder="Buscar tarefas por USER ID"
            />
            <button onClick={handleBuscar}>Buscar</button>
          </div>
        )}
      </div>

      {tarefas.length === 0 && <p>Nenhuma tarefa encontrada.</p>}

      <TaskFilters
        onToday={handleToday}
        onWeek={handleWeek}
        onMonth={handleMonth}
        onAll={handleAll}
      />

      {tarefas.map((tarefa) => (
        <TaskCard
          key={tarefa.id}
          tarefa={tarefa}
          onDelete={handleDelete}
          onConcluir={handleConcluir}
        />
      ))}
    </main>
  )
}

export default TaskListPage
