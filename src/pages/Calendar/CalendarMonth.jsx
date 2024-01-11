// import dayjs from "dayjs"
// import isToday from "dayjs/plugin/isToday"
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
// import React, { useEffect, useState } from "react"
// import "./CalendarMonth.css"
// import { Box, Grid, Typography } from "@mui/material"
// import CalendarAutocomplete from "./CalendarAutocomplete"

// dayjs.extend(isToday)
// dayjs.extend(isSameOrBefore)
// const CalendarMonth = ({
//   calendarData,
//   type,
//   changeAttr = () => {},
//   startDateTime = null,
//   endDateTime = null,
// }) => {
//   const [date, setDate] = useState(dayjs())

//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

//   const isSameMonth = (inputDate) => {
//     return dayjs(inputDate).format("MM") === date.format("MM")
//   }

//   const isSameYear = (inputDate) => {
//     return dayjs(inputDate).format("YYYY") === date.format("YYYY")
//   }

//   const [calendarElement, setCalendarElement] = useState([])
//   const dateRange = []
//   const startDate = dayjs(startDateTime).format("YYYY-MM-DD")
//   const endDate = dayjs(endDateTime).format("YYYY-MM-DD")
//   let currentDate = dayjs(startDate).clone()
//   // Lakukan perulangan sampai currentDate sebelum endDateTime atau sama dengan
//   while (currentDate.isSameOrBefore(endDate, "date")) {
//     dateRange.push(currentDate.format("YYYY-MM-DD"))
//     currentDate = currentDate.add(1, "day")
//   }
//   const generateDateLength = calendarData?.map((x) => {
//     let shiftBlockFormat = []
//     let formatDateComparasion = "YYYY-MM-DD"
//     let durationMode = "days"
//     for (let [i, y] of dateRange.entries()) {
//       // find apakah tanggal ada didalam block

//       let dateFind =
//         x?.blocks?.find(
//           (z) =>
//             dayjs(z?.startDateTime).format(formatDateComparasion) ===
//             dayjs(y).format(formatDateComparasion)
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
//         let startTemp = dayjs(dateFind?.startDateTime)
//         let endTemp = dayjs(dateFind?.endDateTime)
//         let duration = endTemp.diff(startTemp, durationMode)

//         blockFormatTemp = {
//           startDateTime: startTemp?.format(formatDateComparasion) ?? null,
//           endDateTime: endTemp?.format(formatDateComparasion) ?? null,
//           mark: true,
//           length: duration,
//           parentIndex: null,
//         }

//         // if the value of duration from current date with now is 1 with before than delete this and update length + 1 in before
//         // duration day is 15 minutes and 1 day for week and month
//         let fineDurationBetweenTwoDates = 1
//         let startDateBefore = shiftBlockFormat?.[i - 1]?.startDateTime ?? null
//         if (startDateBefore) {
//           let beforeDateCompare = dayjs(startDateBefore)
//           let currentDateCompare = dayjs(blockFormatTemp?.startDateTime)
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
//   console.log("🚀 ~ file: CalendarMonth.jsx:117 ~ generateDateLength ~ generateDateLength:", generateDateLength)
//   useEffect(() => {
//     const firstDayMonth = date.startOf("month")
//     const startWeekOfMonth = firstDayMonth.startOf("week")
//     const endOfMonth = date.endOf("month")
//     const endWeekOfMonth = endOfMonth.endOf("week")
//     const duration = endWeekOfMonth.diff(startWeekOfMonth, "day")
//     let calendarElementTemp = []

//     const formattedNADates = []
//     // data?.nonAvailability.map((na, index) => {
//     //   const startDateShift = dayjs(na.dates.startDateTime)
//     //   const endDateShift = dayjs(na.dates.endDateTime)
//     //   const durationNA = endDateShift.diff(startDateShift, "day") + 1
//     //   const endOfWeek = startDateShift.clone().endOf("week")
//     //   const durationEndWeek = endOfWeek.diff(startDateShift, "day") + 1

//     //   if (durationNA <= durationEndWeek) {
//     //     formattedNADates.push({
//     //       start: startDateShift.format("YYYY-MM-DD"),
//     //       length: durationNA,
//     //       reason: na.reason,
//     //     })
//     //   } else {
//     //     formattedNADates.push({
//     //       start: startDateShift.format("YYYY-MM-DD"),
//     //       length: durationEndWeek,
//     //       reason: na.reason,
//     //     })

//     //     let differenceDay = durationNA - durationEndWeek
//     //     const newStartDate = startDateShift.clone().add(durationEndWeek, "day")
//     //     for (let i = 0; i < differenceDay; i += 7) {
//     //       const diffDayWithLastIndex = differenceDay - i
//     //       if (diffDayWithLastIndex < 7) {
//     //         formattedNADates.push({
//     //           start: newStartDate.add(i, "day").format("YYYY-MM-DD"),
//     //           length: diffDayWithLastIndex,
//     //           reason: na.reason,
//     //         })
//     //       } else {
//     //         formattedNADates.push({
//     //           start: newStartDate.add(i, "day").format("YYYY-MM-DD"),
//     //           length: 7,
//     //           reason: na.reason,
//     //         })
//     //       }
//     //     }
//     //   }
//     // })
//     for (let i = 0; i <= duration; i++) {
//       let thisDay = startWeekOfMonth.clone().add(i, "day")

//       const bar =
//         formattedNADates.find(
//           (item) => item.start === thisDay.format("YYYY-MM-DD")
//         ) ?? null
//       let elementBar = ""
//       if (bar) {
//         elementBar = (
//           <div
//             key={bar.start}
//             className="non-availability"
//             style={{
//               width: `calc(${bar.length * 100}% - 8px)`,
//             }}
//             onClick={(e) => {
//               e.stopPropagation()
//               setAction("edit")
//             }}
//           >
//             <p className="reason" title={bar.reason}>
//               {bar.reason}
//             </p>
//           </div>
//         )
//       }
//       calendarElementTemp.push(
//         <div
//           key={thisDay.format("YYYY-MM-DD")}
//           className={`calendar-day${dayjs(thisDay).isToday() ? " today" : ""}${
//             isSameMonth(thisDay) ? "" : " empty-day"
//           }`}
//         >
//           <p>{thisDay.format("DD")}</p>
//           {elementBar}
//         </div>
//       )
//     }
//     setCalendarElement(calendarElementTemp)
//   }, [date])

//   return (
//     <Grid container spacing={2} mt={3}>
//       <Grid item xs={2}>
//         <CalendarAutocomplete type={type} changeAttr={changeAttr} />
//       </Grid>
//       <Grid item xs={10}>
//         {/* <pre>{JSON.stringify(calendarData?.[0], null, 2)}</pre> */}
//         <div className="calendar-month-grid">
//           {daysOfWeek.map((day, index) => (
//             <div
//               key={day}
//               className={`day-name${
//                 index === dayjs().day() &&
//                 isSameMonth(dayjs()) &&
//                 isSameYear(dayjs())
//                   ? " today"
//                   : ""
//               }`}
//             >
//               <p>{day.toUpperCase()}</p>
//             </div>
//           ))}
//           {calendarElement}
//         </div>
//       </Grid>
//     </Grid>
//   )
// }

// export default CalendarMonth
