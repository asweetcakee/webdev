import Button from './Button'

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
          <p key={person.id}>
            {person.name} {person.number}
            &nbsp;&nbsp;
            <Button title={"delete"} type={"button"} onClick={() => onDelete(person.id)}/>
          </p>
          )
        })
      }
    </div>
  )
}

export default Persons