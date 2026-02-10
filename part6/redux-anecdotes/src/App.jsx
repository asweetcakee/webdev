import { useDispatch, useSelector } from 'react-redux'
import { asObject } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
  
  const vote = id => {
    console.log('vote', id)
    return {
      type: 'VOTE',
      payload: {
        id
      }
    }
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'NEW_ANECDOTE', payload: asObject(value) })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
