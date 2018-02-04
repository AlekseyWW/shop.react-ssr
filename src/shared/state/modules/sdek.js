import axios from 'axios';
import { getExtendedList } from 'utils/helpers';

// Constants
const LOAD_CITIES_START = 'LOAD_CITIES_START';
const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
const LOAD_CITIES_FAILURE = 'LOAD_CITIES_FAILURE';

/// Последний пост из каждого канала
const GET_DELIVERY_COAST_START = 'GET_DELIVERY_COAST_START';
const GET_DELIVERY_COAST_SUCCESS = 'GET_DELIVERY_COAST_SUCCESS';
const GET_DELIVERY_COAST_FAILURE = 'GET_DELIVERY_COAST_FAILURE';

/// Пост по id
const LOAD_SINGLE_POST_START = 'LOAD_SINGLE_POST_START';
const LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS';
const LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE';

const initialState = {
	isLoading: false,
	isLoaded: false,
	cities: [],
	price: 0,
	error: null,
};

// Reducer
export default function (state = initialState, action = {}) {
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
					true,
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
				price: 0,
				error: action.error,
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
export const loadCities = name => dispatch => {
	dispatch(loadCitiesStart());
	const url = 'http://test-api-shop.abo-soft.com/sdek/cities';
	return axios({
		method: 'get',
		url,
		params: {name},
	})
		.then(res => {
			const { data } = res;
			return dispatch(loadCitiesSuccess(data));
		})
		.catch(err => {
			dispatch(loadCitiesFailure(err.message));
		});
};

// Actions
const loadSinglePostsStart = id => ({
	type: LOAD_SINGLE_POST_START,
	id,
});

const loadSinglePostsSuccess = data => ({
	type: LOAD_SINGLE_POST_SUCCESS,
	data,
});

const loadSinglePostsFailure = error => ({
	type: LOAD_SINGLE_POST_FAILURE,
	error,
});
// Action Creators
export const loadSinglePosts = id => dispatch => {
	dispatch(loadSinglePostsStart(id));
	return axios({
		method: 'get',
		url: `${API_TG_URL}/post/${id}`,
	})
		.then(res => {
			const { data } = res;
			return dispatch(loadSinglePostsSuccess(data));
		})
		.catch(err => {
			dispatch(loadSinglePostsFailure(err.message));
		});
};

const getDeliveryCoastStart = () => ({
	type: GET_DELIVERY_COAST_START,
});

const getDeliveryCoastSuccess = data => ({
	type: GET_DELIVERY_COAST_SUCCESS,
	...data,
});

const getDeliveryCoastFailure = error => ({
	type: GET_DELIVERY_COAST_FAILURE,
	error,
});

export const getDeliveryCoast = data => dispatch => {
	dispatch(getDeliveryCoastStart());

	const url = 'http://test-api-shop.abo-soft.com/sdek/price';
	return axios({
		method: 'get',
		url,
		params: data ,
	})
		.then(res => {
			const { data } = res;
			return dispatch(getDeliveryCoastSuccess(data));
		})
		.catch(err => {
			dispatch(getDeliveryCoastFailure(err.message));
		});
};
