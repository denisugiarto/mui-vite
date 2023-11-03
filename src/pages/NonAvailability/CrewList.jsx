import { Box, List, ListItem, ListItemText, ListSubheader, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

const crewData = [
	{
		name: 'James',
	},
	{
		name: 'Edward',
	},
	{
		name: 'Holland',
	},
	{
		name: 'Dave',
	},
];

const CrewList = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const [selectedCrew, setSelectedCrew] = useState(0);
	const tabHandleChange = (_event, newTab) => {
		console.log('🚀 ~ file: CrewList.jsx:7 ~ tabHandleChange ~ newTab:', newTab);
		setCurrentTab(newTab);
	};
	const selectedCrewHandleChange = (_event, selectedCrew) => {
		setSelectedCrew(selectedCrew);
	};
	return (
		<Box>
			<Tabs value={currentTab} onChange={tabHandleChange} aria-label="basic tabs example">
				<Tab label="Pilot" />
				<Tab label="Tug" />
				<Tab label="Pilot Boat / Logistics" />
			</Tabs>
			<div>
				<Typography variant="subtitle1">List of Pilot</Typography>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={selectedCrew}
					onChange={selectedCrewHandleChange}
					aria-label="Vertical tabs example"
					sx={{ borderRight: 1, borderColor: 'divider' }}
				>
					{crewData.map((item) => (
						<Tab key={`item-${item.name}`} label={item.name} sx={{ alignItems: 'start' }} />
					))}
				</Tabs>
			</div>
		</Box>
	);
};

export default CrewList;
