import axios from 'axios'

const api = axios.create({
  baseURL: 'https://taskmanager-api-kw0d.onrender.com',
})

export default api
