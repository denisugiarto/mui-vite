import { Box, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
	const navigate = useNavigate();
	return (
		<Dialog open={true} fullWidth={true} maxWidth={'xl'} onClick={() => navigate('/')}>
			<DialogContent>
				<Box display="flex" flexDirection="column" height={'80vh'} justifyContent="center" alignItems="center">
					<Typography mb={2}>This will only take a moment. Please wait...</Typography>
					<CircularProgress />
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default Loading;
