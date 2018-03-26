import * as types from '../constants/user';
import { getUserRole } from 'utils/helpers';
import { getAccessToken } from 'utils/api';

const initialState = {
	isFetching: false,
	logoutIsFetching: false,

	accessToken: getAccessToken(),

	profile: undefined,
	profileIsLoading: false,
	profileIsLoaded: false,
	orders: undefined,
	ordersIsLoading: false,
	ordersIsLoaded: false,
	profileIsFetching: false,
	profileIsFetched: false,
	changeIsFetching: false,
	changeIsFetched: false,
	changeError: null,

	error: null
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case types.LOGIN_START:
			return {
				...state,
				isFetching: true
			};

		case types.LOGIN_SUCCESS:
			return {
				...state,
				isFetching: false,
				role: action.role,
				accessToken: action.token,
				error: null
			};

		case types.LOGIN_FAILURE:
			return {
				...state,
				isFetching: false,
				role: '',
				accessToken: '',
				error: action.error
			};

		case types.REGISTER_START:
			return {
				...state,
				isFetching: true
			};

		case types.REGISTER_SUCCESS:
			return {
				...state,
				isFetching: false,
				role: action.role,
				accessToken: action.token,
				error: null
			};

		case types.REGISTER_FAILURE:
			return {
				...state,
				isFetching: false,
				role: '',
				accessToken: '',
				error: action.error
			};

		case types.GET_PROFILE_START:
			return {
				...state,
				profileIsLoading: true
			};

		case types.GET_PROFILE_SUCCESS:
			return {
				...state,
				profileIsLoading: false,
				profileIsLoaded: true,
				profile: action.profile,
				error: null
			};

		case types.GET_PROFILE_FAILURE:
			return {
				...state,
				profileIsLoading: false,
				profileIsLoaded: false,
				profile: {},
				error: action.error
			};

		case types.GET_ORDERS_START:
			return {
				...state,
				orderIsLoading: true
			};

		case types.GET_ORDERS_SUCCESS:
			return {
				...state,
				orderIsLoading: false,
				orderIsLoaded: true,
				orders: action.orders,
				error: null
			};

		case types.GET_ORDERS_FAILURE:
			return {
				...state,
				orderIsLoading: false,
				orderIsLoaded: false,
				orders: {},
				error: action.error
			};

		case types.SET_PROFILE_START:
			return {
				...state,
				profileIsFetching: true
			};

		case types.SET_PROFILE_SUCCESS:
			return {
				...state,
				profileIsFetching: false,
				profileIsFetched: true,
				error: null
			};

		case types.SET_PROFILE_FAILURE:
			return {
				...state,
				profileIsFetching: false,
				profileIsFetched: false,
				profile: {},
				error: action.error
			};

		case types.CHANGE_PASSWORD_START:
			return {
				...state,
				changeIsFetching: true
			};

		case types.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				changeIsFetching: false,
				changeIsFetched: true,
				changeError: null
			};

		case types.CHANGE_PASSWORD_FAILURE:
			return {
				...state,
				changeIsFetching: false,
				changeIsFetched: false,
				changeError: action.error
			};

		case types.LOGOUT_START:
			return {
				...state,
				logoutIsFetching: true
			};

		case types.LOGOUT_SUCCESS:
			return {
				...state,
				logoutIsFetching: false,
				profileIsLoaded: false,
				profile: {},
				role: '',
				accessToken: '',
				error: null
			};

		case types.LOGOUT_FAILURE:
			return {
				...state,
				logoutIsFetching: false,
				error: action.error
			};

		default:
			return state;
	}
}