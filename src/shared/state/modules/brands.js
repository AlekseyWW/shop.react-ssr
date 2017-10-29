import * as types from '../constants/brands';

const initialState = {
	isLoading: false,
	isLoaded: false,
	error: null,
	brands: []
};
export default function brands(state = initialState, action) {
	switch (action.type) {
		case types.GET_BRANDS_START:
			return {
				...state,
				isLoading: true
			};

		case types.GET_BRANDS_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				brands: action.brands,
				error: null
			};


		case types.GET_BRANDS_FAILURE:
			return {
				...state,
				isLoading: false,
				isLoaded: false,
				error: action.error,
				brands: []
			};

		default:
			return state;
	}
}
