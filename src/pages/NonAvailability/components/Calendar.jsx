import React, { useState } from 'react';
import './Calendar.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import FormNonAvailability from './FormNonAvailability';
import moment from 'moment/moment';

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
		return day + 1 === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
	};
	const addNonAvailability = (formValue) => {
		// Implement your logic to handle non-availability here
		console.log('Added non-availability for', formValue);
		closeDialog();
	};

	const startDatesNonAvailability = NonAvailability[0].dates.startDateTime;
	const endDatesNonAvailability = NonAvailability[0].dates.endDateTime;
	const startDayDate = moment(startDatesNonAvailability).format('D');
	const endDayDate = moment(endDatesNonAvailability).format('D');
	const lengthNonAvailability = endDayDate - startDayDate + 1;
	const startMonth = moment(startDatesNonAvailability).format('M');
	const startYear = moment(startDatesNonAvailability).format('Y');
	const endMonth = moment(endDatesNonAvailability).format('M');
	const endYear = moment(endDatesNonAvailability).format('Y');
	const totalEmptyDays = firstDayOfMonth;

	function splitRange(start, end, emptyDays) {
		const DEFAULT_CROSS_NUMBER = [6, 13, 20, 27, 34];
		const CROSS_POSITION = DEFAULT_CROSS_NUMBER.map((position) => position - totalEmptyDays);
		const adjustStart = start - 1;
		const adjustEnd = end - 1;
		const ranges = [];
		const maxPosition = adjustStart + lengthNonAvailability - 1;
		const currentPosition = CROSS_POSITION.filter((position) => position >= adjustStart && position <= adjustEnd);
		if (currentPosition.length === 0) {
			ranges.push({ start: adjustStart, end: adjustEnd });
		}
		if (currentPosition[currentPosition.length - 1] < adjustEnd) {
			currentPosition.push(adjustEnd);
		}
		currentPosition.map((item, index, array) => ranges.push({ start: index === 0 ? adjustStart : array[index - 1] + 1, end: item }));
		return ranges;
	}

	function generateRanges(originalRange, emptyDays) {
		const { startDateTime, endDateTime } = originalRange;
		const startDate = parseInt(moment(startDateTime).format('D'));
		const endDate = parseInt(moment(endDateTime).format('D'));
		const ranges = splitRange(startDate, endDate, emptyDays);
		return ranges;
	}

	const generatedRanges =
		parseInt(startMonth) === date.getMonth() + 1 && parseInt(startYear) === date.getFullYear()
			? generateRanges(NonAvailability[0].dates, totalEmptyDays)
			: [];

	const dataRendered = NonAvailability[1].nonAvailability.map((item) => ({
		...item,
		generatedRanges: generateRanges(item.dates, totalEmptyDays),
	}));
	console.log('🚀 ~ file: Calendar.jsx:88 ~ Calendar ~ dataRendered:', dataRendered);

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
			<p>Start Time: {startDatesNonAvailability}</p>
			<p>startDayDate: {startDayDate ?? 'empty'}</p>
			<p>End Time: {endDatesNonAvailability}</p>
			<p>endDayDate: {endDayDate ?? 'empty'}</p>
			<p>length: {lengthNonAvailability ?? 'empty'}</p>
			<p>date getMonth: {date.getMonth() + 1}</p>
			<p>start date getMonth: {startMonth}</p>
			<p>end date getMonth: {endMonth}</p>
			<p>Total Empty Days: {totalEmptyDays}</p>
			<p>Total Empty Days: {firstDayOfMonth}</p>
			<p>Total Empty Days: {...Array(firstDayOfMonth).keys()}</p>
			<p>start Year: {startYear}</p>
			<p>end Year: {endYear}</p>
			<p>{JSON.stringify(generatedRanges)}</p>
			{/* <div className="calendar-grid">{dates}</div> */}
			<div className="calendar-grid">
				{daysOfWeek.map((day) => (
					<div key={day} className="day-name">
						{day.toUpperCase()}
					</div>
				))}
				{[...Array(firstDayOfMonth).keys()].map((i) => (
					<div key={i} className="empty-day"></div>
				))}
				{[...Array(daysInMonth).keys()].map((day, index) => (
					<div key={day} className={`calendar-day ${isToday(day) ? 'today' : ''}`} onClick={openDialog}>
						<p>{day + 1}</p>
						{/* render Non Availability */}

						{dataRendered.map((shift) =>
							shift.generatedRanges.map((range, rangeIndex) => {
								return (
									index === parseInt(range.start) && (
										<div
											key={range.start}
											className="non-availability"
											style={{
												width: `calc(${(range.end - range.start + 1) * 100}% - 10px + ${
													(rangeIndex === 0 || range.start < 6 - totalEmptyDays ? range.end - range.start - 1 : range.end - range.start) * 2
												}px)`,
											}}
											onClick={(e) => {
												e.stopPropagation();
												alert('tes');
											}}
										>
											{shift.reason}
										</div>
									)
								);
							})
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
