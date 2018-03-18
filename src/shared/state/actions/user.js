import * as types from '../constants/user';
import { post, get, setAccessToken, getAccessToken } from 'utils/api';
import { replace } from 'react-router-redux';
import { setUserRole } from 'utils/helpers';

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

export const loginSuccess = (token, role) => {
	return dispatch => {

		dispatch({
			type: types.LOGIN_SUCCESS,
			token,
			role,
		});

		dispatch(replace('/'));
	}
}

const loginFailure = error => {

	clearLocalStorage();

	return {
		type: types.LOGIN_FAILURE,
		error
	}
}

export const login = (email, password) => {
	return dispatch => {

		dispatch(loginStart());

		post(
			'/login',
			{ email, password },
			(response) => {

				const { access_token } = response;

				setAccessToken(access_token);

				dispatch(loginSuccess(access_token, role));
			},
			(error) => dispatch(loginFailure(error.message))
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
	return dispatch => {

		dispatch(getProfileStart());

		get(
			'/users',
			{},
			(response) => dispatch(getProfileSuccess(response)),
			(error) => dispatch(getProfileFailure(error.message))
		)
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
		dispatch(replace('/login'));
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