  import { useState } from 'react'

  const Phonebook = ({title, onInputChange, onAdd, nameValue, numberValue}) => {
    return(
      <>
        <h2>{title}</h2>
        <Form onInputChange={onInputChange} onAdd={onAdd} nameValue={nameValue} numberValue={numberValue} />
      </>
    )
  }

  const Form = ({onInputChange, onAdd, nameValue, numberValue}) => {
    return(
      <form>
        <div>
          name: <Input name={"name"} onChange={onInputChange} value={nameValue}/>
          <br />
          number: <Input name={"number"} onChange={onInputChange} value={numberValue}/>
        </div>
        <div>
          <Button title={"add"} type={"submit"} onClick={onAdd}/>
        </div>
      </form>
    )
  }

  const Input = ({name, onChange, value}) => <input name={name} value={value} onChange={onChange}/>
  const Button = ({title, type, onClick}) => <button type={type} onClick={onClick}>{title}</button>

  const ShowPerson = ({persons}) => 
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>

  const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-1234567' }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const resetInputs = () => {
      setNewName('')
      setNewNumber('')
    }

    const handleInput = (event) => {
      console.log(event.target.value)
      const { name, value } = event.target
      if (name === "name") setNewName(value)
      else if (name === "number") setNewNumber(value)
    }

    const handleAddPerson = (event) => {
      event.preventDefault()
      if (newName.trim() === "" || newNumber.trim() === ""){
        console.log("Name or phone cannot be empty")
        return
      }  

      const personExist = persons.some(person => person.name === newName)
            
      personExist 
      ? alert(`${newName} is already added to phonebook`) 
      : (
          setPersons(persons.concat({name: newName, number: newNumber})),
          resetInputs()
        )
    }
    console.log("persons:", persons)
    
    return (
      <div>
        <Phonebook title={"Phonebook"} onInputChange={handleInput} onAdd={handleAddPerson} nameValue={newName} numberValue={newNumber} />
        <h2>Numbers</h2>
        <ShowPerson persons={persons}/>
      </div>
    )
  }

  export default App