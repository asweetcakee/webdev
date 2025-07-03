import { useState } from "react"
import CountryDetail from "./CountryDetail"

const CountryList = ({countries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  return(
    <div>
      {countries.map(country => {
          return (
            <div key={country.cca3}>
              {country.name.common} &nbsp; 
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </div>
          )
        })
      }

      {selectedCountry && ( <CountryDetail country={selectedCountry} /> )} 

    </div>
  )
}

export default CountryList