import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DateValidation from "../pages/DateValidation";
import FilePreview from "../pages/FilePreview";
import CalculateDuration from "../pages/CalculateDuration";
import Loading from "../pages/Loading";
import MinimumNotice from "../pages/MinimumNotice";
// import NonAvailability from "../pages/NonAvailability/NonAvailability";
import Pages404 from "../pages/Pages404";
// import TesRender from "../pages/TesRender";
import ImportExcel from "../pages/ImportExcel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <CalculateDuration /> },
      // { path: "/non-availability", element: <NonAvailability /> },
      { path: "/loading", element: <Loading /> },
      // { path: "/tes", element: <TesRender /> },
      // { path: "/file-preview", element: <FilePreview /> },
      // { path: "/min-notice", element: <MinimumNotice /> },
      // { path: "/date-validation", element: <DateValidation /> },
      // { path: "/import", element: <DateValidation /> },
      // { path: "/import-excel", element: <ImportExcel /> },
      { path: "*", element: <Pages404 /> },
    ],
  },
]);
