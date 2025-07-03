import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Output from './components/Output'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countriesService
    .getAll()
    .then(data => setCountries(data))
    .catch(error => {
      console.log("-ERROR: Failed to load countries", error)
    })
  },[])

  const handleInput = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }  

  const filterValue = filter.trim().toLowerCase()
    
  const filtered = filterValue !== "".trim()
  ? countries.filter(country => country.name.common.toLowerCase().includes(filterValue))
  : []
  
  console.log("-filtered:", filtered)

  return (
    <>
      <label>
        find countries &nbsp;
        <input type="text" value={filter} onChange={handleInput} />
      </label>
      <Output filteredCountries={filtered} filterVal={filter} />
    </>
  )
}

export default App
