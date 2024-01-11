import axios from 'axios';
import { BASE_API_URL, BASE_API_URL_V2 } from '../lib/constants';
import Storage from './SessionStorage';
// let message;

const extractErrorMessage = (err) => {
	debugger;
	const isSubError = err.response.data.apierror.subErrors;
	if (isSubError) {
		let message = isSubError.map((it) => it.message);

		return message.join(', ');
	}

	const status = err?.response?.status;
	if (status === 400) {
		return err.response?.data?.apierror?.message;
	}

	return err.response.statusText;
};

export const request = function (options) {
	// const authHeaders = Storage.getStorage('access_token');   This is for mrm v1 apis.
	const authHeaders = Storage.getStorage('uamData')?.access_token;
	console.log("🚀 ~ request ~ authHeaders:", authHeaders)

	// if (options?.message) {
	//   message = options?.message || Storage.getStorage("message")
	// }
	// console.log({ message })
	const client = axios.create({
		baseURL:
			options?.v2 || options?.uam || options?.mrmv2 || options?.msrt || options?.msrq
				? BASE_API_URL_V2
				: options?.v1
				? BASE_API_URL
				: BASE_API_URL_V2,
		headers: options?.v2 || options?.uam || options?.msrt ? options.headers : { Authorization: `Bearer ${authHeaders}` },
	});

	const onSuccess = function (response) {
		if (options.handleHeaders === 1) {
			// debugger
			if (response && response.data && response.data.refresh_token && response.data.access_token) {
				const { data } = response;
				Storage.setStorage('access_token', data.access_token);
				Storage.setStorage('refresh_token', data.refresh_token);
				Storage.setStorage('dataUser', data);
			}
		}
		if (options.handleHeaders === 3) {
			if (response && response.data && response.data.user) {
			}
		}
		if (options.handleHeaders === 0) {
			// sessionStorage.clear();
			// window.location.href = '/';
		}
		// debugger
		const resp = response;
		if (resp?.hasOwnProperty('success')) {
			return resp;
		} else {
			return { ...resp, success: true };
		}
	};

	const onError = function (error) {
		// console.log({ error: error.response })
		if (options.handleHeaders === 0) {
			// sessionStorage.clear();
		}

		if (error?.response?.status === 401) {
			return AuthService.getTokenFromRefreshToken(BASE_API_URL_V2).catch((err) => {
				Storage.clear();
				window.location.href = '/marinem';
				// return iZtoast.error({ title: 'Error', message: 'Session expired' });
			});
		} else {
			// console.log("Executing else block")
			return Promise.reject(
				error.response ? extractErrorMessage(error) : { message: 'Something went wrong.', success: false } || error.message || error.errors
			);
		}
		//Check API and return response in accepted state with error data and success equals false flag to avoid catch block in all api requests.
	};

	return client(options).then(onSuccess).catch(onError);
};

export default request;
