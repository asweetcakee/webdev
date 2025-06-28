const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({parts, exercise}) => {
  return (
    <div>
      <Part part = {parts.part1} exercise = {exercise.exercises1} />
      <Part part = {parts.part2} exercise = {exercise.exercises2} />
      <Part part = {parts.part3} exercise = {exercise.exercises3} />
    </div>
  )
}

const Total = ({exercise}) => {
  return(
    <p>Number of exercises {exercise.exercises1 + exercise.exercises2 + exercise.exercises3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content parts = {{part1, part2, part3}} exercise = {{exercises1, exercises2, exercises3}}/>
      <Total exercise = {{exercises1, exercises2, exercises3}}/>
    </>
  )
}

export default App
