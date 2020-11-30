import { useState, useEffect } from 'react'

export default function useIsIE11 () {
  const [isIe11, setIsIe11] = useState(false)

  useEffect(() => {
    const ie11 = !!(window.MSInputMethodContext && document.documentMode)
    setIsIe11(ie11)
  }, [])

  return [isIe11]
}
