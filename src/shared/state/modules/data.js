import * as types from '../constants/data';

const initialState = {
	isLoading: false,
	isLoaded: false,
	header: {
		contacts: [],
		links: []
	},
	categories: [],
	login: {
		url: '',
		label: ''
	}
};
export default function categories(state = initialState, action) {
	switch (action.type) {
		case types.GET_DATA_START:
			return {
				...state,
				isLoading: true
			};

		case types.GET_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				header: action.data.header,
				categories: action.data.categories,
				login: action.data.login
			};


		case types.GET_DATA_FAILURE:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				header: {},
				categories: [],
				login: {}
			};

		default:
			return state;
	}
}
