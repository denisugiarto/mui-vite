// import * as React from "react"
// import TextField from "@mui/material/TextField"
// import Autocomplete from "@mui/material/Autocomplete"

// const personnel = [
//   { label: "Personnel", value: "personnel" },
//   { label: "Team", value: "team" },
// ]
// export default function CalendarAutocomplete({
//   type = "personnel",
//   changeAttr = () => {},
// }) {
//   const handleChange = (e, v) => {
//     changeAttr({ type: v?.value })
//   }
//   return (
//     <Autocomplete
//       onChange={handleChange}
//       disablePortal
//       options={personnel}
//       defaultValue={personnel[0]}
//       disableClearable
//       getOptionLabel={(option) => option.label}
//       renderInput={(params) => <TextField {...params} label="Filter" />}
//     />
//   )
// }
