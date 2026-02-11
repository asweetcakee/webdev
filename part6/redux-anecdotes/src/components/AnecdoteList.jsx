import { useDispatch, useSelector } from "react-redux"
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleClick()}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filtered = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return [...filtered].sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteFor(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList