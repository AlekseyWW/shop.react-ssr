import axios from 'axios';
import { getExtendedList } from 'utils/helpers';
import { post, get } from 'utils/api';

const LOAD_CITIES_START = 'LOAD_CITIES_START';
const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
const LOAD_CITIES_FAILURE = 'LOAD_CITIES_FAILURE';

const GET_DELIVERY_COAST_START = 'GET_DELIVERY_COAST_START';
const GET_DELIVERY_COAST_SUCCESS = 'GET_DELIVERY_COAST_SUCCESS';
const GET_DELIVERY_COAST_FAILURE = 'GET_DELIVERY_COAST_FAILURE';
const CLEAR_DELIVERY_COAST = 'CLEAR_DELIVERY_COAST';

const LOAD_SINGLE_POST_START = 'LOAD_SINGLE_POST_START';
const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS';

const initialState = {
	isLoading: false,
	isLoaded: false,
	isDeliveryLoading: false,
	isDeliveryLoaded: false,
	paymentTypes: undefined,
	deliveryTypes: undefined,
	cities: [],
	error: null,
};

// Reducer
export default function(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD_CITIES_START:
			return {
				...state,
				isLoading: true,
			};

		case LOAD_CITIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				cities: action.data,
				total: action.total,
			};

		case LOAD_CITIES_FAILURE:
			return {
				...state,
				isLoading: false,
				isLoaded: false,
				cities: [],
				error: action.error,
			};
		case LOAD_SINGLE_POST_START:
			return {
				...state,
				items: getExtendedList(
					state.items,
					action.id,
					{ isLoading: true, isLoaded: false },
					true
				),
			};

		case LOAD_SINGLE_POST_SUCCESS:
			return {
				...state,
				items: getExtendedList(state.items, action.data.id, {
					isLoading: false,
					isLoaded: true,
					...action.data,
				}),
			};

		case GET_DELIVERY_COAST_START:
			return {
				...state,
				isDeliveryLoading: true,
			};

		case GET_DELIVERY_COAST_SUCCESS:
			return {
				...state,
				isDeliveryLoading: false,
				isDeliveryLoaded: true,
				...action,
			};

		case GET_DELIVERY_COAST_FAILURE:
			return {
				...state,
				isDeliveryLoading: false,
				isDeliveryLoaded: false,
				error: action.error,
			};

		case CLEAR_DELIVERY_COAST:
			return {
				...state,
				isDeliveryLoading: false,
				isDeliveryLoaded: false,
			};

		default:
			return state;
	}
}

// Actions
const loadCitiesStart = () => ({
	type: LOAD_CITIES_START,
});

const loadCitiesSuccess = data => ({
	type: LOAD_CITIES_SUCCESS,
	data,
});

const loadCitiesFailure = error => ({
	type: LOAD_CITIES_FAILURE,
	error,
});

// Action Creators
export const loadCities = data => dispatch => {
	dispatch(loadCitiesStart());
	const url = '/sdek/cities';
	return get(
		url,
		data,
		response => {
			const { data } = response;
			return dispatch(loadCitiesSuccess(data));
		},
		error => dispatch(loadCitiesFailure(err.message))
	);
};

const getDeliveryCoastStart = () => ({
	type: GET_DELIVERY_COAST_START,
});

export const clearDeliveryCoast = () => ({
	type: CLEAR_DELIVERY_COAST,
});

const getDeliveryCoastSuccess = data => ({
	type: GET_DELIVERY_COAST_SUCCESS,
	...data,
});

const getDeliveryCoastFailure = error => ({
	type: GET_DELIVERY_COAST_FAILURE,
	error,
});

export const getDeliveryCoast = (id, colors) => dispatch => {
	dispatch(getDeliveryCoastStart());

	const url = `/payment/by-city/${id}/info`;
	return post(
		url,
		{ colors },
		res => {
			return dispatch(getDeliveryCoastSuccess(res));
		},
		error => dispatch(getDeliveryCoastFailure(error.message))
	);
};
