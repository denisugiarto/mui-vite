import moment from 'moment';
import React from 'react';
import { Scheduler } from "@aldabil/react-scheduler";

const TesRender = () => {
	function generateSchedule(before) {
		const { startDateTime, endDateTime } = before;

		const startDate = moment(startDateTime);
		const endDate = moment(endDateTime);

		const result = {};

		while (startDate.isBefore(endDate) || startDate.isSame(endDate, 'day')) {
			const yearMonth = startDate.format('YYYY-MM');
			const startOfWeek = startDate.clone().startOf('week').isoWeekday(0);
			const endOfWeek = startDate.clone().endOf('week').isoWeekday(6);

			const start = Math.max(startDate.date(), startOfWeek.date());
			const end = Math.min(endDate.date(), endOfWeek.date());

			if (!result[yearMonth]) {
				result[yearMonth] = [];
			}

			result[yearMonth].push({ start, end });

			startDate.add(1, 'week');
		}

		return result;
	}

	const before = {
		startDateTime: '2023-10-23',
		endDateTime: '2023-11-7',
	};

	const result = generateSchedule(before);
	console.log(result);

	return (
		<div>
			<h3>From : {JSON.stringify(before)}</h3>
			<h3>{JSON.stringify(result)}</h3>
			<Scheduler
				view="month"
				events={[
					{
						event_id: 1,
						title: 'Event 1',
						start: new Date('2021/5/2 09:30'),
						end: new Date('2021/5/2 10:30'),
					},
					{
						event_id: 2,
						title: 'Event 2',
						start: new Date('2021/5/4 10:00'),
						end: new Date('2021/5/4 11:00'),
					},
				]}
			/>
		</div>
	);
};

export default TesRender;
