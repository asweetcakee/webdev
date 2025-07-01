const Notification = ({message}) => {
  const notifyStyle = {
    padding: "10px",
    color: "green",
    backgroundColor: "lightgrey",
    border: "3px solid green",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "1.5em"
  }

  if (message === null) return null
  return <div style={notifyStyle}>{message}</div>
}

export default Notification