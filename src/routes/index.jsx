import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import DateValidation from '../pages/DateValidation';
import FilePreview from '../pages/FilePreview';
import HorizontalLinearStepper from '../pages/HorizontalLinearStepper';
import Loading from '../pages/Loading';
import MinimumNotice from '../pages/MinimumNotice';
import NonAvailability from '../pages/NonAvailability/NonAvailability';
import Pages404 from '../pages/Pages404';
import TesRender from '../pages/TesRender';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HorizontalLinearStepper /> },
			{ path: '/non-availability', element: <NonAvailability /> },
			{ path: '/loading', element: <Loading /> },
			{ path: '/tes', element: <TesRender /> },
			{ path: '/file-preview', element: <FilePreview /> },
			{ path: '/min-notice', element: <MinimumNotice /> },
			{ path: '/date-validation', element: <DateValidation /> },
			{ path: '*', element: <Pages404 /> },
		],
	},
]);
