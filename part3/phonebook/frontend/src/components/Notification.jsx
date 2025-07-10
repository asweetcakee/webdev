const Notification = ({message, type}) => {
  const baseStyle = {
    padding: "10px",
    backgroundColor: "lightgrey",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "1.5em"
  }

  const types = {
    success: { color: "green",  border: "3px solid green" },
    error: { color: "red",  border: "3px solid red" },
    default: { color: "blue", border: "3px solid blue" }
  }
  
  const finalStyle = {...baseStyle, ...(
    type === "success" 
    ? types.success
    : type === "error"
    ? types.error
    : type === "default"
    ? types.default
    : types.default
  )}

  if (message === null) return null
  return <div style={finalStyle}>{message}</div>
}

export default Notification