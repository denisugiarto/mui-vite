import { useEffect, useState } from "react"

type removeHandler = (e: any) => void
type eventCallback = (data: any) => void
type dispatcherHandler = (data: any) => void
type EventListenerType = {
  on: (
    event: string,
    callback: eventCallback,
    dispatchLastValue: boolean
  ) => removeHandler
  dispatch: (event: string, data: any) => void
  createDispatcher: (event: string) => dispatcherHandler
  remove: (event: string, handler: removeHandler) => void
  lastValue: any
}

const eventListener: EventListenerType = {
  on(event, callback, dispatchLastValue = true) {
    const handler: removeHandler = (e) => {
      callback(e.detail)
    }
    document.addEventListener(event, handler)
    if (dispatchLastValue && eventListener.lastValue[event]) {
      callback(eventListener.lastValue[event])
    }
    return handler
  },

  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }))
    eventListener.lastValue[event] = data
  },

  createDispatcher(event) {
    return (data) => {
      eventListener.dispatch(event, data)
    }
  },

  remove(event, handler) {
    document.removeEventListener(event, handler)
  },

  lastValue: {},
}

export default eventListener

// Attach event into CallbackFn inside React Component
export function useEventListener(
  evName: string,
  callbackFn: eventCallback,
  dispatchLastValue = true
): dispatcherHandler {
  useEffect(() => {
    let mounted = true
    const handler = eventListener.on(
      evName,
      (data) => {
        if (mounted) callbackFn(data)
      },
      dispatchLastValue
    )

    return () => {
      mounted = false
      eventListener.remove(evName, handler)
    }
  }, [])

  // return Dispatch Function
  return (data) => {
    eventListener.dispatch(evName, data)
  }
}

export function useStateEventListener<TData>(
  evName: string,
  initialValue: TData = null,
  getLastValue = true
): [value: TData, setValue: dispatcherHandler] {
  const [val, setVal] = useState(initialValue)
  const dispatcher = useEventListener(evName, setVal, getLastValue)

  return [val, dispatcher]
}
