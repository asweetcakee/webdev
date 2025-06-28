const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part}) => {
  console.log("-Part: ", part.name, part.exercises)

  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  
  console.log("-Content: ", parts)

  return (
    <div>
      {
        parts.map((part, index) => (
          <Part key = {index} part = {part} />
        ))
      }      
    </div>
  )
}

const Total = ({parts}) => {
  let sum = 0
  
  const exercisesList = parts.map((part) => (
    part.exercises
  ))
  .forEach(element => {
    sum += element
    console.log("-Sum: ", sum)
  })
  
  return(
    <p>Number of exercises {sum} </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

   return (
    <div>
      <Header course = {course} />
      <Content parts = {parts}/>
      <Total parts = {parts}/>
    </div>
  )
}

export default App
