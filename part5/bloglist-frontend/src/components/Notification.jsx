const Notification = ({ message, type }) => {
  if (!message) return null

  const baseStyle = {
    padding: '10px',
    backgroundColor: 'lightgrey',
    borderRadius: '5px',
    marginBottom: '10px',
    fontSize: '1.5em'
  }

  const colors = {
    success: 'green',
    error: 'red',
    default: 'grey'
  }

  const finalStyle = {
    ...baseStyle,
    color: colors[type] || colors.default,
    border: `3px solid ${colors[type] || colors.default}`
  }

  return <div style={finalStyle}>{message}</div>
}

export default Notification