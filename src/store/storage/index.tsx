import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@store/reducers'
import { setCookie, getCookie } from 'cookies-next'

export const store = configureStore({
  reducer: rootReducer,
})

// store data
export const setItem = (key: string, value: any) => {
  let dataStorage: any
  if (typeof window !== 'undefined') {
    dataStorage = localStorage.setItem(key, JSON.stringify(value))
  }

  return dataStorage
}

// get data
export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
}

// Store Data
const SetStorage = (key: string, value: any) => {
  const selectedCategoryName =
    typeof window !== 'undefined' ? localStorage.setItem(key, JSON.stringify(value)) : undefined
  return selectedCategoryName
}

const SetCookie = (key: string, value: any) => {
  setCookie(key, typeof value === 'string' ? value : JSON.stringify(value), { maxAge: 86400 })
}

// Retrive Data
const GetStorage = (key: string) => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(key) : undefined
  try {
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    return e
  }
}

function GetCookie(name: string): any {
  const session = getCookie(name)
  if (session) {
    const json = JSON.parse(String(session))
    return json
  }

  return null
}

export { SetStorage, SetCookie, GetStorage, GetCookie }
