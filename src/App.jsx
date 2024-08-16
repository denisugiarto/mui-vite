import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Loading from "./pages/Loading";
// import NonAvailability from "./pages/NonAvailability";
import Pages404 from "./pages/Pages404";
import CalculateDuration from "./pages/CalculateDuration";
// import TesRender from "./pages/TesRender";
// import Calendar from './pages/Calendar/Calendar';

const App = () => {
  // return <HorizontalLinearStepper />;
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CalculateDuration />} />
        {/* <Route path="/non-availability" element={<NonAvailability />} /> */}
        <Route path="/loading" element={<Loading />} />
        {/* <Route path="/tes" element={<TesRender />} /> */}
        {/* <Route path="/file-preview" element={<FilePreview />} />
        <Route path="/min-notice" element={<MinimumNotice />} />
        <Route path="/date-validation" element={<DateValidation />} />
        <Route path="/import" element={<ImportExcelPage />} />
        <Route path="/import-excel" element={<ImportExcel />} /> */}
        <Route path="*" element={<Pages404 />} />
      </Routes>
    </Router>
  );
};

export default App;
