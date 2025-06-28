const Header = ({course}) => <h2>{course}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  return(
    <>
      {
        parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )
      }
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((total, line) => total += line.exercises, (0))
  return <strong>total of {total} exercises</strong>
}

const Course = ({course}) => {
  console.log("-Course:", course)
  return(
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course