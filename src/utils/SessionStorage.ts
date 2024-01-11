let sessionCache: any = {}

export const SessionStorage = {
  setStorage: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value))

    sessionCache[key] = value
  },
  getStorage: (key: string) => {
    if (!(key in sessionCache)) {
      if (sessionStorage.getItem(key) !== "undefined") {
        sessionCache[key] = JSON.parse(sessionStorage.getItem(key)!)
      }
    }
    if (sessionCache[key] === 'undefined') {
      return {}
    }
    return sessionCache[key]
  },
  clear: () => {
    sessionStorage.clear()
    sessionCache = {}
  },
}

export default SessionStorage
