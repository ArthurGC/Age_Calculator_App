import { useState } from 'react'

export function useValidateDate () {
  const [value, setValue] = useState({ day: '', month: '', year: '' })
  const [errorMessage, setErrorMessage] = useState({ day: '', month: '', year: '', past: '' })

  const validateDays = (day) => {
    if (day === '') {
      setErrorMessage((prevErrors) => ({ ...prevErrors, day: 'Must not be empty' }))
      setValue((prevValue) => ({ ...prevValue, day: '' }))
    } else if (day < 1 || day > 31) {
      setErrorMessage((prevErrors) => ({ ...prevErrors, day: 'Must be a valid day' }))
      setValue((prevValue) => ({ ...prevValue, day: '' }))
    } else {
      setErrorMessage((prevErrors) => ({ ...prevErrors, day: '' }))
      setValue((prevValue) => ({ ...prevValue, day }))
    }
  }

  const validateMonth = (month) => {
    if (month === '') {
      setErrorMessage((prevErrors) => ({ ...prevErrors, month: 'Must not be empty' }))
      setValue((prevValue) => ({ ...prevValue, month: '' }))
    } else if (month < 1 || month > 12) {
      setErrorMessage((prevErrors) => ({ ...prevErrors, month: 'Must be a valid month' }))
      setValue((prevValue) => ({ ...prevValue, month: '' }))
    } else {
      setErrorMessage((prevErrors) => ({ ...prevErrors, month: '' }))
      setValue((prevValue) => ({ ...prevValue, month }))
    }
  }

  const validateYear = (year) => {
    const currentYear = new Date().getFullYear()
    if (year === '') {
      setErrorMessage((prevErrors) => ({ ...prevErrors, year: 'Must not be empty' }))
      setValue((prevValue) => ({ ...prevValue, year: '' }))
    } else if (year > currentYear) {
      setErrorMessage((prevErrors) => ({ ...prevErrors, year: 'Must be a valid year' }))
      setValue((prevValue) => ({ ...prevValue, year: '' }))
    } else {
      setErrorMessage((prevErrors) => ({ ...prevErrors, year: '' }))
      setValue((prevValue) => ({ ...prevValue, year }))
    }
  }

  const isValidPastDate = (day, month, year) => {
    const today = new Date()
    const date = new Date(`${year}-${month}-${day}`)
    const years = today.getFullYear() - date.getFullYear()
    const months = today.getMonth() - date.getMonth()
    const days = today.getDate() - date.getDate()

    if (years === 0 && months <= 0 && days < 0) {
      setErrorMessage((prevErrors) => ({ ...prevErrors, past: 'Date must be in the past' }))
    } else {
      setErrorMessage((prevErrors) => ({ ...prevErrors, past: '' }))
    }
  }

  const isErrorResult = () => {
    return ({ day: errorMessage.day !== '', month: errorMessage.month !== '', year: errorMessage.year !== '', past: errorMessage.past !== '' })
  }

  const isError = isErrorResult()

  return { errorMessage, isError, value, validateDays, validateMonth, validateYear, isValidPastDate }
}
