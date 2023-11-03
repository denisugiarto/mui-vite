import { Grid, Tab } from '@mui/material';
import Calendar from './components/Calendar';
import CrewList from './CrewList';
import FakeData from './NonAvailibility.json';
import ErrorBoundary from '../../components/ErrorBoundary';

const ErrorBoundary2 = ({ children }) => {
	try {
		return <div>{children}</div>;
	} catch (error) {
		return 'Error';
	}
};

const NonAvailability = () => {
	return (
		<>
			<div>NonAvailability</div>
			<ErrorBoundary>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<CrewList />
					</Grid>
					<Grid item xs={8}>
						<Calendar NonAvailability={FakeData} />
					</Grid>
				</Grid>
			</ErrorBoundary>
		</>
	);
};

export default NonAvailability;
