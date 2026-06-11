import { useEffect,useState } from 'react'
import api from '../api/api'
function MePage(){
    const [usuario,setUsuario]=useState([null])
    const[erro,setErro]=useState("")
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        async function buscarUser() {
        try{
            const token=localStorage.getItem('token')
            const res= await api.get('/usuario/me',{
                headers:{Authorization:`Bearer ${token}`}
            })
           
            const data=(res.data)
            setUsuario(data)
        }
       catch (error) {
        console.log(error)
        console.log(error.response?.status)
        console.log(error.response?.data)
        setErro('Nao foi possivel carregar usuario')
        }
        finally{
            setLoading(false)
        }
    }
    
        buscarUser()
    },[])
    if(erro){
        return <p>{erro}</p>
    }
    if(loading){
        return<main><article>Carregando perfil...</article></main>
    }
    return(
        <main>
            <h1>Olá, {usuario.nome}</h1>
        <article>
            <p>Id: {usuario.id}</p>
            <p>Email:{usuario.email}</p>
            <p>Role: {usuario.role}</p>
            <p>Data de Criação: {usuario.data_criacao}</p>
        </article>
        </main>

    )
}
export default MePage