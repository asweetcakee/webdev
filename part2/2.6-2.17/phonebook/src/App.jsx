import { useState } from 'react'

const Phonebook = ({title, onInputChange, onAdd}) => {
  return(
    <>
      <h2>{title}</h2>
      <Form onInputChange={onInputChange} onAdd={onAdd}/>
    </>
  )
}

const Form = ({onInputChange, onAdd}) => {
  return(
    <>
      <form>
        <div>
          name: <Input onChange={onInputChange}/>
        </div>
        <div>
          <Button title={"add"} type={"submit"} onClick={onAdd}/>
        </div>
      </form>
    </>
  )
}

const Input = ({onChange}) => <input onChange={onChange}/>
const Button = ({title, type, onClick}) => <button type={type} onClick={onClick}>{title}</button>

const ShowPerson = ({persons}) => 
  <div>
    {persons.map((person, index) => <p key={index}>{person.name}</p>)}
  </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }
  console.log("persons:", persons)
  
  return (
    <div>
      <Phonebook title={"Phonebook"} onInputChange={handleInput} onAdd={handleAddPerson}/>
      <h2>Numbers</h2>
      <ShowPerson persons={persons}/>
    </div>
  )
}

export default App