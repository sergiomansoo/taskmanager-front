
function UserCard({usuario,onDelete}){
    return(
         <article>
          <div className="card-tarefa-header">
            <h2>{usuario.nome}</h2>
            <button
              className="lixeira"
              type="button"
              onClick={() => onDelete(usuario.id)}
            >
              x
            </button>
          </div>
        <p>Id: {usuario.id}</p>
        <p>Email: {usuario.email}</p>
        <p>Role: {usuario.role}</p>
        <p>Data de Criação: {usuario.data_criacao}</p>
        </article>
    )
}
export default UserCard