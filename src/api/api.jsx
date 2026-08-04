import axios from 'axios'

const api = axios.create({
  baseURL: 'https://taskmanager-xlm1.onrender.com',
})

export default api
