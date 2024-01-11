// import React, { useEffect, useState } from 'react';
// import './CalendarCal.css';
// import CalendarTable from './CalendarTable';
// import moment from 'moment';

// import CalendarMonth from './CalendarMonth';
// import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// import dayjs from 'dayjs';
// import { getCalendarShift } from '../../lib/services/adapter';

// export default function Calendar() {
// 	const defaultMode = {
// 		mode: 'week',
// 		date: {
// 			startDate: moment().day(0).format('YYYY-MM-DD 00:00:00'), //
// 			endDate: moment().day(6).format('YYYY-MM-DD 23:59:59'), //
// 			isToday: true,
// 		},
// 		dateState: 0,
// 		type: 'personnel',
// 		keyword: null,
// 	};
// 	const defaultDate = {
// 		startDateTime: '2020-01-01 00:00:00',
// 		endDateTime: '2020-01-07 00:00:00',
// 	};

// 	const [attr, setAttr] = useState(defaultMode);
// 	const [calendarData, setCalendarData] = useState([]);

// 	const calculateWeekRange = (dateInput) => {
// 		const inputDate = moment(dateInput, 'YYYY-MM-DD HH:mm:ss');
// 		const weekStart = inputDate.clone().startOf('week');
// 		const weekEnd = inputDate.clone().endOf('week');
// 		const today = moment();

// 		const result = {
// 			startDate: weekStart.format('YYYY-MM-DD 00:00:00'),
// 			endDate: weekEnd.format('YYYY-MM-DD 23:59:59'),
// 			isToday: today.isBetween(weekStart, weekEnd, null, '[]'),
// 		};

// 		return result;
// 	};

// 	const calculateMonthRange = (dateInput) => {
// 		const inputDate = moment(dateInput, 'YYYY-MM-DD HH:mm:ss');
// 		const monthStart = inputDate.clone().startOf('month');
// 		const monthEnd = inputDate.clone().endOf('month');
// 		const today = moment();

// 		const result = {
// 			startDate: monthStart.format('YYYY-MM-DD 00:00:00'),
// 			endDate: monthEnd.format('YYYY-MM-DD 23:59:59'),
// 			isToday: today.isBetween(monthStart, monthEnd, null, '[]'),
// 		};

// 		return result;
// 	};

// 	const isDateToday = (dateTimeInput) => {
// 		const inputDate = moment(dateTimeInput, 'YYYY-MM-DD HH:mm:ss');
// 		const today = moment();

// 		return inputDate.isSame(today, 'day'); // Memeriksa apakah tanggal sama dengan hari ini
// 	};

// 	const handleChangeMode = (mode) => {
// 		let startDateNew = null;
// 		let endDateNew = null;
// 		let isToday = false;
// 		if (mode === 'day') {
// 			// when click days then get the start date, set endDate same with startDate, check if today then picker should be today too as label and send startDate until endDate to child
// 			// startDateNew = attr?.date?.startDate
// 			startDateNew = moment().format('YYYY-MM-DD 00:00:00');
// 			endDateNew = moment().format('YYYY-MM-DD 23:59:59');
// 			isToday = isDateToday(startDateNew);
// 		} else if (mode === 'week') {
// 			// when click week, get startDate, find the date of sun from this date and set endDate as 7 days after startDate in sun
// 			// let range = calculateWeekRange(attr?.date?.startDate)
// 			let range = calculateWeekRange(moment().format('YYYY-MM-DD 00:00:00'));
// 			startDateNew = range?.startDate ?? null;
// 			endDateNew = range?.endDate ?? null;

// 			isToday = range?.isToday ?? false;
// 		} else if (mode === 'month') {
// 			// let range = calculateMonthRange(attr?.date?.startDate)
// 			let range = calculateMonthRange(moment().format('YYYY-MM-DD 00:00:00'));
// 			startDateNew = range?.startDate ?? null;
// 			endDateNew = range?.endDate ?? null;
// 			isToday = range?.isToday ?? false;
// 		}

// 		let newAttr = {
// 			mode: mode,
// 			date: {
// 				startDate: startDateNew,
// 				endDate: endDateNew,
// 				isToday: isToday,
// 			},
// 		};
// 		// console.log(newAttr)
// 		setAttr((p) => ({ ...p, ...newAttr }));
// 	};

// 	const handleChangeNav = (direction) => {
// 		if (direction === 'next') {
// 			if (attr?.mode === 'day') {
// 				let startDateNew = moment(attr.date.startDate).add(1, 'days').format('YYYY-MM-DD 00:00:00');
// 				let endDateNew = moment(attr.date.startDate).add(1, 'days').format('YYYY-MM-DD 23:59:59');
// 				let isToday = isDateToday(startDateNew);

// 				setAttr((p) => ({
// 					...p,
// 					date: {
// 						startDate: startDateNew,
// 						endDate: endDateNew,
// 						isToday: isToday,
// 					},
// 				}));
// 			} else if (attr?.mode === 'week') {
// 				let nextSunday = moment(attr?.date.startDate, 'YYYY-MM-DD HH:mm:ss').day(7);
// 				let range = calculateWeekRange(nextSunday);

// 				setAttr((p) => ({
// 					...p,
// 					date: {
// 						startDate: range.startDate,
// 						endDate: range.endDate,
// 						isToday: range.isToday,
// 					},
// 				}));
// 			} else if (attr?.mode === 'month') {
// 				let nextMonth = moment(attr?.date.startDate, 'YYYY-MM-DD HH:mm:ss').add(1, 'month').date(1);
// 				let range = calculateMonthRange(nextMonth);

// 				setAttr((p) => ({
// 					...p,
// 					date: {
// 						startDate: range.startDate,
// 						endDate: range.endDate,
// 						isToday: range.isToday,
// 					},
// 				}));
// 			}
// 		} else if (direction === 'back') {
// 			if (attr?.mode === 'day') {
// 				let startDateNew = moment(attr.date.startDate).subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
// 				let endDateNew = moment(attr.date.startDate).subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
// 				let isToday = isDateToday(startDateNew);

// 				setAttr((p) => ({
// 					...p,
// 					date: {
// 						startDate: startDateNew,
// 						endDate: endDateNew,
// 						isToday: isToday,
// 					},
// 				}));
// 			} else if (attr?.mode === 'week') {
// 				let beforeSunday = moment(attr?.date.startDate, 'YYYY-MM-DD HH:mm:ss').subtract(7, 'days');
// 				let range = calculateWeekRange(beforeSunday);

// 				setAttr((p) => ({
// 					...p,
// 					date: {
// 						startDate: range.startDate,
// 						endDate: range.endDate,
// 						isToday: range.isToday,
// 					},
// 				}));
// 			} else if (attr?.mode === 'month') {
// 				let beforeMonth = moment(attr?.date.startDate, 'YYYY-MM-DD HH:mm:ss').subtract(1, 'month').date(1);
// 				let range = calculateMonthRange(beforeMonth);

// 				setAttr((p) => ({
// 					...p,
// 					date: {
// 						startDate: range.startDate,
// 						endDate: range.endDate,
// 						isToday: range.isToday,
// 					},
// 				}));
// 			}
// 		}
// 	};

// 	// useEffect(() => {
// 	//   console.log("============ ATTR ============")
// 	//   console.log(attr)
// 	//   console.log(" ")
// 	//   console.log("  ")
// 	// }, [attr])

// 	const generateDateLabel = (startDateStr, endDateStr) => {
// 		// Parse the start and end dates
// 		const startDate = moment(startDateStr, 'YYYY-MM-DD HH:mm:ss');
// 		const endDate = moment(endDateStr, 'YYYY-MM-DD HH:mm:ss');

// 		// Check if both dates are in the same month and year
// 		if (startDate.isSame(endDate, 'month') && startDate.isSame(endDate, 'year')) {
// 			return `${startDate.format('DD')} - ${endDate.format('DD MMM YY')}`;
// 		}

// 		// Check if both dates are in the same year
// 		if (startDate.isSame(endDate, 'year')) {
// 			return `${startDate.format('DD MMM')} - ${endDate.format('DD MMM YY')}`;
// 		}

// 		// If the dates are in different years
// 		return `${startDate.format('DD MMM YY')} - ${endDate.format('DD MMM YY')}`;
// 	};

// 	let labelToday = '';

// 	if (attr?.mode === 'day') {
// 		if (attr?.date?.isToday) {
// 			labelToday = 'Today';
// 		} else {
// 			labelToday = moment(attr?.date?.startDate, 'YYYY-MM-DD HH:mm:ss').format('Do MMM YY');
// 		}
// 	} else if (attr?.mode === 'week') {
// 		if (attr?.date?.isToday) {
// 			labelToday = 'This Week';
// 		} else {
// 			labelToday = generateDateLabel(attr?.date?.startDate, attr?.date?.endDate);
// 		}
// 	} else if (attr?.mode === 'month') {
// 		if (attr?.date?.isToday) {
// 			labelToday = 'This Month';
// 		} else {
// 			labelToday = dayjs(attr?.date?.startDate).format('MMM YY');
// 		}
// 	}

// 	let timeout;
// 	const minimalisDebounce = (callback = () => {}, milisecond = 1000) => {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => {
// 			callback();
// 		}, milisecond);
// 	};
// 	const handleSearch = (e) => {
// 		let keyword = e?.target?.value ?? null;
// 		minimalisDebounce(() => handleChangeAttr({ keyword: keyword }), 1200);
// 	};

// 	const handleChangeAttr = (newVal = {}) => {
// 		setAttr((p) => ({ ...p, ...newVal }));
// 	};

// 	const handleGetCalendar = () => {
// 		let startDateAPI = moment(attr?.date?.startDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
// 		let endDateAPI = moment(attr?.date?.endDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
// 		getCalendarShift(attr?.type, startDateAPI, endDateAPI, attr?.keyword)
// 			.then((res) => {
// 				setCalendarData(res?.data ?? []);
// 			})
// 			.catch((err) => {});
// 	};

// 	useEffect(() => {
// 		handleGetCalendar();
// 	}, [attr]);

// 	return (
// 		<>
// 			<div className="RCalendar-navbar">
// 				<div className="RCalendar-navbar-item"></div>
// 				<div className="RCalendar-navbar-item">
// 					<div className="RCalendar-navbar-item-middle">
// 						<div className="RCalendar-middle-button">
// 							<div
// 								onClick={() => handleChangeMode('day')}
// 								className={`RCalendar-middle-button-item${attr.mode === 'day' ? ' active' : ''}`}
// 							>
// 								Day
// 							</div>
// 							<div
// 								onClick={() => handleChangeMode('week')}
// 								className={`RCalendar-middle-button-item${attr.mode === 'week' ? ' active' : ''}`}
// 							>
// 								Week
// 							</div>
// 							<div
// 								onClick={() => handleChangeMode('month')}
// 								className={`RCalendar-middle-button-item${attr.mode === 'month' ? ' active' : ''}`}
// 							>
// 								Month
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="RCalendar-navbar-item">
// 					<div className="RCalendar-navbar-item-right">
// 						<div className="RCalendar-button-navdate" onClick={() => handleChangeNav('back')}>
// 							<ChevronLeft />
// 						</div>
// 						<div className="RCalendar-date-label">{labelToday}</div>
// 						<div className="RCalendar-button-navdate" onClick={() => handleChangeNav('next')}>
// 							<ChevronRight />
// 						</div>

// 						<div className="RCalendar-search-box">Search</div>
// 					</div>
// 				</div>
// 			</div>
// 			{attr?.mode === 'month' ? (
// 				<CalendarMonth
// 					startDateTime={attr?.date?.startDate ?? null}
// 					endDateTime={attr?.date?.endDate ?? null}
// 					calendarData={calendarData}
// 					type={attr?.type}
// 					changeAttr={handleChangeAttr}
// 				/>
// 			) : (
// 				<CalendarTable
// 					startDateTime={attr?.date?.startDate ?? null}
// 					endDateTime={attr?.date?.endDate ?? null}
// 					mode={attr?.mode}
// 					type={attr?.type}
// 					calendarData={calendarData}
// 					changeAttr={handleChangeAttr}
// 				/>
// 			)}
// 		</>
// 	);
// }
