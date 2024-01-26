import React, { useEffect, useRef, useState } from 'react';
import SessionStorage from '../../utils/SessionStorage';
import { GetAllMRM } from '../../utils/adapter';
const token =
	'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVcC1tbDc4OE43SjZpV1gwT295MEhjNGQta0dzWm1VLUVmVjhtMHRxRkRRIn0.eyJleHAiOjE3MDQ5ODI2NjgsImlhdCI6MTcwNDkzOTQ2OCwianRpIjoiMzkxM2MxNGItMjFkMi00ZjNhLWJlNDgtNDU1ZjI0YmQ2MTEwIiwiaXNzIjoiaHR0cDovL3RlbmFudDA2LWtleWNsb2FrLnRlbmFudDA2OjgwODAvYXV0aC9yZWFsbXMvbWFyaW5lbSIsImF1ZCI6InJlYWxtLW1hbmFnZW1lbnQiLCJzdWIiOiI4ZDEzNTU5MS03YmYyLTQxYmUtYTE4My02YzFmYTI4Y2U4NWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtYXJpbmVtLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiJhM2YxNDdkOC1iZWU5LTQ0ZDctYWQ4MC05ZGM1ZGVkYjc4NzUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiT1BFUkFUT1IiLCJvZmZsaW5lX2FjY2VzcyIsIk1BTkFHRVIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIiwiVVNFUiIsIkFDQ09VTlRJTkciXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1hcmluZW0tY2xpZW50Ijp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIiwiTUFOQUdFUiIsIkFETUlOIiwiVVNFUiJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhM2YxNDdkOC1iZWU5LTQ0ZDctYWQ4MC05ZGM1ZGVkYjc4NzUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic3VwZXJhZG1pbkBtYXJpbmVtZGV2In0.W5kk1JoXsvNv9BJzUHnrhImEb0bD26Yu7tPZZQAnSPIVdZUaAStj-WBlglZYID_WA1rCBhEe8fpzaLBRPyYi3OUmHWFO4Bv46tywNK8za9zSVfepg8BAze-aeN5bHBzkaoWwowFOpcMOb4wPNhUFh2PZxdJRccqdrGVvO__kUuWwzB1y7L1gf-jEPaIut5i_HuciYal3FZ4s8vpnJOZuLDjitIl7pkVZK5WP7YQPu8c0IfP1UXT_RGTnIMH90xvAjtvy0QxjEf_4j6szppXlSc-Km4esY3fA-6vgPLXhGRqjaTVXBfE3tiR2Opq9ElKhilu5VOM9jQxQWF4_taJxIw';
export default function MinimumNotice() {
	const [minNoticeList, setMinNoticeList] = useState([]);
	const [fromDetail, setfromDetail] = useState({});
	const [selectedMinNotice, setselectedMinNotice] = useState({});
	const locationList = useRef([]);
	const fromId = 8;

	useEffect(() => {
		console.count('render top');
		SessionStorage.setStorage('uamData', { access_token: token });
		GetAllMRM('minimum-notice').then((res) => {
			console.log(res.data);
			return setMinNoticeList(res?.data);
		});
		GetAllMRM('location').then((res) => (locationList.current = res?.data));
	}, []);

	useEffect(() => {
		const selectedLocation = locationList.current.find((item) => item.id === fromId);
		setfromDetail(selectedLocation);
		console.count('render');

		/*
      find The minimum Notice base on location
      - locations include (ALL) for all locations
      - empty shipMovementTypes for all movements
      - empty reasonForVisits for all reasons
    */
		const minNoticeByLocation = minNoticeList.filter(
			(notice) => JSON.parse(notice.locations).includes(fromId) || JSON.parse(notice.locations)?.[0] === '(ALL)'
		);
		const minNoticeByMovementType = minNoticeByLocation.filter(
			(item) => JSON.parse(item.shipMovementTypes).includes('BERTHING') || JSON.parse(item.shipMovementTypes).length === 0
		);
		const minNoticeByReason = minNoticeByMovementType.find(
			(item) => JSON.parse(item?.reasonForVisits).includes('') || JSON.parse(item.reasonForVisits).length === 0
		);
		console.log("🚀 ~ useEffect ~ minNoticeByReason:", minNoticeByReason)
		setselectedMinNotice(minNoticeByReason);
	}, [locationList.current, fromId]);

	//add new
	return (
		<div>
			<h3>Minimum Notice</h3>
			{minNoticeList?.map((notice) => (
				<div key={notice.id} style={{ border: '1px solid red' }}>
					<p>
						{notice?.name} : {notice.minNotice}
					</p>
					<p>Locations : {notice.locations}</p>
					<p>reason : {notice.reasonForVisits}</p>
				</div>
			))}
			<h4>From id: {fromId}</h4>
			<p>Detail From</p>
			<p>{fromDetail?.name}</p>
			<p>Minimum Notice: {selectedMinNotice?.minNotice ?? 0}</p>
		</div>
	);
}
