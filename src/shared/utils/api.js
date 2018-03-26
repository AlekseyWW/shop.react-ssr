import axios from 'axios';
// Request to API
const apiUrl = process.env.API_URL;
const request = (method, url, data, successHandler, errorHandler, headers, baseURL) => axios({
	method,
	baseURL: baseURL || apiUrl,
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

// Session token
export function getAccessToken() {
	return typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : '';
}

export function setAccessToken(token) {
	return typeof localStorage !== 'undefined' ? localStorage.setItem('accessToken', token) : '';
}

export function setFavorites(token) {
	return typeof localStorage !== 'undefined' ? localStorage.setItem('favorites', token) : '';
}

export function setCart(token) {
	return typeof localStorage !== 'undefined' ? localStorage.setItem('cart', token) : '';
}

