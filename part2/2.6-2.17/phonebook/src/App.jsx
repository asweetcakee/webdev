  import { useState } from 'react'

  const Phonebook = ({title, onInputChange, onAdd, nameValue, numberValue, filterValue}) => {
    return(
      <>
        <h2>{title}</h2>
        filter shown with: <Input name={"filter"} onChange={onInputChange} value={filterValue} />
        <h2>Add a new</h2>
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

  const ShowPerson = ({persons, filterValue}) => {
    const filteredPersons = filterValue.trim() === ""
    ? persons
    : persons.filter(person => {
        console.log("-name: ", person.name.toLowerCase())
        console.log("-filter: ", filterValue.toLowerCase())
        return person.name.toLowerCase().includes(filterValue.toLowerCase())
      })
    
    console.log("-filteredPersons: ", filteredPersons)
    
    return(
      <div>
        {filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
      </div>
    )
  }
    

  const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const resetInputs = () => {
      setNewName('')
      setNewNumber('')
    }

    const handleInput = (event) => {
      console.log(event.target.value)
      const { name, value } = event.target
      if (name === "name") setNewName(value)
      else if (name === "number") setNewNumber(value)
      else if (name === "filter") setNewFilter(value)
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
          setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1})),
          resetInputs()
        )
    }
    console.log("persons:", persons)
    
    return (
      <div>
        <Phonebook title={"Phonebook"} onInputChange={handleInput} onAdd={handleAddPerson} nameValue={newName} numberValue={newNumber} filterValue={newFilter}/>
        <h2>Numbers</h2>
        <ShowPerson persons={persons} filterValue={newFilter}/>
      </div>
    )
  }

  export default App