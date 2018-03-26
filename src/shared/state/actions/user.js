import * as types from '../constants/user';
import { post, get, patch, setAccessToken, getAccessToken, setCart, setFavorites } from 'utils/api';
import { replace } from 'react-router-redux';
import { setUserRole } from 'utils/helpers';
import { actions } from '../modules/modal';
import axios from 'axios';

const clearLocalStorage = () => {
	setAccessToken('');
	setFavorites('');
	setCart('');
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
		dispatch(actions.closeModal())
		dispatch(replace('/user'));
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
	return dispatch => {

		dispatch(loginStart());

		post(
			'/users/login',
			data,
			response => {

		
				const { accessToken } = response;
		
				setAccessToken(accessToken);
		
				dispatch(loginSuccess(accessToken));
			},
			error => dispatch(loginFailure(error.message))
		)
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

		dispatch(replace('/user'));
	}
}

const registerFailure = error => {

	clearLocalStorage();

	return {
		type: types.REGISTER_FAILURE,
		error
	}
}

export const register = ({email, password, rePassword}) => {
	return dispatch => {
		
		dispatch(registerStart());

		post(
			'/users/registration',
			{ email, password, rePassword },
			(response) => {

				const { accessToken } = response;
				

				setAccessToken(accessToken);

				dispatch(registerSuccess(accessToken));
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
	const url = `/users/${getAccessToken()}/profile`;
	
	return dispatch => {

		dispatch(getProfileStart());
		get(
			url,
			{},
			response => dispatch(getProfileSuccess(response)),
			error => dispatch(getProfileFailure(error.message))
		)
	}
}

const getOrdersStart = () => {
	return {
		type: types.GET_ORDERS_START
	}
}

const getOrdersSuccess = orders => {
	return {
		type: types.GET_ORDERS_SUCCESS,
		orders
	}
}

const getOrdersFailure = error => {
	return {
		type: types.GET_ORDERS_FAILURE,
		error
	}
}

export const getOrders = () => {
	
	const url = `/users/${getAccessToken()}/orders`;
	
	return dispatch => {

		dispatch(getOrdersStart());
		get(
			url,
			{},
			response => dispatch(getOrdersSuccess(response)),
			error => dispatch(getOrdersFailure(error.message)),
			null,
			'https://private-0b0d2-onlineshop2.apiary-mock.com/'
		)
	}
}

const setProfileStart = () => {
	return {
		type: types.GET_PROFILE_START
	}
}

const setProfileSuccess = profile => {
	return {
		type: types.GET_PROFILE_SUCCESS,
		profile
	}
}

const setProfileFailure = error => {
	return {
		type: types.GET_PROFILE_FAILURE,
		error
	}
}

export const setProfile = (data, accessToken) => {
	const url = `/users/${accessToken}/info`;
	
	return dispatch => {

		dispatch(setProfileStart());
		patch(
			url,
			data,
			response => dispatch(setProfileSuccess(response)),
			error => dispatch(setProfileFailure(error.message))
		);
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
			`/users/logout/${getAccessToken()}`,
			{},
			(response) => dispatch(logoutSuccess()),
			(error) => dispatch(logoutFailure(error.message)),
			null,
			'https://private-0b0d2-onlineshop2.apiary-mock.com/'
		)
	}
}