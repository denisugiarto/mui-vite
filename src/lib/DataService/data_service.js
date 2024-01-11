import Storage from '../../components/SessionStorage';
import request from '../../utils/api_client';

const v1 = {
	getData: function getData(url, params = {}) {
		return request({
			url: url,
			method: 'GET',
			params: params,
		});
	},
	createData: function createData(url, formData) {
		return request({
			url: url,
			method: 'POST',
			data: formData,
		});
	},
};

const v2 = {
	getData: function getData(url, params = {}) {
		// const authHeaders = `Bearer ${Storage.getStorage('uamData')?.access_token}`;
		return request({
			url: url,
			method: 'GET',
			v2: true,
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
			},
			params: params,
		});
	},
	updateData: function updateData(url, data) {
		const authHeaders = Storage.getStorage('access_token');
		return request({
			url: url,
			method: 'PUT',
			v2: true,
			headers: {
				'X-LegacyToken': `${authHeaders}`,
				Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
			},
			data: data,
		});
	},
	createData: function createData(url, formData) {
		const authHeaders = Storage.getStorage('access_token');
		return request({
			url: url,
			method: 'POST',
			data: formData,
			v2: true,
			headers: {
				'X-LegacyToken': `${authHeaders}`,
				Authorization: `Bearer ${Storage.getStorage('uamData')?.access_token}`,
			},
		});
	},
};

const DataService = {
	v1,
	v2,
};

export default DataService;
