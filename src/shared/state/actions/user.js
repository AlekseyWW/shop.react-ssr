import * as types from '../constants/user';
import { post, get, setAccessToken, getAccessToken } from 'utils/api';
import { replace } from 'react-router-redux';
import { setUserRole } from 'utils/helpers';
import axios from 'axios';

const clearLocalStorage = () => {
	setAccessToken('');
}

export const redirect = role => {
	return dispatch => {
		const urls = {
			director: '/dashboard',
			specialist: '/dashboard',
			head: '/dashboard',
			manager: '/projects',
			accountant: '/accountant'
		};
		const url = urls[role] || '/login';
		return dispatch(replace(url));
	}
}

const loginStart = () => {
	return {
		type: types.LOGIN_START
	}
}

export const loginSuccess = (token) => {
	return dispatch => {

		dispatch({
			type: types.LOGIN_SUCCESS,
			token,
		});

		// dispatch(replace('/'));
	}
}

const loginFailure = error => {

	clearLocalStorage();

	return {
		type: types.LOGIN_FAILURE,
		error
	}
}

export const login = (data) => {
	const url = 'https://private-0b0d2-onlineshop2.apiary-mock.com/login';

	return dispatch => {

		dispatch(loginStart());

		axios({
			method: 'post',
			url,
			data,
		})
			.then(res => {
				const { data } = res;

				const { access_token } = data;

				setAccessToken(access_token);

				dispatch(loginSuccess(access_token));
			})
			.catch(err => {
				dispatch(loginFailure(err.message))
			});
	}
}

const registerStart = () => {
	return {
		type: types.REGISTER_START
	}
}

export const registerSuccess = (token, role) => {
	return dispatch => {

		dispatch({
			type: types.REGISTER_SUCCESS,
			token,
			role,
		});

		dispatch(replace('/'));
	}
}

const registerFailure = error => {

	clearLocalStorage();

	return {
		type: types.REGISTER_FAILURE,
		error
	}
}

export const register = (email, password) => {
	return dispatch => {

		dispatch(registerStart());

		post(
			'/regiter',
			{ email, password },
			(response) => {

				const { access_token } = response;

				setAccessToken(access_token);

				dispatch(registerSuccess(access_token, role));
			},
			(error) => dispatch(registerFailure(error.message))
		)
	}
}

const getProfileStart = () => {
	return {
		type: types.GET_PROFILE_START
	}
}

const getProfileSuccess = profile => {
	return {
		type: types.GET_PROFILE_SUCCESS,
		profile
	}
}

const getProfileFailure = error => {
	return {
		type: types.GET_PROFILE_FAILURE,
		error
	}
}

export const getProfile = () => {
	const url = 'https://private-0b0d2-onlineshop2.apiary-mock.com/profile';
	
	return dispatch => {

		dispatch(getProfileStart());
		axios({
			method: 'get',
			url,
		})
			.then(res => {
				const { data } = res;

				const { access_token } = data;

				dispatch(getProfileSuccess(data))
			})
			.catch(err => {
				dispatch(getProfileFailure(err.message))
			});
	}
}


const logoutStart = () => {
	return {
		type: types.LOGOUT_START
	}
}

export const logoutSuccess = () => {
	return dispatch => {
		dispatch({ type: types.LOGOUT_SUCCESS });
		clearLocalStorage();
		// dispatch(replace('/login'));
	}
}

const logoutFailure = error => {
	return {
		type: types.LOGOUT_FAILURE,
		error
	}
}

export const logout = () => {
	return dispatch => {
		dispatch(logoutStart());

		post(
			'/logout',
			{},
			(response) => dispatch(logoutSuccess()),
			(error) => dispatch(logoutFailure(error.message))
		)
	}
}