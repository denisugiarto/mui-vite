import HorizontalLinearStepper from './pages/HorizontalLinearStepper';
import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NonAvailability from './pages/NonAvailability';
import Pages404 from './pages/Pages404';
import Header from './components/Header';
import Loading from './pages/Loading';
import TesRender from './pages/TesRender';
import FilePreview from './pages/FilePreview';
import MinimumNotice from './pages/MinimumNotice';
import DateValidation from './pages/DateValidation';
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
				<Route path="*" element={<Pages404 />} />
			</Routes>
		</Router>
	);
};

export default App;
