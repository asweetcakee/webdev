const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({parts, exercise}) => {
  return (
    <>
      <p>
        {parts.part1} {exercise.exercises1}
      </p>
      <p>
        {parts.part2} {exercise.exercises2}
      </p>
      <p>
        {parts.part3} {exercise.exercises3} 
      </p>
    </>
  )
}

const Total = ({ exercise }) => {
  return (
    <p>Number of exercises {exercise.exercises1 + exercise.exercises2 + exercise.exercises3} </p>
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
    <div>
      <Header course={course}/>       
      <Content 
        parts = {{part1, part2, part3}} 
        exercise = {{exercises1, exercises2, exercises3}}
      />       
      <Total exercise = {{ exercises1, exercises2, exercises3 }} />
    </div>
  )
}

export default App
