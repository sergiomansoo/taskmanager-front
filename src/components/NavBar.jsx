import { NavLink } from 'react-router-dom'
import './NavBar.css'

function Navbar({ onLogout , usuario }) {
  return (
    <nav>
      <NavLink to="/tarefas">Tarefas</NavLink>
      <NavLink to="/criar-tarefa">Criar tarefa</NavLink>
      <NavLink to="/usuarios">Usuarios</NavLink>
      <NavLink  to="/criar-usuario">Criar usuario</NavLink>

      <NavLink className={'profile'} to="/usuarios/me">Meu perfil</NavLink>

      <button type="button" onClick={onLogout}>
        Sair
      </button>
    </nav>
  )
}

export default Navbar
