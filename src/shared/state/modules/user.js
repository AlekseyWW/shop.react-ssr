import * as types from '../constants/user';
import { getUserRole } from 'utils/helpers';
import { getAccessToken } from 'utils/api';

const initialState = {
	isFetching: false,
	logoutIsFetching: false,

	accessToken: getAccessToken(),

	profile: {},
	profileIsLoading: false,
	profileIsLoaded: false,

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

		case types.LOGOUT_START:
			return {
				...state,
				logoutIsFetching: true
			};

		case types.LOGOUT_SUCCESS:
			return {
				...state,
				logoutIsFetching: false,
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