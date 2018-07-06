import { get } from 'utils/api';

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
export default function(state = initialState, action = {}) {
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
	const url = '/slider-items';
	return get(
		url,
		{},
		response => dispatch(loadSliderSuccess(response)),
		error => dispatch(loadSliderFailure(err.message))
	);
};
