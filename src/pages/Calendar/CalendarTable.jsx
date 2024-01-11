// import React from "react"
// import "./CalendarCal.css"
// // import localData from "./data.json"
// // import localData from "./data2.json"
// import { useTheme } from "@mui/material/styles"
// import moment from "moment/moment"
// import CalendarAutocomplete from "./CalendarAutocomplete"
// import { Typography } from "@mui/material"

// const combineDateArr = (dateA, dateB) => {
//   // Gabungkan kedua array menjadi satu array
//   let combinedDates = dateA.concat(dateB)

//   // Buat Set untuk menghilangkan duplikasi
//   let uniqueDatesSet = new Set(combinedDates)

//   // Ubah Set kembali menjadi array
//   let uniqueDatesArray = Array.from(uniqueDatesSet)

//   // Mengurutkan array berdasarkan tanggal dan waktu
//   uniqueDatesArray.sort((a, b) => {
//     return new Date(a) - new Date(b)
//   })

//   return uniqueDatesArray
// }

// export default function CalendarTable({
//   startDateTime = null,
//   endDateTime = null,
//   mode = "week",
//   dayModeSplit = 15, // every 15 minutes
//   calendarData = [],
//   changeAttr = () => {},
//   type = "personnel",
// }) {
//   const theme = useTheme()
//   if (startDateTime === null || endDateTime === null) {
//     return ""
//   }
//   const dateRange = []
//   const startDate = moment(startDateTime, "YYYY-MM-DD HH:mm:ss")
//   const endDate = moment(endDateTime, "YYYY-MM-DD HH:mm:ss")

//   // Mulai dari tanggal awal
//   let currentDate = startDate.clone()

//   // Lakukan perulangan sampai currentDate sebelum endDateTime atau sama dengan
//   let n = 0
//   if (mode === "day") {
//     while (currentDate.isSameOrBefore(endDate)) {
//       dateRange.push(currentDate.format("YYYY-MM-DD HH:mm:ss"))
//       currentDate.add(15, "minutes") // Tambah 15 menit
//     }
//   } else {
//     while (currentDate.isSameOrBefore(endDate)) {
//       dateRange.push(currentDate.format("YYYY-MM-DD"))
//       currentDate.add(1, "days")
//     }
//   }

//   console.log(dateRange)

//   const data = calendarData?.map((x) => {
//     let shiftBlockFormat = []
//     let formatDateComparasion =
//       mode === "day" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"
//     let durationMode = mode === "day" ? "minutes" : "days"

//     for (let [i, y] of dateRange.entries()) {
//       // find apakah tanggal ada didalam block
//       let dateFind =
//         x?.blocks?.find(
//           (z) =>
//             moment(z?.startDateTime).format(formatDateComparasion) ===
//             moment(y).format(formatDateComparasion)
//         ) ?? null

//       let blockFormatTemp = {
//         startDateTime: null,
//         endDateTime: null,
//         mark: false,
//         length: 0,
//         parentIndex: null,
//       }

//       if (dateFind) {
//         // jika tanggal ada didalam blocks maka
//         let startTemp = moment(dateFind?.startDateTime, "YYYY-MM-DD HH:mm:ss")
//         let endTemp = moment(dateFind?.endDateTime, "YYYY-MM-DD HH:mm:ss")
//         let duration = endTemp.diff(startTemp, durationMode)

//         if (mode === "day") {
//           duration = duration / dayModeSplit
//         } else {
//           duration = duration
//         }

//         blockFormatTemp = {
//           startDateTime: startTemp?.format(formatDateComparasion) ?? null,
//           endDateTime: endTemp?.format(formatDateComparasion) ?? null,
//           mark: true,
//           length: duration,
//           parentIndex: null,
//         }

//         // if the value of duration from current date with now is 1 with before than delete this and update length + 1 in before
//         // duration day is 15 minutes and 1 day for week and month
//         let fineDurationBetweenTwoDates = mode === "day" ? 15 : 1
//         let startDateBefore = shiftBlockFormat?.[i - 1]?.startDateTime ?? null
//         if (startDateBefore) {
//           let beforeDateCompare = moment(startDateBefore, formatDateComparasion)
//           let currentDateCompare = moment(
//             blockFormatTemp?.startDateTime,
//             formatDateComparasion
//           )
//           let diffCompare = currentDateCompare.diff(
//             beforeDateCompare,
//             durationMode
//           )
//           if (diffCompare === fineDurationBetweenTwoDates) {
//             // set parentIndex for current block format
//             let parentIndexBefore =
//               shiftBlockFormat[i - 1]?.parentIndex ?? i - 1
//             blockFormatTemp.parentIndex = parentIndexBefore

//             // set length from parentIndex and set 0 for this item
//             shiftBlockFormat[parentIndexBefore].length =
//               shiftBlockFormat[parentIndexBefore].length + 1
//             shiftBlockFormat[parentIndexBefore].endDateTime =
//               blockFormatTemp.endDateTime
//             blockFormatTemp.length = 0
//           }
//         }
//       }

//       shiftBlockFormat.push(blockFormatTemp)
//     }

//     // let shiftBlockFormat = x?.shift?.blocks?.map((y)=> moment.(y.startDateTime))
//     let shiftTimeFormat = { ...x?.shift, blocks: shiftBlockFormat }
//     return {
//       ...x,
//       shift: shiftTimeFormat,
//       name: type === "personnel" ? x?.personnelName : x?.teamName,
//     }
//   })
//   console.log(data)

//   const labelFormat = mode === "day" ? "HH:mm" : "YYYY-MM-DD"

//   // console.log(data)
//   // console.log(dateRange)

//   return (
//     <div className="RCalendar-container">
//       <div className="RCalendar-header">
//         <div className="RCalendar-header-label">
//           <CalendarAutocomplete type={type} changeAttr={changeAttr} />
//         </div>
//         {dateRange?.map((x, i) => (
//           <div key={x} className="RCalendar-header-cell">
//             {moment(x).format(mode === "day" ? "HH:mm" : "ddd DD")}
//           </div>
//         ))}
//       </div>
//       <div className="RCalendar-body">
//         {data.length > 0 ? (
//           data?.map((x, iX) => (
//             <div className="RCalendar-body-row" key={iX}>
//               <div className="RCalendar-body-label">{x?.name ?? ""}</div>
//               {x?.shift?.blocks?.map((y, i) => {
//                 return (
//                   <div
//                     key={`body-${y?.startDateTime ?? i}`}
//                     className="RCalendar-body-cell"
//                   >
//                     <div className="RCalendar-body-cell-border">
//                       <div className="RCalender-body-cell-border-gray"></div>
//                     </div>
//                     {y?.length > 0 && (
//                       <div className="RCalendar-mark">
//                         <div
//                           className="RCalendar-mark-bar"
//                           style={{ width: `calc(${y?.length * 100}% - 0px)` }}
//                           title={
//                             `${x?.teamName} ${moment(y?.startDateTime).format(
//                               labelFormat
//                             )} - ${moment(y?.endDateTime).format(
//                               labelFormat
//                             )}` ?? ""
//                           }
//                         >
//                           <div className="RCalendar-mark-bar-label">
//                             {x?.teamName ?? ""}
//                             <span className="RCalendar-mark-bar-timelabel">
//                               {`${moment(y?.startDateTime).format(
//                                 labelFormat
//                               )} - ${moment(y?.endDateTime).format(
//                                 labelFormat
//                               )}`}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           ))
//         ) : (
//           <Typography variant="body1" marginTop={"1rem"} textAlign={"center"}>
//             No Schedule
//           </Typography>
//         )}
//       </div>
//     </div>
//   )
// }
