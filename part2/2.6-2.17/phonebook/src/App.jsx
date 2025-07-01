import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const MSG_TYPES = {
    success: "success",
    error: "error",
    default: "default"
  }

  useEffect(() => {
    const promise = personServices.getAll()
    promise.then(person => setPersons(person))
    .catch(error => {
      notify('Could not load phonebook data.', MSG_TYPES.error)
    })
  }, [])

  useEffect(() => {
    if (!notificationMessage) return

    const timeoutId = setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [notificationMessage])

  const notify = (message, type = MSG_TYPES.default) => {
    setNotificationMessage(message)
    setNotificationType(type)
  }

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
      notify("Name or phone cannot be empty", MSG_TYPES.error)
      return
    }  

    const person = persons.find(p => p.name === newName)
    
    if(!person) {
      personServices.create({name: newName, number: newNumber}).then(person => setPersons(persons.concat(person)))
      notify(`Added ${newName}`, MSG_TYPES.success)
      resetInputs()
      return
    }

    if (person.number === newNumber){
      notify(`${newName} is already added to phonebook and the number is the same. No need to update.`, MSG_TYPES.default) 
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
      notify(`Updated ${returnedPerson.name} number.`, MSG_TYPES.success)
      setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
      resetInputs()
    })
    .catch(error => {
      notify(`Update failed: Information of ${person.name} has already been removed from server.`, MSG_TYPES.error)
      setPersons(persons.filter(p => p.id !== person.id))
      resetInputs()
    })
  }
  
  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmation = window.confirm(`Delete ${person.name}?`)

    if (!confirmation) return

    const promise = personServices.deleteByID(person.id)

    promise.then(person => {
      notify(`Deleted ${person.name}`, MSG_TYPES.success)
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch(error => {
      notify(`Delete failed: ${person.name} was already removed from server.`, MSG_TYPES.error)
      setPersons(persons.filter(p => p.id !== id))
    })
  }
  
  console.log("-persons:", persons)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter onInputChange={handleInput} filterValue={newFilter}/>

      <h3>Add a new</h3>
      <PersonForm onInputChange={handleInput} onAdd={handleAddPerson} nameValue={newName} numberValue={newNumber}/>

      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={newFilter} onDelete={handleDeletePerson}/>
    </div>
  )
}

export default App