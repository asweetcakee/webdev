import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll()
      .then(data => setAnecdotes(data))
      .catch(error => {
        console.log('Error retrieving anecdotes:', error?.message)
      })
  }, [])
  
  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote)
      .then(data => setAnecdotes(prev => prev.concat(data)))
      .catch(error => {
        console.log('Error saving anecdote:', error?.message)
      })
  }

  const deleteAnecdote = (id) => {
    anecdoteService.deleteSelected(id)
      .then(data => setAnecdotes(prev => prev.filter(a => a.id !== id)))
      .catch(error => {
        console.log('Error deleting anecdote:', error?.message)
      })
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}