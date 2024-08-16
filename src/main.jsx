import { ThemeProvider, createTheme } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from "react";
import ReactDOM from "react-dom/client";
import { useRoutes } from "react-router-dom";
import "./index.css";
import { router } from "./routes/index.jsx";
import App from "./App";

const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

// export const router = createBrowserRouter([
// 	{ path: '/', element: <HorizontalLinearStepper /> },
// 	{ path: '/non-availability', element: <NonAvailability /> },
// 	{ path: '/loading', element: <Loading /> },
// 	{ path: '/tes', element: <TesRender /> },
// 	{ path: '/file-preview', element: <FilePreview /> },
// 	{ path: '/min-notice', element: <MinimumNotice /> },
// 	{ path: '/date-validation', element: <DateValidation /> },
// 	{ path: '*', element: <Pages404 /> },
// ]);
// const allElement = useRoutes(router);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    {/* </LocalizationProvider> */}
  </React.StrictMode>
);
