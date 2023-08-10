import { useState } from 'react'

export function useValidateDayInMonth () {
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)

  const isValidDayInMonth = (day, month) => {
    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate()
    if (day > daysInMonth && day <= 31) {
      setError('The day is not valid')
      setIsError(true)
    } else {
      setError('')
      setIsError(false)
    }
  }

  return { error, isError, isValidDayInMonth }
}
