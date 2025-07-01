import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = (obj) => {
  const request = axios.post(baseURL, obj)
  return request.then(response => response.data)
}

const deleteByID = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

export default {getAll, create, deleteByID}