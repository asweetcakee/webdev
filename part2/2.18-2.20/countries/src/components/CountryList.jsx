const CountryList = ({countries}) => {
  console.log("LOOK",countries)
  return(
    <div>
      {countries.map((country, index) => {
          return <p key={index}>{country.name.common}</p>
        })
      }
    </div>
  )
}

export default CountryList