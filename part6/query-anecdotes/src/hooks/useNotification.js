import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context.notification
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotify must be used within a NotificationContextProvider')
  }
  return context.setNotification
}