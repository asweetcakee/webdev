import { useState } from 'react'

const CurrentAnecdote = ({title, anecdote, votes, onVote, onNext}) => {
  return(
    <>
      <h2>{title}</h2>
      <p>{anecdote}</p>
      <Button onClick={onVote} title={"Vote"}/>
      <span> </span>
      <Button onClick={onNext} title={"Next anecdote"}/>
      <p>Votes: {votes}</p>
    </>
  )
}

const MostVotedAnecdote = ({title, topAnecdotes, maxVote}) => {
  return(
    <>
      <h2>{title}</h2>
      {
        maxVote < 1 ? <p>No one voted yet</p> : <p>{topAnecdotes} has {maxVote} votes</p>
      }
    </>
  )
}

const Button = ({onClick, title}) => <button onClick={onClick}>{title}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const arrayLength = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(arrayLength).fill(0))
  const maxVote = Math.max(...votes)
  
  const handleNextAnecdote = () => {
    const generateRandomIndex = () => {
      if (arrayLength <= 1) return 0
      
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * arrayLength)
      } while (newIndex === selected)
      return newIndex
    }
    setSelected(generateRandomIndex())
  }

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const getAnecdotesByVotes = () => {
    let result = []
    for (let i = 0; i < arrayLength; i++){
      if (votes[i] === maxVote){
        result = result.concat(anecdotes[i])
      }
    }
    return result.join(" ")
  }

  return (
    <div>
      <CurrentAnecdote title={"Anecdote of the day"} anecdote={anecdotes[selected]} votes={votes[selected]} onNext={handleNextAnecdote} onVote={handleVote}/>
      <MostVotedAnecdote title={"Anecdote with most votes"} topAnecdotes={getAnecdotesByVotes()} maxVote={maxVote}/>
    </div>
  )
}

export default App