const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: 'log in' }).click()
}

const hasNotification = async (page, message, textColor, borderColor) => {
  const notification = page.getByTestId('notification')
  await expect(notification).toBeVisible()
  await expect(notification).toContainText(message)
  await expect(notification).toHaveCSS('color', textColor)
  await expect(notification).toHaveCSS('border', `3px solid ${borderColor}`)
}

export { loginWith, hasNotification }