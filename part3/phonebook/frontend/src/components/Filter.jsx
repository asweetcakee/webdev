import Input from './Input'

const Filter = ({onInputChange, filterValue}) => {
  return(
    <label>
      filter shown with: <Input name={"filter"} onChange={onInputChange}  value={filterValue} />
    </label>
  )
}

export default Filter