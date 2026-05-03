import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  if (anecdotes.length === 0) return <h2>LOADING</h2>

  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}>
            {anecdote.content}
            <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList
