import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

const CrewList = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const tabHandleChange = (_event, newTab) => {
		console.log('🚀 ~ file: CrewList.jsx:7 ~ tabHandleChange ~ newTab:', newTab);
		setCurrentTab(newTab);
	};
	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Tabs value={currentTab} onChange={tabHandleChange} aria-label="basic tabs example">
				<Tab label="Pilot" />
				<Tab label="Tug" />
				<Tab label="Pilot Boat / Logistics" />
			</Tabs>
		</Box>
	);
};

export default CrewList;
