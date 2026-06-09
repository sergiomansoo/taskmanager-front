import LoginPage from "./LoginPage"
import {useState} from 'react'
import { Navigate, useNavigate } from "react-router-dom"
import RegisterPage from "./RegisterPage"
function HomePage(){
    const navigate=useNavigate()
    return(
        <main>
        <h1>TaskManager</h1>
        <h3>O organizador de tarefas que combina com você</h3>
        <button onClick={()=>navigate('/login')}>Login</button>
        <button onClick={()=>navigate("/registrar")}>Registrar-se</button>
        </main>
    )
}
export default HomePage