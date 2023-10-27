import React, { useState } from 'react';
import './Calendar.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import FormNonAvailability from './FormNonAvailability';
const Calendar = () => {
	const [date, setDate] = useState(new Date());
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const openDialog = (date) => {
		setSelectedDate(date); // Assuming you have a 'selectedDate' state for the currently selected date
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const getDaysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getMonthName = (month) => {
		const options = { month: 'long' };
		return new Intl.DateTimeFormat('en-US', options).format(new Date(2023, month, 1));
	};

	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	console.log('🚀 ~ file: Calendar.jsx:31 ~ Calendar ~ firstDayOfMonth:', firstDayOfMonth);

	const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
	const today = new Date();
	console.log('🚀 ~ file: Calendar.jsx:35 ~ Calendar ~ today:', today);
	const currentDate = new Date(date.getFullYear(), date.getMonth());
	console.log('🚀 ~ file: Calendar.jsx:37 ~ Calendar ~ currentDate:', currentDate);
	const isToday = currentDate.toDateString() === today.toDateString();
	const addNonAvailability = (formValue) => {
		// Implement your logic to handle non-availability here
		console.log('Added non-availability for', formValue);
		closeDialog();
	};

	return (
		<div>
			<div className="calendar-header">
				<button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
					<ChevronLeft />
				</button>
				<h2>
					{getMonthName(date.getMonth())} {date.getFullYear()}
				</h2>
				<button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
					<ChevronRight />
				</button>
			</div>
			{/* <div className="calendar-grid">{dates}</div> */}
			<div className="calendar-grid">
				{daysOfWeek.map((day) => (
					<div key={day} className="day-name">
						{day}
					</div>
				))}
				{[...Array(firstDayOfMonth).keys()].map((i) => (
					<div key={i} className="empty-day"></div>
				))}
				{[...Array(daysInMonth).keys()].map((day) => (
					<div key={day} className={`calendar-day ${isToday ? 'today' : ''}`} onClick={openDialog}>
						{day + 1}
					</div>
				))}
			</div>
			{isDialogOpen && (
				<FormNonAvailability
					isDialogOpen={isDialogOpen}
					closeDialog={closeDialog}
					formSubmitHandler={(formValue) => addNonAvailability(formValue)}
				/>
			)}
		</div>
	);
};

export default Calendar;
