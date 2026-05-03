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
      .then(data => setAnecdotes(anecdotes.concat(data)))
      .catch(error => {
        console.log('Error saving anecdote:', error?.message)
      })
  }

  return { anecdotes, addAnecdote }
}