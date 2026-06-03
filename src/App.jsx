import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskCreatePage from './pages/TaskCreatePage'
import TaskListPage from './pages/TaskListPage'
import UserListPage from './pages/UserListPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token')),
  )
  const location = useLocation()

  function handleLoginSuccess() {
    setIsAuthenticated(true)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  const showNavbar = isAuthenticated && location.pathname !== '/'

  return (
    <>
      {showNavbar && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/tarefas" />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/registrar" element={<RegisterPage />} />
        <Route
          path="/tarefas"
          element={isAuthenticated ? <TaskListPage /> : <Navigate to="/" />}
        />
        <Route
          path="/criar-tarefa"
          element={isAuthenticated ? <TaskCreatePage /> : <Navigate to="/" />}
        />
        <Route
          path="/usuarios"
          element={isAuthenticated ? <UserListPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  )
}

export default App
