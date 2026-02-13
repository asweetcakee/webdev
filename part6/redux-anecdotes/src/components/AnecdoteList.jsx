import { useDispatch, useSelector } from "react-redux"
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

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

  const handleVote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(setNotification(`You voted "${anecdote.content}"`))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList