import SessionStorage from './SessionStorage';
import { BASE_API_URL_V2 } from './constants';
import { request } from './request';

export const PREFIX_MSRQ = '/msrq/api/v2';
export const PREFIX_MSRT = '/msrt/api/v2';
export const PREFIX_UAM = '/uam/api/v2';
export const PREFIX_MRM = '/mrm/api/v2';
export const PREFIX_MSM = '/msm/api/v2';
export const PREFIX_MCM = '/mcm/api/v2';
export const PREFIX_MSS = '/mss/api/v2';
export const PREFIX_MCS = '/mcs/api/v2';
export const PREFIX_CARGO = '/cargo-service/api/v2';

export const BE_NEW_API = BASE_API_URL_V2 + PREFIX_MSRQ;

export const GetAllMRM = (section) => {
  const accessToken = SessionStorage.getStorage('uamData')?.access_token;
	return request({
		method: 'GET',
		url: PREFIX_MRM + `/${section}/get-all`,
		uam: true,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
