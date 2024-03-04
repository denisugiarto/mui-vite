import { useState, useEffect } from "react"

export function useDebounce<TData>(value: TData, delay = 500): TData {
  const [debValue, setDebValue] = useState(value)
  let mounted = true

  useEffect(() => {
    const handler = setTimeout(() => {
      if (mounted) setDebValue(value)
    }, delay)

    return () => {
      mounted = false
      clearTimeout(handler)
    }
  }, [value, delay])

  return debValue
}
