import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import DateValidation from "./pages/DateValidation";
import FilePreview from "./pages/FilePreview";
import HorizontalLinearStepper from "./pages/HorizontalLinearStepper";
import ImportExcelPage from "./pages/ImportExcel/Index";
import Loading from "./pages/Loading";
import MinimumNotice from "./pages/MinimumNotice";
import NonAvailability from "./pages/NonAvailability";
import Pages404 from "./pages/Pages404";
import TesRender from "./pages/TesRender";
import ImportExcel from "./pages/ImportExcel";
// import Calendar from './pages/Calendar/Calendar';

const App = () => {
  // return <HorizontalLinearStepper />;
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HorizontalLinearStepper />} />
        <Route path="/non-availability" element={<NonAvailability />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/tes" element={<TesRender />} />
        <Route path="/file-preview" element={<FilePreview />} />
        <Route path="/min-notice" element={<MinimumNotice />} />
        <Route path="/date-validation" element={<DateValidation />} />
        <Route path="/import" element={<ImportExcelPage />} />
        <Route path="/import-excel" element={<ImportExcel />} />
        <Route path="*" element={<Pages404 />} />
      </Routes>
    </Router>
  );
};

export default App;
