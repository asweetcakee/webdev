import { useState } from 'react'

const Phonebook = ({title, onInputChange, onAdd, value}) => {
  return(
    <>
      <h2>{title}</h2>
      <Form onInputChange={onInputChange} onAdd={onAdd} value={value}/>
    </>
  )
}

const Form = ({onInputChange, onAdd, value}) => {
  return(
    <>
      <form>
        <div>
          name: <Input onChange={onInputChange} value={value}/>
        </div>
        <div>
          <Button title={"add"} type={"submit"} onClick={onAdd}/>
        </div>
      </form>
    </>
  )
}

const Input = ({onChange, value}) => <input value={value} onChange={onChange}/>
const Button = ({title, type, onClick}) => <button type={type} onClick={onClick}>{title}</button>

const ShowPerson = ({persons}) => 
  <div>
    {persons.map(person => <p key={person.name}>{person.name}</p>)}
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
    if (newName.trim() === ""){
      console.log("Name cannot be empty")
      return
    }  

    const personExist = persons.some(person => person.name === newName)
    
    personExist 
    ? alert(`${newName} is already added to phonebook`) 
    : (
        setPersons(persons.concat({name: newName})),
        setNewName('')
      ) 
  }
  console.log("persons:", persons)
  
  return (
    <div>
      <Phonebook title={"Phonebook"} onInputChange={handleInput} onAdd={handleAddPerson} value={newName}/>
      <h2>Numbers</h2>
      <ShowPerson persons={persons}/>
    </div>
  )
}

export default App