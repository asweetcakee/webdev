const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async() => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Failed to fetch anecdotes')
  return await response.json()
}

export const addAnecdote = async(newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(baseUrl, options)
  if (!response.ok) throw new Error('Failed to add new anecdote')
  return await response.json()
}

export const updateAnecdote = async(newAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(`${baseUrl}/${newAnecdote.id}`, options)
  if (!response.ok) throw new Error('Failed to updated selected anecdote')
  return await response.json()
}