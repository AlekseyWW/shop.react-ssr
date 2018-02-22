import * as types from '../constants/category';

const initialState = {
	categories: {
		isLoading: false,
		isLoaded: false,
		items: [],
		error: null,
	},
	promoCategories: {
		isLoading: false,
		isLoaded: false,
		items: [],
		error: null,
	},
	stockCategories: {
		isLoading: false,
		isLoaded: false,
		items: [],
		error: null,
	}
};
export default function categories(state = initialState, action) {
	switch (action.type) {
		case types.GET_CATEGORIES_START:
			return {
				...state,
				categories: {
					isLoading: true,
					isLoaded: false,
					items: [],
					error: null
				}
			};

		case types.GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: {
					isLoading: false,
					isLoaded: true,
					items: action.categories,
					error: null
				}
			};


		case types.GET_CATEGORIES_FAILURE:
			return {
				...state,
				categories: {
					isLoading: false,
					isLoaded: false,
					items: [],
					error: action.error
				}
			};

		case types.GET_STOCK_CATEGORIES_START:
			return {
				...state,
				stockCategories: {
					isLoading: true,
					isLoaded: false,
					items: [],
					error: null
				}
			};

		case types.GET_STOCK_CATEGORIES_SUCCESS:
			return {
				...state,
				stockCategories: {
					isLoading: false,
					isLoaded: true,
					items: action.categories,
					error: null
				}
			};


		case types.GET_STOCK_CATEGORIES_FAILURE:
			return {
				...state,
				stockCategories: {
					isLoading: false,
					isLoaded: false,
					items: [],
					error: action.error
				}
			};

		case types.GET_PROMO_CATEGORIES_START:
			return {
				...state,
				promoCategories: {
					isLoading: true,
					isLoaded: false,
					items: [],
					error: null
				}
			};

		case types.GET_PROMO_CATEGORIES_SUCCESS:
			return {
				...state,
				promoCategories: {
					isLoading: false,
					isLoaded: true,
					items: action.categories,
					error: null
				}
			};


		case types.GET_PROMO_CATEGORIES_FAILURE:
			return {
				...state,
				promoCategories: {
					isLoading: false,
					isLoaded: false,
					items: [],
					error: action.error
				}
			};

		default:
			return state;
	}
}
