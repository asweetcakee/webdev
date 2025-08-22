import { useState, useEffect } from 'react'

const notificationTypes = {
  success: 'success',
  error: 'error',
  default: 'default'
}

const useNotification = () => {
  const [notification, setNotification] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    if(!notification) return
    const timeoutId = setTimeout(() => {
      setNotification(null)
      setType(null)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [notification])

  const notify = (message, newType = notificationTypes.default) => {
    setNotification(message)
    setType(newType)
  }

  return {
    notification,
    type,
    notify
  }
}

export { useNotification, notificationTypes }