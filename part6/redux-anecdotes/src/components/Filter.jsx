import { useDispatch } from "react-redux"
import { createFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(createFilter(filter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter