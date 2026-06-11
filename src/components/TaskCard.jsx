function TaskCard({ tarefa, onDelete, onConcluir }) {
  return (
    <article className="card-tarefa">
      <div className="card-tarefa-header">
        <h2>{tarefa.titulo}</h2>
        <div className="card-actions">
        {tarefa.status !== 'CONCLUIDA' && (
          <button className="concluir-button"onClick={() => onConcluir(tarefa.id)}>Concluir</button>
        )}
        <button
          className="lixeira"
          type="button"
          onClick={() => onDelete(tarefa.id)}
        >
          x
        </button>
        </div>
      </div>
      <p>{tarefa.descricao}</p>
      <p>Status: {tarefa.status}</p>
      <p>Prioridade: {tarefa.prioridadeTarefa}</p>
      <p>Entrega: {tarefa.dataEntrega}</p>
      <p>Usuario ID: {tarefa.usuarioId}</p>
    </article>
  )
}

export default TaskCard
