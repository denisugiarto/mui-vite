import { useState, useEffect } from "react"
export { useDebounce } from "./Debounce"
export { default as eventListener } from "./EventListener"
export { useEventListener, useStateEventListener } from "./EventListener"

export function camelCaseToTitle(s: string): string {
  return (
    s
      // inject space before the upper case letters, if single letter only
      .replace(/([A-Z]+)/g, (match) => ` ${match}`)
      // replace first char with upper case
      .replace(/^./, (match) => match.toUpperCase())
  )
}

export function filterAndMap<TData, TRetData>(
  arrayData: TData[] = [],
  filterFn: (data: TData) => boolean,
  mapFn: (data: TData) => TRetData
): TRetData[] {
  return arrayData.reduce(
    (prev, current) => (filterFn(current) ? prev.concat(mapFn(current)) : prev),
    [] as TRetData[]
  )
}

// Test Case:
// const data = [{ name: "Ali" }, { name: "Budi" }, { name: "Caca" }];

// const newData = filterAndMap(
//   data,
//   (el) => el.name !== "Budi",
//   (el) => ({ name: el.name, greetings: "hello" })
// );

// console.log(newData);

export function useInterval(
  fn = () => {},
  delay = 5000,
  deps: any[] = [],
  callFnImmediately = true
) {
  let mounted = true

  useEffect(() => {
    if (callFnImmediately) fn()
    const handler = setInterval(() => {
      if (mounted) fn()
    }, delay)

    return () => {
      mounted = false
      clearInterval(handler)
    }
  }, [delay, ...deps])
}

export function useTimeout(fn = () => {}, delay = 5000) {
  let mounted = true

  useEffect(() => {
    const handler = setTimeout(() => {
      if (mounted) fn()
    }, delay)

    return () => {
      mounted = false
      clearTimeout(handler)
    }
  }, [delay])
}

const idleEvents: (keyof DocumentEventMap)[] = [
  "keydown",
  "mousedown",
  "mousemove",
  "touchstart",
  "scroll",
]

export function useIdle(timeout: number = 30000) {
  const [idle, setIdle] = useState(false)
  let timerHandle: ReturnType<typeof setTimeout>

  useEffect(() => {
    clearTimeout(timerHandle)
    timerHandle = setTimeout(() => {
      setIdle(true)
    }, timeout)

    const handleEvent = () => {
      setIdle(false)
      clearTimeout(timerHandle)
      timerHandle = setTimeout(() => {
        setIdle(true)
      }, timeout)
    }
    idleEvents.forEach((ev) => {
      document.addEventListener(ev, handleEvent)
    })

    return () => {
      clearTimeout(timerHandle)
      idleEvents.forEach((ev) => {
        document.removeEventListener(ev, handleEvent)
      })
    }
  }, [timeout])

  return idle
}
