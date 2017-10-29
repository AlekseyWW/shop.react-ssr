import axios from 'axios';
// Request to API
const apiUrl = process.env.API_URL;

const request = (method, url, data, successHandler, errorHandler, headers) => axios({
	method,
	baseURL: apiUrl,
	url,
	headers,
	[method === 'get' ? 'params' : 'data']: data
})
.then(response => successHandler(response.data))
.catch(error => errorHandler(error));

// Request method aliases
export const get = (...args) => request('get', ...args);
export const post = (...args) => request('post', ...args);
export const put = (...args) => request('put', ...args);
export const patch = (...args) => request('patch', ...args);
export const del = (...args) => request('delete', ...args);

