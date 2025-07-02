import CountryList from "./CountryList"
import CountryDetail from "./CountryDetail"

const Output = ({filteredCountries, filterVal}) => {
  const length = filteredCountries.length

  if (filterVal === "") return <p>Type to search for a country</p>
  if (length > 10) return <p>Too many matches, specify another filter</p>
  
  // Prevents rendering the country list when the filter exactly matches a country’s name
  // For instance: United States. There are 2 other countries with US in their name
  const exactCountry = filteredCountries.find(country => 
    country.name.common.toLowerCase() === filterVal.trim().toLowerCase())
  if (exactCountry) return <CountryDetail country={exactCountry} />

  if (length > 1) return <CountryList countries={filteredCountries} />

  if (length === 1) return <CountryDetail country={filteredCountries[0]} />

  return <p>No matches found</p>

}

export default Output