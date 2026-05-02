import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext(null)
let notificationTimer = null

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const setNotification = (message, timeInSeconds) => {
    dispatch({ type: 'SET', payload: message })

    if (notificationTimer) clearTimeout(notificationTimer)
    
    notificationTimer = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeInSeconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext