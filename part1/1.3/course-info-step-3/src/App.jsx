const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part}) => {
  console.log(part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      <Part part = {parts.part1}/>
      <Part part = {parts.part2}/>
      <Part part = {parts.part3}/>
    </div>
  )
}

const Total = ({parts}) => {
  return(
    <p>Number of exercises {parts.part1.exercises + parts.part2.exercises + parts.part3.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {{part1, part2, part3}}/>
      <Total parts = {{part1, part2, part3}}/>
    </div>
  )
}

export default App
