import * as types from '../constants/products';
import { getExtendedList } from 'utils/helpers';

const initialState = {
	isLoading: false,
	isLoaded: false,
	error: null,
	products: [],
	allCount: 0,
	countView: 50,
	offset: 0,
	title: '',
	items: [],
	config: {
		offset: 0,
		count: 0,
		sortBy: 'date',
		sex: '',
		categories: '',
		subCategoryId: '',
		filter: {
			brands: '',
			priceFrom: '',
			priceTo: ''
		}
	}
};
export default function products(state = initialState, action) {
	switch (action.type) {
		case types.SET_VIEW_COUNT:
			return {
				...state,
				countView: action.count,
				offset: action.offset
			};

		case types.GET_PRODUCTS_START:
			return {
				...state,
				isLoading: true
			};

		case types.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				products: action.products,
				allCount: action.allCount,
				title: action.title,
				config: { ...state.config, ...action.config },
				error: null
			};


		case types.GET_PRODUCTS_FAILURE:
			return {
				...state,
				isLoading: false,
				isLoaded: false,
				error: action.error,
				products: []
			};

		case types.GET_PRODUCT_INFO_START:
			return {
				...state,
				items: getExtendedList(state.items, action.id, { isLoading: true, isLoaded: false }, true)
			};

		case types.GET_PRODUCT_INFO_SUCCESS:
			return {
				...state,
				items: getExtendedList(state.items, action.id, {
					isLoading: false,
					isLoaded: true,
					...action.product
				})
			};


		default:
			return state;
	}
}
