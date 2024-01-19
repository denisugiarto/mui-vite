import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import data from '../constant/minimum-notice.json';

export function useMinimumNotice(locationId, movementType = '', reason = '') {
	const [minNoticeList, setMinNoticeList] = useState([]);
	const [minimumDateTimeSRT, setMinimumDateTimeSRT] = useState('');
	const [minNotice, setMinNotice] = useState({});
	useEffect(() => {
		setMinNoticeList(data);
	}, []);

	useEffect(() => {
		const minNoticeByLocation = minNoticeList.filter(
			(notice) => JSON.parse(notice?.locations).includes(locationId) || JSON.parse(notice?.locations)?.[0] === '(ALL)'
		);
		console.log('🚀 ~ useEffect ~ minNoticeList:', minNoticeList);
		const minNoticeByMovementType = minNoticeByLocation.filter(
			(item) => JSON.parse(item?.shipMovementTypes).includes(movementType) || JSON.parse(item?.shipMovementTypes).length === 0
		);
		console.log('🚀 ~ useEffect ~ minNoticeByMovementType:', minNoticeByMovementType);
		const minNoticeByReason = minNoticeByMovementType.find(
			(item) => JSON.parse(item?.reasonForVisits).includes(reason) || JSON.parse(item?.reasonForVisits).length === 0
		);
		console.log('🚀 ~ useEffect ~ minNoticeByReason:', minNoticeByReason);
		setMinNotice(minNoticeByReason);
	}, [locationId, minNoticeList, movementType, reason]);

	useEffect(() => {
		const minimumDateTimeSRT = dayjs()
			.add(minNotice?.minNotice ?? 0, 'minutes')
			.format('YYYY-MM-DD HH:mm');
		setMinimumDateTimeSRT(minimumDateTimeSRT);
	}, [minNotice?.minNotice]);

	return [minNotice, minimumDateTimeSRT];
}
