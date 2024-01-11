// export const BASE_API_URL = process.env.REACT_APP_URL_BE_TENANT1;
// export const BASE_API_MSRT = process.env.REACT_APP_URL_MSRT;
// export const BASE_API_URL_V2 = process.env.REACT_APP_URL_V2
// export const BE_NEW_API = process.env.REACT_APP_URL_BE_NEW_API

const onDebug = window.location.hostname.includes("localhost")
const thisUrl = window.location.href
const DEV_ENVI = 0,
  STAGING_ENVI = 1,
  PROD_ENVI = 2
const currentEnvi = thisUrl.startsWith("https")
  ? thisUrl.includes("test")
    ? STAGING_ENVI
    : PROD_ENVI
  : DEV_ENVI

// export const prodEnvi = currentEnvi === PROD_ENVI
export const prodEnvi = currentEnvi === DEV_ENVI ? false : true

export const useMjpToken = true //currentEnvi !== PROD_ENVI
const portTenantV1 = prodEnvi ? "" : ":8080"
const portTenantV2 = prodEnvi ? "" : ":9090"

// export const BASE_API_URL = onDebug
//   ? "http://ptp-dev.innovez-one.com:9090"
//   : (prodEnvi ? "https://" : "http://") +
//     window.location.hostname +
//     portTenantV1
// export const BASE_API_URL_V2 = onDebug
//   ? "http://ptp-dev.innovez-one.com:9090"
//   : (prodEnvi ? "https://" : "http://") +
//     window.location.hostname +
//     portTenantV2

const getUrl = () => {
  // Mendapatkan URL saat ini
  let currentUrl = window.location.href

  // Menggunakan objek URL untuk mengurai URL
  let urlObject = new URL(currentUrl)

  // Mendapatkan protokol, host, dan port
  let protocol = urlObject.protocol
  let host = urlObject.host
  let port = urlObject.port

  // Membentuk URL hasil
  let resultUrl = protocol + "//" + host
  return resultUrl
}

export let BASE_API_URL = onDebug
  ? "https://marinemdev.marinemlive.com"
  : getUrl()
export let BASE_API_URL_V2 = onDebug
  ? "https://marinemdev.marinemlive.com"
  : getUrl()

// export let BASE_API_URL = onDebug
//   ? "http://ptp-dev.innovez-one.com:9090"
//   : getUrl()
// export let BASE_API_URL_V2 = onDebug
//   ? "http://ptp-dev.innovez-one.com:9090"
//   : getUrl()

export const setAPIURL = (url) => {
  BASE_API_URL = url
  BASE_API_URL_V2 = url
}

// export const BASE_API_URL = "https://marinemdev.marinemlive.com"
// export const BASE_API_URL_V2 = "https://marinemdev.marinemlive.com"

// export const BASE_API_URL = "https://pocc.marinemlive.com"
// export const BASE_API_URL_V2 = "https://pocc.marinemlive.com"

// export const BE_NEW_API =
//   "http://" +
//   window.location.hostname +
//   `:${process.env.REACT_APP_V2_PORT}/msrq/api/v2`

export const PREFIX_MSRQ = "/msrq/api/v2"
export const PREFIX_MSRT = "/msrt/api/v2"
export const PREFIX_UAM = "/uam/api/v2"
export const PREFIX_MRM = "/mrm/api/v2"
export const PREFIX_MSM = "/msm/api/v2"
export const PREFIX_MCM = "/mcm/api/v2"
export const PREFIX_MSS = "/mss/api/v2"
export const PREFIX_MCS = "/mcs/api/v2"
export const PREFIX_CARGO = "/cargo-service/api/v2"

export const BE_NEW_API = BASE_API_URL_V2 + PREFIX_MSRQ
