import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Pages404 = () => {
  const navigate = useNavigate()
	return (
		<>
			<h2>404: Page Not Found</h2>
			<Button variant="contained" onClick={() => navigate('/')}>
				Back To Home Page
			</Button>
		</>
	);
};

export default Pages404;
