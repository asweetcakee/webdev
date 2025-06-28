const Header = ({course}) => {
  console.log("-Header: ", course.name)

  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) => {
  console.log("-Part: ", part.name, part.exercises)

  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({course}) => {
  const parts = course.parts.map(obj => ({name: obj.name, exercises: obj.exercises}))
  console.log("-Content: ", parts)

  return (
    <div>
      {
        parts.map((part, index) => (
          <Part key = {index} part = {part}/>  
        ))
      }
    </div>
  )
}

const Total = ({course}) => {
  let sum = 0
  
  course.parts.forEach(obj => {
    sum += obj.exercises
    console.log("-Sum: ", sum)
  });

  return(
    <p>Number of exercises {sum} </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

   return (
    <div>
      <Header course = {course} />
      <Content course = {course}/>
      <Total course = {course}/>
    </div>
  )
}

export default App
