import React, { useState } from 'react';
import './Calendar.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import FormNonAvailability from './FormNonAvailability';

const Calendar = ({ NonAvailability }) => {
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
	const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
	const today = new Date();
	const currentDate = new Date(date.getFullYear(), date.getMonth());
	const isToday = (day) => {
		return day + 1 === today.getDate() && date.getMonth() === today.getMonth();
	};
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
				{[...Array(daysInMonth).keys()].map((day, index) => (
					<div key={day} className={`calendar-day ${isToday(day) ? 'today' : ''}`} onClick={openDialog}>
						<p>{day + 1}</p>
						{( index === 4) && (
							<div className="non-availibity" style={{ width: '200%' }} onClick={(e) => {
								e.stopPropagation()
								alert('tes')
							} 
						}>
								tes
							</div>
						)}
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
