// import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// import dayjs from 'dayjs';
// import React, { useEffect, useState } from 'react';
// import FormNonAvailability from './FormNonAvailability';
// import './Calendarku.css';
// const Calendar = ({ data }) => {
// 	const [date, setDate] = useState(dayjs());
// 	const [isDialogOpen, setIsDialogOpen] = useState(false);
// 	const [selectedDate, setSelectedDate] = useState(null);

// 	const openDialog = (date) => {
// 		setSelectedDate(date); // Assuming you have a 'selectedDate' state for the currently selected date
// 		setIsDialogOpen(true);
// 	};

// 	const closeDialog = () => {
// 		setIsDialogOpen(false);
// 	};

// 	const colorList = ['#33f', '#635dff', '#f00', '#4f2311', '#125500'];

// 	const dateRange = [
// 		'2023-12-01',
// 		'2023-12-02',
// 		'2023-12-03',
// 		'2023-12-04',
// 		'2023-12-05',
// 		'2023-12-06',
// 		'2023-12-07',
// 		'2023-12-08',
// 		'2023-12-09',
// 		'2023-12-10',
// 		'2023-12-11',
// 		'2023-12-12',
// 		'2023-12-13',
// 		'2023-12-14',
// 		'2023-12-15',
// 		'2023-12-16',
// 		'2023-12-17',
// 		'2023-12-18',
// 		'2023-12-19',
// 		'2023-12-20',
// 		'2023-12-21',
// 		'2023-12-22',
// 		'2023-12-23',
// 		'2023-12-24',
// 		'2023-12-25',
// 		'2023-12-26',
// 		'2023-12-27',
// 		'2023-12-28',
// 		'2023-12-29',
// 		'2023-12-30',
// 		'2023-12-31',
// 	];

// 	const dataCalendar = data?.map((x) => {
// 		let shiftBlockFormat = [];
// 		let formatDateComparasion = 'YYYY-MM-DD';
// 		let durationMode = 'days';

// 		for (let [i, y] of dateRange.entries()) {
// 			// find apakah tanggal ada didalam block
// 			let dateFind =
// 				x?.blocks?.find((z) => dayjs(z?.startDateTime).format(formatDateComparasion) === dayjs(y).format(formatDateComparasion)) ?? null;

// 			let blockFormatTemp = {
// 				startDateTime: null,
// 				endDateTime: null,
// 				length: 0,
// 			};

// 			if (dateFind) {
// 				// jika tanggal ada didalam blocks maka
// 				let startTemp = dayjs(dateFind?.startDateTime);
// 				let endTemp = dayjs(dateFind?.endDateTime);
// 				let duration = endTemp.diff(startTemp, durationMode);

// 				blockFormatTemp = {
// 					startDateTime: startTemp?.format(formatDateComparasion) ?? null,
// 					endDateTime: endTemp?.format(formatDateComparasion) ?? null,
// 					length: duration,
// 				};

// 				// if the value of duration from current date with now is 1 with before than delete this and update length + 1 in before
// 				// duration day is 15 minutes and 1 day for week and month
// 				let fineDurationBetweenTwoDates = 1;
// 				let startDateBefore = shiftBlockFormat?.[i - 1]?.startDateTime ?? null;
// 				if (startDateBefore) {
// 					let beforeDateCompare = dayjs(startDateBefore, formatDateComparasion);
// 					let currentDateCompare = dayjs(blockFormatTemp?.startDateTime, formatDateComparasion);
// 					let diffCompare = currentDateCompare.diff(beforeDateCompare, durationMode);
// 					if (diffCompare === fineDurationBetweenTwoDates) {
// 						// set parentIndex for current block format
// 						let parentIndexBefore = shiftBlockFormat[i - 1]?.parentIndex ?? i - 1;
// 						blockFormatTemp.parentIndex = parentIndexBefore;

// 						// set length from parentIndex and set 0 for this item
// 						shiftBlockFormat[parentIndexBefore].length = shiftBlockFormat[parentIndexBefore].length + 1;
// 						shiftBlockFormat[parentIndexBefore].endDateTime = blockFormatTemp.endDateTime;
// 						blockFormatTemp.length = 0;
// 					}
// 				}
// 			}
// 			shiftBlockFormat.push(blockFormatTemp);
// 		}

// 		// let shiftBlockFormat = x?.shift?.blocks?.map((y)=> dayjs.(y.startDateTime))
// 		let shiftTimeFormat = { ...x?.shift, blocks: shiftBlockFormat };
// 		return {
// 			...x,
// 			shift: shiftTimeFormat,
// 			name: x?.personnelName,
// 		};
// 	});
// 	console.log('🚀 ~ file: Calendar.jsx:115 ~ dataCalendar ~ dataCalendar:', dataCalendar);
// 	const dataFiltered = dataCalendar.map((shift) => {
// 		const filteredShift = shift?.shift?.blocks?.filter((item) => item.length > 0);
// 		return {
// 			...shift,
// 			shift: filteredShift,
// 		};
// 	});
// 	console.log('🚀 ~ file: Calendar.jsx:122 ~ dataFiltered ~ dataFiltered:', dataFiltered);

// 	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 	const today = dayjs();
// 	// const currentDate = new Date(date.getFullYear(), date.getMonth());
// 	const isToday = (day) => {
// 		return dayjs(day).format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
// 	};
// 	const isSameMonth = (inputDate) => {
// 		return dayjs(inputDate).format('MM') === date.format('MM');
// 	};
// 	const addNonAvailability = (formValue) => {
// 		// Implement your logic to handle non-availability here
// 		closeDialog();
// 	};

// 	const [calendarElement, setCalendarElement] = useState([]);

// 	useEffect(() => {
// 		const firstDayMonth = date.startOf('month');
// 		const startWeekOfMonth = firstDayMonth.startOf('week');
// 		const endOfMonth = date.endOf('month');
// 		const endWeekOfMonth = endOfMonth.endOf('week');
// 		const duration = endWeekOfMonth.diff(startWeekOfMonth, 'day');
// 		let calendarElementTemp = [];

// 		const formattedNADates = [];
// 		// dataFiltered.map((na, index) => {
// 			dataFiltered[0].shift?.map((date) => {
// 				const startDateShift = dayjs(date.startDateTime);
// 				const endDateShift = dayjs(date.endDateTime);
// 				const durationNA = endDateShift.diff(startDateShift, 'day') + 1;
// 				const endOfWeek = startDateShift.clone().endOf('week');
// 				const durationEndWeek = endOfWeek.diff(startDateShift, 'day') + 1;
// 				if (durationNA <= durationEndWeek) {
// 					formattedNADates.push({
// 						start: startDateShift.format('YYYY-MM-DD'),
// 						length: durationNA,
// 						reason: dataFiltered[0].name,
// 					});
// 				} else {
// 					formattedNADates.push({
// 						start: startDateShift.format('YYYY-MM-DD'),
// 						length: durationEndWeek,
// 						reason: dataFiltered[0].name,
// 					});

// 					let differenceDay = durationNA - durationEndWeek;
// 					const newStartDate = startDateShift.clone().add(durationEndWeek, 'day');
// 					for (let i = 0; i < differenceDay; i += 7) {
// 						const diffDayWithLastIndex = differenceDay - i;
// 						if (diffDayWithLastIndex < 7) {
// 							formattedNADates.push({
// 								start: newStartDate.add(i, 'day').format('YYYY-MM-DD'),
// 								length: diffDayWithLastIndex,
// 								reason: dataFiltered[0].name,
// 							});
// 						} else {
// 							formattedNADates.push({
// 								start: newStartDate.add(i, 'day').format('YYYY-MM-DD'),
// 								length: 7,
// 								reason: dataFiltered[0].name,
// 							});
// 						}
// 					}
// 				}
// 			});
// 		// });
// 		console.log("🚀 ~ file: Calendar.jsx:151 ~ useEffect ~ formattedNADates:", formattedNADates)

// 		for (let i = 0; i <= duration; i++) {
// 			let thisDay = startWeekOfMonth.clone().add(i, 'day');

// 			const bar =
// 				formattedNADates.filter((item) => {
// 					return dayjs(item.start).format('YYYY-MM-DD') === thisDay.format('YYYY-MM-DD');
// 				}) ?? null;

// 			let elementBar = '';
// 			if (bar) {
// 				elementBar = bar.map((item, index) => (
// 					<div
// 						key={item.start + index}
// 						className="non-availability"
// 						style={{
// 							width: `calc(${item.length * 100}% - 8px)`,
// 							backgroundColor: colorList[index],
// 						}}
// 						onClick={(e) => {
// 							e.stopPropagation();
// 							alert('tes');
// 						}}
// 					>
// 						<p className="reason" title={item.reason}>
// 							{item.reason}
// 						</p>
// 					</div>
// 				));
// 			}
// 			calendarElementTemp.push(
// 				<div
// 					key={thisDay.format('YYYY-MM-DD')}
// 					className={`calendar-day ${isToday(thisDay) ? 'today' : ''} ${isSameMonth(thisDay) ? '' : 'empty-day'}`}
// 					onClick={openDialog}
// 				>
// 					<p>{thisDay.format('DD')}</p>
// 					<div className="bar-wrapper">{elementBar}</div>
// 				</div>
// 			);
// 		}
// 		setCalendarElement(calendarElementTemp);
// 	}, [date]);

// 	return (
// 		<div>
// 			<div className="calendar-header">
// 				<button onClick={() => setDate((prev) => prev.subtract(1, 'month'))}>
// 					<ChevronLeft />
// 				</button>
// 				<h2>{date.format('MMMM YYYY')}</h2>
// 				<button onClick={() => setDate((prev) => prev.add(1, 'month'))}>
// 					<ChevronRight />
// 				</button>
// 			</div>
// 			<div className="calendar-grid">
// 				{daysOfWeek.map((day) => (
// 					<div key={day} className="day-name">
// 						{day.toUpperCase()}
// 					</div>
// 				))}
// 				{calendarElement}
// 			</div>
// 			{isDialogOpen && (
// 				<FormNonAvailability
// 					isDialogOpen={isDialogOpen}
// 					closeDialog={closeDialog}
// 					formSubmitHandler={(formValue) => addNonAvailability(formValue)}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default Calendar;
