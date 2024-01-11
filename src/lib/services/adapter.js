import axios from 'axios';
import {
	BE_NEW_API,
	PREFIX_MCM,
	PREFIX_MRM,
	PREFIX_MSM,
	PREFIX_MSRQ,
	PREFIX_MSRT,
	PREFIX_UAM,
	PREFIX_MSS,
	PREFIX_MCS,
	BASE_API_URL_V2,
	PREFIX_CARGO,
} from '../constants';
/**
 * @author wahyu fatur rizki (+62 822 7458 6011)
 * @return { obj }
 */

import DataService from '../DataService/data_service';

// import dataDashlet from "../../../../json/sourceDataDashlet.json"
import { END_POINT } from '../constants/api_constants';
import request from '../../utils/api_client';
import Storage from '../../components/SessionStorage';

export const getCustomerList = () => {
	const response = request({
		method: 'GET',
		url: '/mcm/api/v2/customer/get-all',
	});
	return response;
};

export const getCustomerContactList = () => {
	const response = request({
		method: 'GET',
		url: '/mcm/api/v2/contact-person/get-all',
	});
	return response;
};

export const searchCoustomerContact = (customerId) => {
	const response = request({
		method: 'GET',
		url: `/mcm/api/v2/customer/${customerId}`,
	});
	return response;
};

export const DeleteMCMSectionById = (id, section) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MCM + `/${section}/delete/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getCustomerDetail = (id) => {
	return request({
		method: 'GET',
		url: END_POINT.v1.get.customerContact + `?id=${id}`,
	});
};

// Get Tags
export const getTags = (name) => {
	return request({
		method: 'GET',
		url: END_POINT.v1.get.tags + `?search=${name}`,
	});
};

// Get MRM Port
export const getMrmPort = (code) => {
	return request({
		method: 'GET',
		url: END_POINT.v1.get.port + `?code=${code}`,
	});
};

// Get Pilot List
export const getPilotList = (surname) => {
	return request({
		method: 'GET',
		url: END_POINT.v1.get.pilot + `?surname=${surname}`,
	});
};

export const getCustomerAccountList = () => {
	const response = request({
		method: 'GET',
		url: '/mcm/api/v2/account/get-all',
	});
	return response;
};

export const GetAnchorageList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/location?type=ANCHORAGE`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetBerthAndHarbourList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/location?type=BERTH&type=HARBOUR_LOCATION`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetNauticalList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/location?type=ANCHORAGE&type=BOARDING_GRD&type=HARBOUR_LOCATION&type=SEA&type=TUG_BASE`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetTerminalList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/location?type=TERMINAL`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getJobTypeList = () => {
	const response = request({
		method: 'GET',
		url: 'mrm/api/v2/job-type/get-all',
	});
	return response;
};

export const getCommodityTypeList = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/api/v2/commodity-type/get-all',
	});
	return response;
};

export const getLocationList = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/api/v2/location/get-all',
	});

	return response;
};

// export const getLocationType = (type) => {
//   const response = request({
//     method: "GET",
//     url: `/mrm/api/v2/location/${type}`,
//   })

//   return response
// }

export const getLocationByType = (type) => {
	const response = request({
		method: 'GET',
		url: `/mrm/api/v2/location?type=${type}`,
	});

	return response;
};

export const getFromLocation = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/location/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getVesselList = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/api/v2/ship/get-all',
	});

	return response;
};

export const getVesselByID = (idVessel) => {
	const response = request({
		method: 'GET',
		// url: `/mrm/api/v2/ship/${idVessel}`,
		url: `/mrm/api/v2/vessel/${idVessel}`,
	});

	return response;
};

export const getAllVesselList = () => {
	const response = request({
		method: 'GET',
		url: '/msm/api/v2/vessel-visit/list',
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

export const getUpcomingVessel = (params) => {
	const response = request({
		method: 'GET',
		params: params,
		url: PREFIX_MSM + '/vessel-visit/list-upcoming',
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

export const getMobileConfig = () => {
	const response = request({
		method: 'GET',
		url: PREFIX_MCS + '/mobile-config/getData',
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};

export const postShipMovement = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/move`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const postCargoManifests = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/save-cargo-manifest`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const approveVesselVisit = (idVisit) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/vessel-visit/approve/vessel-visit-id/${idVisit}`,
		uam: true,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateShipMovement = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/ship-movement/move`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateMovement = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/ship-movement/change`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateMovementPortServiceTransaction = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/ship-movement/port-service-transaction/update`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const createMovementPortServiceTransaction = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/port-service-transaction/create`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getEventName = (idMovement) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/event-name/${idMovement}`,
		uam: true,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const listEventName = () => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/event/event-name`,
		uam: true,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const postToPhytonGetSRTId = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/vessel-visit/send`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getSRTTidal = (idPhytonSRT) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/vessel-visit/get/${idPhytonSRT}`,
	});
};

export const UploadTidalData = (data) => {
	return request({
		method: 'POST',
		url: '/mpes/api/v2/tide/upload',
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const signOff = (vesselId) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/vessel-visit/signOff/${vesselId}`,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const reInvoice = (vesselId) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/vessel-visit/${vesselId}/unlock`,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const cancelPilot = (movementType, movementID) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSRT + `/confirmation-deployment/cancel-pilot/${movementType}/${movementID}`,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const cancelTug = (movementType, movementID) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSRT + `/confirmation-deployment/cancel-tug/${movementType}/${movementID}`,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const waive = (vesselId) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/vessel-visit/waiver/${vesselId}`,
	});
};

export const postShipShift = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/shift`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateShipShift = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/ship-movement/shift`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const postCreateEvent = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/event`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const postUpdateEvent = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/ship-movement/update-event`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const postCreateJobEvent = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/event/create-job-event`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const postUpdateJobEvent = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/event/update-job-event`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getIncidentList = (params) => {
	const response = request({
		method: 'GET',
		params: params,
		url: PREFIX_MSM + '/vessel-visit/incidents',
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

export const getIncidentAuditList = (id) => {
	const response = request({
		method: 'GET',
		v2: true,
		url: PREFIX_MSM + `/incident/${id}/audit`,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};

export const getActivityAuditList = (id) => {
	const response = request({
		method: 'GET',
		v2: true,
		url: PREFIX_MSM + `/activity/${id}/audit`,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};

export const getEventAuditList = (id) => {
	const response = request({
		method: 'GET',
		v2: true,
		url: PREFIX_MSM + `/ship-movement/event/${id}/audit`,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};

//Get Report Category List
export const getReportCategory = (params) => {
	const response = request({
		method: 'GET',
		params: params,
		url: END_POINT.v2.get.reportCategory,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};
// get report menu data
export const getReportMenuData = (data) => {
	return request({
		method: 'POST',
		url: END_POINT.v2.post.reportMenu,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getReportMenuDataV2 = (data) => {
	return request({
		method: 'POST',
		url: data.url,
		v2: true,
		data: data.params,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const ExportReportData = (data) => {
	return request({
		method: 'POST',
		url: `/mrs/api/v2/report/menu/export`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const ExportUsers = (data) => {
	let url = BASE_API_URL_V2 + `/uam/api/v2/user/list/export`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};

	return axios({
		method: 'post',
		url: url,
		responseType: 'blob',
		headers: headers,
		data: data,
	});
};

export const getAllDashboard = () => {
	return request({
		method: 'GET',
		url: '/mrs/api/v2/report/dashboard/get-all',
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Make Custom
export const getDashlet = (dashletId, params) => {
	const response = request({
		method: 'GET',
		params: params,
		url: `/mrs/api/v2/report/dashlet/get/${dashletId}`,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};

export const getDashletJson = (dashletId, params) => {
	const response = dataDashlet;
	const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
	return response[random(0, 3)];
};

export const getDashletData = (dashletId, params) => {
	const response = request({
		method: 'POST',
		data: {
			dashletId,
			params,
		},
		url: `/mrs/api/v2/report/dashlet/get-data `,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};

export const CreateUAMUser2 = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_UAM + `/user/new`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetAllOrg = () => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/organization/get-all`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// End Make Custom

export const vesselVisitById = (id) => {
	const response = request({
		method: 'GET',
		url: PREFIX_MSM + `/vessel-visit/${id}`,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
	return response;
};
export const postIncident = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + '/incident',
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const putIncident = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + '/incident',
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const deleteIncident = (movementType, movementId) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MSM + `/ship-movement/delete/${movementType}/${movementId}`,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getVesselHistory = (params) => {
	const response = request({
		method: 'GET',
		// params: params,
		url: `/msm/api/v2/vessel-visit/history?page=${params?.page}&size=${params?.size}&vesselId=${params?.vesselId}`,
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

export const getAllVesselListPage = (params) => {
	const response = request({
		method: 'GET',
		params: params,
		url: `/msm/api/v2/vessel-visit/list`,
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

export const GetVesselInfo = (sector, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/${sector}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getVesselListed = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/api/v2/vessel-visit/get-all',
	});

	return response;
};

export const getCommodityList = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/api/v2/commodity/get-all',
	});
	return response;
};

export const getCommodityTypeAll = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/api/v2/commodity-type/get-all',
	});
	return response;
};

export const getSupplierList = () => {
	const response = request({
		method: 'GET',
		url: '/mcm/api/v2/supplier/get-all',
	});

	return response;
};

export const getVesselListLookup = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/ship/list-lookup',
	});

	return response;
};

export const getLocationListLookup = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/location/list-lookup',
	});

	return response;
};

export const getVesselTypeListLookup = () => {
	const response = request({
		method: 'GET',
		url: '/mrm/vessel-type/list-lookup',
	});
	return response;
};

// export const getAPINewCustomerList = () => {
//   let config = {
//     method: "get",
//     url: `${BE_NEW_API}/customer/`,
//   }

//   return axios(config)
// }

// export const getAPINewOrderList = () => {
//   let config = {
//     method: "get",
//     url: `${BE_NEW_API}/order/list`,
//   }

//   return axios(config)
// }

// export const deleteAPINewOrder = (id) => {
//   let config = {
//     method: "delete",
//     url: `${BE_NEW_API}/order/delete/${id}`,
//   }

//   return axios(config)
// }

// export const getAPINewOrderByID = (id) => {
//   let config = {
//     method: "get",
//     url: `${BE_NEW_API}/order/${id}`,
//   }

//   return axios(config)
// }

// export const postAPINewOrder = (data) => {
//   let config = {
//     method: "post",
//     url: `${BE_NEW_API}/order/new`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   }

//   return axios(config)
// }

// export const putAPINewOrder = (data) => {
//   let config = {
//     method: "put",
//     url: `${BE_NEW_API}/order/update`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   }

//   return axios(config)
// }

// Get Launch Deployments by orderId
export const getLaunchDeployments = (orderId, message) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/launch-deployments/order/${orderId}`,
		// msrt: true,
		v2: true,
		message: message,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Get Launch Deployments by ID
export const getLaunchDeploymentsByID = (id, message = null) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/launch-deployments/order/${id}`,
		// msrt: true,
		v2: true,
		message: message,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getAllReturnTugList = (page) => {
	const response = request({
		method: 'GET',
		url: PREFIX_MSRT + `/deployments/getAll?page=${page}&size=10`,
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

// Get TUG Deployments by orderId
export const getTugDeployments = (orderId, message) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/deployments/order/${orderId}`,
		// msrt: true,
		v2: true,
		message: message,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Get PILOT Deployments by orderId
export const getPilotDeployments = (orderId, message) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/pilot-deployments/order/${orderId}`,
		// msrt: true,
		v2: true,
		message: message,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// export const getReturnOrdrtPilotList = (page) => {
//   return request({
//     method: 'GET',
//     url: PREFIX_MSRT + `/pilot-deployments/getAll?page=${page}&size=10`,
//     // msrt: true,
//     v2: true,
//     message: message,
//     headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
//   })
// }

export const getReturnOrdrtTugList = (page) => {
	console.log('Tug Return Order List', PREFIX_MSRT + `/deployments/getAll?page=${page}&size=10`);
	const response = request({
		method: 'GET',
		url: PREFIX_MSRT + `/deployments/getAll?page=${page}&size=10`,
		// headers: { Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}` }
	});
	return response;
};

export const getTugType = () => {
	let params = { name: 'tug' };
	return DataService.v1
		.getData(END_POINT.v1.get.tugType, params)
		.then((res) => {
			const type = res?.data?.vesselTypeList;
			console.log(type, 'Line no 256 getTugType =================================');
			// debugger;
			if (type) {
				return type?.map((type) => ({
					label: type.name,
					value: type.id,
					displayName: type.name,
				}));
			}
			return [];
		})
		.catch((err) => {
			return err;
		});
};

// Update Launch Deployments by orderId
export const UpdateLaunchDeployment = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSRT + `/launch-deployments/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		},
	});
};

// Update Launch Deployments by orderId
export const UpdateTugDeployment = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSRT + `/deployments/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Cancel Deployments
export const CancelDeployment = (type, id) => {
	const deploymentType = type === 'launch' ? 'launch-deployments' : type === 'pilot' ? 'pilot-deployments' : 'deployments';

	return request({
		method: 'POST',
		url: PREFIX_MSRT + `/${deploymentType}/cancel/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Complete Deployments
export const CompleteDeployment = (type, id) => {
	const deploymentType = type === 'launch' ? 'launch-deployments' : type === 'pilot' ? 'pilot-deployments' : 'deployments';

	return request({
		method: 'POST',
		url: PREFIX_MSRT + `/${deploymentType}/complete/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Delete Deployments
export const DeleteDeployment = (type, id) => {
	const deploymentType = type === 'launch' ? 'launch-deployments' : type === 'pilot' ? 'pilot-deployments' : 'deployments';

	return request({
		method: 'POST',
		url: PREFIX_MSRT + `/${deploymentType}/delete/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/** Get UAM User List */
export const UAMUserList = (params) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/user/list`,
		uam: true,
		params: params,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/** Create UAM User  */
export const CreateUAMUser = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_UAM + `/user/new`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/** Create UAM User  */
export const UpdateUAMUser = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_UAM + `/user/`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Get UAM Department List}
 * @returns Promise
 */
export const GetUAMDepartmentList = (params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/department/list`,
		uam: true,
		params: params,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Get UAM UserType List}
 * @returns Promise
 */
export const GetUAMUserTypeList = (params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/usertype/list`,
		uam: true,
		params: params,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Get UAM Role List}
 * @returns Promise
 */
export const GetUAMRoleList = (params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/role/list`,
		uam: true,
		params: params,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Add UAM Department }
 * @returns Promise
 */
export const AddUAMDepartment = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_UAM + `/department/new`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update UAM Department }
 * @returns Promise
 */
export const UpdateUAMDepartment = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_UAM + `/department/`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GEt  SEction List }
 * @returns Promise
 */
export const GetSection = (section) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/${section}/list`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GEt  All  List }
 * @returns Promise
 */
export const GetAll = (section) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/${section}/get-all`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GEt  All  MRM List }
 * @returns Promise
 */
export const GetAllMRM = (section, params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/${section}/get-all`,
		params: params,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetAllCargo = (section, params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_CARGO + `/${section}/get-all`,
		params: params,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetCargoList = (params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_CARGO + `/cargo/list`,
		uam: true,
		params: params,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetCargoDetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_CARGO + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const AddCargo = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_CARGO + '/cargo/create',
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const UpdateCargo = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_CARGO + '/cargo/update',
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeleteCargo = (id) => {
	return request({
		method: 'DELETE',
		url: PREFIX_CARGO + `/cargo/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GEt  All  MCM List }
 * @returns Promise
 */
export const GetAllMCM = (section) => {
	return request({
		method: 'GET',
		url: PREFIX_MCM + `/${section}/get-all`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GEt  SEction List }
 * @returns Promise
 */
export const GetSectionDetailById = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/${section}/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Add UAM  }
 * @returns Promise
 */
export const AddSection = (data, section, uam) => {
	return request({
		method: 'POST',
		url: uam ? PREFIX_UAM + `/${section}/create` : PREFIX_MRM + `/${section}/new`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update UAM  }
 * @returns Promise
 */
export const UpdateSection = (data, section, uam) => {
	return request({
		method: 'PUT',
		url: uam ? PREFIX_UAM + `/${section}/update` : PREFIX_MRM + `/${section}/`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Add MRM Section  }
 * @returns Promise
 */
export const AddMRMRSection = (data, section) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/${section}/create`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Add MSM Section  }
 * @returns Promise
 */
export const AddMSMSection = (data, section) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/${section}/create`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MSM  }
 * @returns Promise
 */
export const UpdateMSMSection = (data, section) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/${section}/update`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const UpdateSingleMovement = (data, section) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/ship-movement/${section}`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const FindVesselByImo = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/${section}/send-imo/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const Audit = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/vessel-visit/audit/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const FindVesselById = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/${section}/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update UAM  }
 * @returns Promise
 */
export const UpdateMRMSection = (data, section) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/${section}/update`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create PermissionGroup  }
 * @returns Promise
 */
export const CreatePermissionGroup = (data, section) => {
	return request({
		method: 'POST',
		url: PREFIX_UAM + `/${section}/create`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update PermissionGroup  }
 * @returns Promise
 */
export const UpdatePermissionGroup = (data, section) => {
	return request({
		method: 'PUT',
		url: PREFIX_UAM + `/${section}/update`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Add UAM Role }
 * @returns Promise
 */
export const AddUAMRole = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_UAM + `/role/new`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update UAM Role }
 * @returns Promise
 */
export const UpdateUAMRole = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_UAM + `/role/`,
		uam: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MRM Country }
 * @returns Promise
 */
export const CreateCountry = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/country/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MRM Country }
 * @returns Promise
 */
export const UpdateCountry = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/country/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MRM Country }
 * @returns Promise
 */
export const CreateJobType = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/job-type/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MRM Country }
 * @returns Promise
 */
export const UpdateJobType = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/job-type/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MRM Activity Type }
 * @returns Promise
 */
export const CreateActivityType = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/activity-type/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create Activity MSM }
 * @returns Promise
 */
export const CreateActivity = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/activity/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// export const UpdatePortService = (url, data) => {
//   return request({
//     method: "PUT",
//     url: PREFIX_MSM + `/${url}/update`,
//     v2: true,
//     data: data,
//     headers: {
//       Authorization: `Bearer ${Storage.getStorage("uamData")?.access_token}`,
//     },
//   })
// }

/**
 * @info {Create MRM Visit Reason }
 * @returns Promise
 */
export const CreateVisitReason = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/visit-reason/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MRM Visit Reason }
 * @returns Promise
 */
export const UpdateVisitReason = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/visit-reason/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Delete Visit Reason MRM }
 * @returns Promise
 */
export const DeleteVisitReason = (id) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MRM + `/visit-reason/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GET ALL Visit Reason MRM }
 * @returns Promise
 */
export const GetVisitReason = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/visit-reason/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MRM Activity Type }
 * @returns Promise
 */
export const UpdateActivityType = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/activity-type/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update Activity MSM }
 * @returns Promise
 */
export const UpdateActivity = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/activity/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Delete Activity MSM }
 * @returns Promise
 */
export const DeleteActivity = (activityID) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MSM + `/activity/delete?activityId=${activityID}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MRM Country }
 * @returns Promise
 */
export const CreateCommodity = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/commodity/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const CreateCommodityType = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/commodity-type/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MRM Country }
 * @returns Promise
 */
export const UpdateCommodity = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/commodity/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MRM Country }
 * @returns Promise
 */
export const CreateTag = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/tag/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MRM Country }
 * @returns Promise
 */
export const UpdateTag = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/tag/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

const typeUrl = {
	Pilotage: 'pilotage-port-service',
	Towage: 'towage-port-service',
	Cranage: 'cranage-port-service',
	Port: 'port-service',
};

/**
 * @info {Create PortServiceType }
 * @returns Promise
 */
export const CreatePortServiceType = (type, data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/${typeUrl[type]}/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update PortServiceType }
 * @returns Promise
 */
export const UpdatePortServiceType = (type, data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/${typeUrl[type]}/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeletePortServiceType = (type, id) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MRM + `/${typeUrl[type]}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create PredefinedOption }
 * @returns Promise
 */
export const CreatePredefinedOption = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/predefined-option/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update PredefinedOption }
 * @returns Promise
 */
export const UpdatePredefinedOption = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/predefined-option/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeletePredefinedOption = (id) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MRM + `/predefined-option/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MSM IncidentCategory }
 * @returns Promise
 */
export const CreateIncidentCategory = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/incident-category`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Update MSM IncidentCategory }
 * @returns Promise
 */
export const UpdateIncidentCategory = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/incident-category`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MSM Incident }
 * @returns Promise
 */
export const CreateUpdateIncidentConfiguration = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSM + `/incident-report-configuration`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const ApproveActivity = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSM + `/activity/approve`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MSM Incident }
 * @returns Promise
 */
export const GetIncidentConfiguration = (data) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/incident-report-configuration`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create MSM Incident }
 * @returns Promise
 */
export const GetIncidentCategoryList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/incident-category/get-all`,
		v2: true,
		//data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create Customer }
 * @returns Promise
 */
export const CreateCustomer = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MCM + `/customer/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create Customer }
 * @returns Promise
 */
export const UpdateCustomer = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCM + `/customer/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {Create Customer }
 * @returns Promise
 */
export const CreateAccount = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MCM + `/account/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Create Customer }
 * @returns Promise
 */
export const UpdateAccount = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCM + `/account/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetMcmCompanyList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MCM + `/company/list`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Create ContactPerson }
 * @returns Promise
 */
export const CreateContactPerson = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MCM + `/contact-person/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Update Contact Person }
 * @returns Promise
 */
export const UpdateContactPerson = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCM + `/contact-person/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Create Supplier }
 * @returns Promise
 */
export const CreateSupplier = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MCM + `/supplier/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Update Supplier  }
 * @returns Promise
 */
export const UpdateSupplier = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCM + `/supplier/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Request Temp Credit Limit   }
 * @returns Promise
 */
export const RequestTempCreditLimitChange = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MCM + `/account/${data?.accountId}/temp-credit-limit`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Approve Temp Credit Limit   }
 * @returns Promise
 */
export const ApproveTempCreditLimitChange = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCM + `/account/${data?.id}/temp-credit-limit/approve`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Customer Manager
 * @info {Reject Temp Credit Limit   }
 * @returns Promise
 */
export const RejectTempCreditLimitChange = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCM + `/account/${data?.id}/temp-credit-limit/reject`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info {ADD Location }
 * @returns Promise
 */
export const AddLocation = (type, data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/location/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info {Update Location }
 * @returns Promise
 */
export const UpdateLocation = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/location/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info {Get Location List }
 * @returns Promise
 */
export const GetLocationList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/location/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info {Get Country List }
 * @returns Promise
 */
export const GetCountryList = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/country/list`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info {Get Country List All }
 * @returns Promise
 */
export const GetCountryListAll = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/country/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Add Sector }
 * @returns Promise
 */
export const AddSector = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/sector/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info {Update Sector }
 * @returns Promise
 */
export const UpdateSector = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/sector/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Get Sector Detail }
 * @returns Promise
 */
export const GetSectorDetail = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/sector/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Get all Sector  }
 * @returns Promise
 */
export const GetAllSector = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/sector/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Add Travel table }
 * @returns Promise
 */
export const AddTravelTable = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/travel-table/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Update Travel table }
 * @returns Promise
 */
export const UpdateTravelTable = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/travel-table/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Add Channel }
 * @returns Promise
 */
export const AddChannel = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MRM + `/channel/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Update Channel }
 * @returns Promise
 */
export const UpdateChannel = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/channel/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Add Port }
 * @returns Promise
 */
export const AddPort = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/port/create`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module Data Manager
 * @info { Update Port }
 * @returns Promise
 */
export const UpdatePort = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/port/update`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module UAM
 * @info { Reset Password  }
 * @returns Promise
 */
export const ResetPassword = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_UAM + `/user/reset-password`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const ResetMyPassword = (data) => {
	let url = BASE_API_URL_V2 + `/uam/api/v2/user/reset-pwd`;
	return fetch(url, {
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9',
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
			'content-type': 'application/json',
		},
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: data,
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
	});
};

/**
 * @module UAM
 * @info { Unlock User  }
 * @returns Promise
 */
export const UnlockUser = (userID) => {
	// return request({
	//   method: "PUT",
	//   url: PREFIX_UAM + `/user/unlock/${userID}`,
	//   v2: true,
	//   headers: {
	//     Authorization: `Bearer ${Storage.getStorage("uamData")?.access_token}`,
	//   },
	// })

	let url = BASE_API_URL_V2 + PREFIX_UAM + `/user/unlock/${userID}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};
	return axios.put(url, null, { headers });
};

/**
 * @module UAM
 * @info { Reset Password  }
 * @returns Promise
 */
export const SuspendUser = (username) => {
	return request({
		method: 'DELETE',
		url: PREFIX_UAM + `/user/delete/${username}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MRM
 * @info { Get Detail By ID   }
 * @returns Promise
 */
export const GetMRMDetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeleteMRMSectionById = (section, id) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MRM + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module RostersManager
 * @info { Get All team   }
 * @returns Promise
 */

export const GetAllCertificate = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/pilot-certificate/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetAllTeam = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/team/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetCrewByType = (crewType) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/crew?type=${crewType}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const RemoveMemberTeamById = (teamId, crewId) => {
	return request({
		method: 'PUT',
		url: PREFIX_MRM + `/team/${teamId}/remove-member/${crewId}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getCalendarShift = (type, startDate, endDate, keyword = null) => {
	let searcKeyword = keyword ? `&searchKeyword=${keyword}` : '';
	const Token =
		'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVcC1tbDc4OE43SjZpV1gwT295MEhjNGQta0dzWm1VLUVmVjhtMHRxRkRRIn0.eyJleHAiOjE3MDI3MzQxMDEsImlhdCI6MTcwMjY5MDkwMSwianRpIjoiODI5YzFkYzMtNjFkNy00YmRmLTgxZWQtYmEwNDk2YzU4MzQxIiwiaXNzIjoiaHR0cDovL3RlbmFudDA2LWtleWNsb2FrLnRlbmFudDA2OjgwODAvYXV0aC9yZWFsbXMvbWFyaW5lbSIsImF1ZCI6InJlYWxtLW1hbmFnZW1lbnQiLCJzdWIiOiI4ZDEzNTU5MS03YmYyLTQxYmUtYTE4My02YzFmYTI4Y2U4NWEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtYXJpbmVtLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI4ZTQzOWYyNi03OWMwLTQwNzItYWE0Yy00ZTBhZjFkMmMzOTYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiT1BFUkFUT1IiLCJvZmZsaW5lX2FjY2VzcyIsIk1BTkFHRVIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIiwiVVNFUiIsIkFDQ09VTlRJTkciXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1hcmluZW0tY2xpZW50Ijp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIiwiTUFOQUdFUiIsIkFETUlOIiwiVVNFUiJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4ZTQzOWYyNi03OWMwLTQwNzItYWE0Yy00ZTBhZjFkMmMzOTYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic3VwZXJhZG1pbkBtYXJpbmVtZGV2In0.biXrera_6JsqMo4TDEQ1aLE3lG4ipYek2zppJg5D-IVAhB1xEOChbLz6_hpci_oPmo2ByZMFoH1eeknQgsIsmWNhDYuqX2-nKzUDcaiCzypt5hbdVItyZYwLkHkMej_gIExnoF1H1oi8sIFhAuAZ7tdVJXGuJRoulXGZvm2zInuuZei7BO1XuBIOI5f5srSz7s7L6Y3wv_UnV5Gjl5Ee5Xo7r3i1vSxgHNTJ531E7hskJWpo0k1DTamrGEdEfxsinRDDH_wQMEW3_g9DYcOPXX-9u6vPbhqU8Ij_ywlfdCasolzLatFwmFifRdHPoZ2G0zDKjrSM_wUy711ofGvpDw';
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/shift/calendar/${type}/team-shift?startDate=${startDate}&endDate=${endDate}${searcKeyword}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Token}`,
		},
	});
};

export const GetAllShift = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/shift/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeleteShiftById = (id) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MRM + `/shift/delete/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MCM
 * @info { Get Detail By ID   }
 * @returns Promise
 */
export const GetMCMDetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MCM + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MSM
 * @info { Get Detail By ID   }
 * @returns Promise
 */
export const GetMSMDetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module UAM
 * @info { Get Detail By ID   }
 * @returns Promise
 */
export const GetUAMetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_UAM + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MSRT
 * @info { Get Detail By ID   }
 * @returns Promise
 */
export const GetMSRTDetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MSRQ
 * @info { Get Detail By ID   }
 * @returns Promise
 */
export const GetMSRQDetailByID = (section, id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRQ + `/${section}/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetMSRQWorkBoatDetailsByID = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRQ + `/workboat-service-request/order/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const deleteOrderMsrq = (id) => {
	// console.log('delete url', `${PREFIX_MSRQ}/order/delete/${id}`)
	// console.log('access token _' , Storage.getStorage('uamData')?.access_token);
	let config = {
		method: 'DELETE',
		url: BE_NEW_API + `/order/delete/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	};

	return request(config);
};

/**
 * @module MSRQ
 * @info { Approve Order   }
 * @returns Promise
 */
export const ApproveOrder = (data) => {
	// return request({
	//   method: "PUT",
	//   url: PREFIX_MSRQ + `/order/approve?orderId=${data}`,
	//   v2: true,
	//   headers: {
	//     "X-LegacyToken": `${Storage.getStorage("access_token")}`,
	//     Authorization: `Bearer ${Storage.getStorage("uamData")?.access_token}`,
	//   },
	// })

	let url = BASE_API_URL_V2 + PREFIX_MSRQ + `/order/approve?orderId=${data}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};
	return axios.put(url, null, { headers });
};

export const getOrderDataByOrderNo = (orderNo) => {
	return request({
		method: 'GET',
		url: `${PREFIX_MSRQ}/order/order-no/${orderNo}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getOrderDataByID = (id) => {
	return request({
		method: 'GET',
		url: `${PREFIX_MSRQ}/order/${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeleteMSMSectionById = (id, section) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MSM + `/${section}/delete/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const DeleteMSMChildSectionById = (id, section) => {
	return request({
		method: 'DELETE',
		url: PREFIX_MSM + `/ship-movement/delete/${section}/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MSRT
 * @info { Get  Deployment  By ship movement ID   }
 * @returns Promise
 */
export const GetPilotDeploymentByShipMovementId = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/pilot-deployments/ship-movement?id=${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetPilotDeploymentByShipMovementIdWithCancel = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/pilot-deployments/ship-movement?id=${id}&includeCancelledDeployment=true`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MSRT
 * @info { Get  Deployment  By ship movement ID   }
 * @returns Promise
 */
export const GetTugDeploymentByShipMovementId = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/deployments/ship-movement?id=${id}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetTugDeploymentByShipMovementIdWithCancel = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/deployments/ship-movement?id=${id}&includeCancelledDeployment=true`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const versionApp = () => {
	return request({
		method: 'GET',
		url: PREFIX_MCS + `/ui-config/getData`,
		v2: true,
	});
};

export const changeLogo = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCS + `/ui-config/update`,
		v2: true,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getLocaleConfig = () => {
	return request({
		method: 'GET',
		url: PREFIX_MCS + `/locale-config/list`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getConfigList = (configName = 'smtp-config') => {
	return request({
		method: 'GET',
		url: PREFIX_MCS + `/${configName}/list`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getKeyValueConfig = (module, configKey) => {
	return request({
		method: 'GET',
		url: PREFIX_MCS + `/key-value-configs/module/${module}/config-key/${configKey}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getAllKeyValueConfig = (module) => {
	return request({
		method: 'GET',
		url: PREFIX_MCS + `/key-value-configs/module/${module}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateKeyValueConfig = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MCS + `/key-value-configs/save`,
		v2: true,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const getFieldConfig = (fieldModule = 'msrq-col') => {
	return request({
		method: 'GET',
		url: PREFIX_MCS + `/${fieldModule}/get-all`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateFieldConfig = (fieldModule = 'msrq-col', data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MCS + `/${fieldModule}/update`,
		v2: true,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @module MSS
 * @info { get url upload  }
 * @returns Promise
 */
export const GetUploadUrl = (extension) => {
	return request({
		method: 'GET',
		url: PREFIX_MSS + `/file/generate-url?type=${extension}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetDownloadUrl = (file) => {
	return request({
		method: 'GET',
		url: PREFIX_MSS + `/file/get-file-url/{path}?file=${file}`,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};
/**
 * @module MSS
 * @info { get url upload  }
 * @returns Promise
 */
export const UploadFileToAwsS3 = (url, file) => {
	// let formData = new FormData();
	// formData.append("file", file);

	// const headers = {

	//   "Access-Control-Allow-Origin": "*"
	// }

	return axios
		.put(url, file)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const ApproveMovement = (id) => {
	let url = BASE_API_URL_V2 + PREFIX_MSRT + `/confirmation-deployment/approve-pilot-tug/${id}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};
	return axios.put(url, null, { headers });
};

export const ExportFile = (data) => {
	let url = BASE_API_URL_V2 + `/mrs/api/v2/report/menu/export`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};
	// return axios.post(url, data, { headers })
	return axios({
		method: 'post',
		url: url,
		responseType: 'blob',
		headers: headers,
		data: data,
	});
};

export const CancelMovement = (id) => {
	let url = BASE_API_URL_V2 + PREFIX_MSRT + `/confirmation-deployment/cancel-pilot-tug/${id}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};
	return axios.put(url, null, { headers });

	//   return request({
	//     method: "PUT",
	//     url: PREFIX_MSRT + `/confirmation-deployment/cancel-pilot-tug/${id}`,
	//     v2: true,
	//     headers: {
	//       "X-LegacyToken": `${Storage.getStorage("access_token")}`,
	//       Authorization: `Bearer ${Storage.getStorage("uamData")?.access_token}`,
	//     },
	//   })
};

export const GetWharfMarkValidation = (loc, wh) => {
	let url = BASE_API_URL_V2 + PREFIX_MRM + `/location/getWharfmark?locationId=${loc}&wharfMark=${wh}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};

	return axios.get(url, { headers });
};

export const GetVesselFSUBarge = () => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/vessel/ship-fsu`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetOrderHistory = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRQ + `/order/history/${id}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetUserDetail = (u) => {
	return request({
		method: 'GET',
		v2: true,
		url: PREFIX_UAM + `/user/get/${u}`,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetFSUByID = (id) => {
	let url = BASE_API_URL_V2 + PREFIX_MRM + `/fsu/${id}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};

	return axios.get(url, { headers });
};

export const GetLocationByID = (id) => {
	let url = BASE_API_URL_V2 + PREFIX_MRM + `/location/${id}`;
	let headers = {
		'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
	};

	return axios.get(url, { headers });
};

// Get PILOT Deployments by orderId
export const auditrailPilotDeployment = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/pilot-deployments/audit/${id}`,
		// msrt: true,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// Get PILOT Deployments by orderId
export const auditrailTugDeployment = (id) => {
	return request({
		method: 'GET',
		url: PREFIX_MSRT + `/deployments/audit/${id}`,
		// msrt: true,
		v2: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const GetBillingInfo = (idVisit) => {
	return request({
		method: 'GET',
		url: PREFIX_MSM + `/vessel-visit/BillingIntegration/${idVisit}`,
		uam: true,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const createOrder = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSRQ + `/order/new`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const updateOrder = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSRQ + `/order/update`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

// InsertTagDeployment

export const UpdateTagDeployment = (data) => {
	return request({
		method: 'PUT',
		url: PREFIX_MSRT + `/pilot-deployments/tag`,
		v2: true,
		data: data,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
		},
	});
};

export const InsertTagDeployment = (data) => {
	return request({
		method: 'POST',
		url: PREFIX_MSRT + `/pilot-deployments/tag`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

/**
 * @info {GEt  List  MRM Vessel Type }
 * @returns Promise
 */
export const GetListVesselType = (params = {}) => {
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/vessel-type/list`,
		params: params,
		uam: true,
		headers: {
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});
};

export const invalidateToken = (data) => {
	return request({
		method: 'POST',
		url: `/auth/invalidate-token`,
		uam: true,
		data: data,
		headers: {
			'X-LegacyToken': `${Storage.getStorage('access_token')}`,
			Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
		},
	});

	// let url = BASE_API_URL_V2 + `/auth/invalidate-token`
	// return fetch(url, {
	//   headers: {
	//     accept: "*/*",
	//     "accept-language": "en-US,en;q=0.9",
	//     "X-LegacyToken": `${Storage.getStorage("access_token")}`,
	//     Authorization: `Bearer ${Storage.getStorage("uamData")?.access_token}`,
	//     "content-type": "application/json",
	//   },
	//   referrerPolicy: "strict-origin-when-cross-origin",
	//   body: `${Storage.getStorage("uamData")?.access_token}`,
	//   method: "POST",
	//   mode: "cors",
	//   credentials: "include",
	// })
};
