import Button from './Button'
import Input from './Input'

const PersonForm = ({onInputChange, onAdd, nameValue, numberValue}) => {
  return(
    <form>
      <div>
        <label>
          name: <Input name={"name"} onChange={onInputChange} value={nameValue}/>
        </label>
        <br />
        <label>
          number: <Input name={"number"} onChange={onInputChange} value={numberValue}/>
        </label>
      </div>
      <div>
        <Button title={"add"} type={"submit"} onClick={onAdd}/>
      </div>
    </form>
  )
}

export default PersonForm