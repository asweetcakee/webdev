  import { useState } from 'react'
  import { useEffect } from 'react'
  import personServices from './services/persons'

  const Filter = ({onInputChange, filterValue}) => {
    return(
      <>
        filter shown with:<Input name={"filter"} onChange={onInputChange}  value={filterValue} />
      </>
    )
  }

  const PersonForm = ({onInputChange, onAdd, nameValue, numberValue}) => {
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

  const Persons = ({persons, filterValue, onDelete}) => {
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
        {filteredPersons.map(person => {
          return(
            <div key={person.id}>
              <p>
                {person.name} {person.number}
                &nbsp;&nbsp;
                <Button title={"delete"} type={"button"} onClick={() => onDelete(person.id)}/>
              </p>
            </div>
            )
          })
        }
      </div>
    )
  }
    

  const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const hook = () => {
      const promise = personServices.getAll()
      promise.then(person => setPersons(person))
    }
    useEffect(hook, [])

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

      const person = persons.find(p => p.name === newName)
      
      if(!person) {
        personServices.create({name: newName, number: newNumber}).then(person => setPersons(persons.concat(person)))
        resetInputs()
        return
      }

      if (person.number === newNumber){
        alert(`${newName} is already added to phonebook and the number is the same. No need to update.`) 
        resetInputs()
        return
      }

      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) 
      if (!confirmation) {
        resetInputs()
        return
      }
      
      const updatedNumber = {...person, number: newNumber}
      const promise = personServices.update(person.id, updatedNumber)
      promise.then(returnedPerson => {
        console.log("-returned person:", returnedPerson)
        setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
        resetInputs()
      })
      .catch(error => {
        alert(`Update failed: ${person.name} was already removed from server.`)
        setPersons(persons.filter(p => p.id !== person.id))
      })

    }
    
    const handleDeletePerson = (id) => {
      
      const person = persons.find(person => person.id === id)
      const confirmation = window.confirm(`Delete ${person.name}?`)

      if (confirmation === false) return

      const promise = personServices.deleteByID(person.id)
      promise.then(() => setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
          alert(`Delete failed: ${person.name} was already removed from server.`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    
    console.log("persons:", persons)
    
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter onInputChange={handleInput} filterValue={newFilter}/>

        <h3>Add a new</h3>
        <PersonForm onInputChange={handleInput} onAdd={handleAddPerson} nameValue={newName} numberValue={newNumber}/>

        <h3>Numbers</h3>
        <Persons persons={persons} filterValue={newFilter} onDelete={handleDeletePerson}/>

      </div>
    )
  }

  export default App