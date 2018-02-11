import axios from 'axios';
import { getExtendedList } from 'utils/helpers';

// Constants
const LOAD_SLIDER_START = 'LOAD_SLIDER_START';
const LOAD_SLIDER_SUCCESS = 'LOAD_SLIDER_SUCCESS';
const LOAD_SLIDER_FAILURE = 'LOAD_SLIDER_FAILURE';


const initialState = {
	isLoading: false,
	isLoaded: false,
	slider: [],
	error: null,
};

// Reducer
export default function (state = initialState, action = {}) {
	switch (action.type) {
		case LOAD_SLIDER_START:
			return {
				...state,
				isLoading: true,
			};

		case LOAD_SLIDER_SUCCESS:
			
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				slider: action.data,
				total: action.total,
			};

		case LOAD_SLIDER_FAILURE:
			return {
				...state,
				isLoading: false,
				isLoaded: false,
				slider: [],
				error: action.error,
			};
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
const loadSliderStart = () => ({
	type: LOAD_SLIDER_START,
});

const loadSliderSuccess = data => ({
	type: LOAD_SLIDER_SUCCESS,
	data,
});

const loadSliderFailure = error => ({
	type: LOAD_SLIDER_FAILURE,
	error,
});

// Action Creators
export const loadSlider = () => dispatch => {
	dispatch(loadSliderStart());
	const url = 'http://test-api-shop.abo-soft.com/slider-items';
	return axios({
		method: 'get',
		url,
	})
		.then(res => {
			const { data } = res;
			console.log('====================================');
			console.log(data);
			console.log('====================================');
			return dispatch(loadSliderSuccess(data));
		})
		.catch(err => {
			dispatch(loadSliderFailure(err.message));
		});
};
