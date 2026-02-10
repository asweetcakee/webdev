import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(value))
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name='anecdote'/>
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm