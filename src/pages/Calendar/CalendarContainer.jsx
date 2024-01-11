// import React, { useEffect, useRef, useState } from "react"

// import { Box, IconButton, Tab, Tabs } from "@mui/material"
// import { useTheme } from "@mui/material/styles"

// import TabContainer from "../../components/TabContainer"
// import Calendar from "./Calendar"
// import { AntAppBar, AntTab, AntTabs } from "../../components/AntTabs"

// export default function CalendarContainer() {
//   const theme = useTheme()
//   return (
//     <div className="order-container">
//       <Box mt={5} mb={3}>
//         <AntAppBar position="static">
//           <AntTabs
//             aria-label="team tabs"
//             style={{
//               backgroundColor:
//                 theme.palette.type === "dark"
//                   ? theme.palette.secondary.light
//                   : "",
//               "& .form-control": {
//                 backgroundColor: "transparent",
//               },
//             }}
//           >
//             <AntTab />
//           </AntTabs>
//         </AntAppBar>
//         <TabContainer
//           sx={{
//             p: 3,
//             backgroundColor: theme.palette.mode === "dark" ? "#19374B" : "#fff",
//           }}
//         >
//           <Calendar />
//         </TabContainer>
//       </Box>
//     </div>
//   )
// }
