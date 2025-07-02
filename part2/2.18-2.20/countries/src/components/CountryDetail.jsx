const CountryDetail = ({country}) => {
  if (!country) return null
  
  const imgPath = country.flags.svg
  const imgDescription = country.flags.alt

  return(
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages)
          .map(entry => <li key={entry[0]}>{entry[1]}</li>)
        }
      </ul>
      <img src={imgPath} alt={imgDescription} style={{width: "200px", height: "auto"}}/>
    </>
  )
}

export default CountryDetail