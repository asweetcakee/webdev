import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = () => { 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const timerRef = useRef(null)

  useEffect(() => {
    if (message) {
      if (timerRef.current) clearTimeout(timerRef.current)
      
      timerRef.current = setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }, [message, dispatch])

  if (!message) return null  

  return <div style={style}>{message}</div>
}

export default Notification
