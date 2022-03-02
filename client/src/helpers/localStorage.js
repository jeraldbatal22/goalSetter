export const goal_setter = 'goal_setter_app'

export const USER = goal_setter + 'user' //  title for login user data

export const save = (key, data = null) => {
  return window.localStorage.setItem(key, JSON.stringify(data))
}

export const get = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) // GET login user data to local storage
}

export const remove = (key) => {
  return window.localStorage.removeItem(key) // REMOVE login user data and token to local storage when the user is logout
}

export const clear = () => {
  window.localStorage.clear() // for clearing the storage
}