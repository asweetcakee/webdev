import { createSlice } from "@reduxjs/toolkit";

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeInSeconds) => {
  return async(dispatch) => { 
    if (timeoutId) clearTimeout(timeoutId)
    
    dispatch(showNotification(message))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer