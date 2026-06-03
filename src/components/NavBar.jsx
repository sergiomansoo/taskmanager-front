import { NavLink } from 'react-router-dom'
import './NavBar.css'

function Navbar({ onLogout }) {
  return (
    <nav>
      <NavLink to="/tarefas">Tarefas</NavLink>
      <NavLink to="/criar-tarefa">Criar tarefa</NavLink>
      <NavLink to="/usuarios">Usuarios</NavLink>

      <button type="button" onClick={onLogout}>
        Sair
      </button>
    </nav>
  )
}

export default Navbar
