import { Grid, Tab } from '@mui/material';
import Calendar from './components/Calendar';
import CrewList from './CrewList';
import FakeData from './NonAvailibility.json';

const NonAvailability = () => {
	return (
		<>
			<div>NonAvailability</div>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<CrewList />
				</Grid>
				<Grid item xs={8}>
					<Calendar NonAvailability={FakeData} />
				</Grid>
			</Grid>
		</>
	);
};

export default NonAvailability;
