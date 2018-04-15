import * as types from '../constants/products';
import { getExtendedList } from 'utils/helpers';

const initialState = {
	isLoading: false,
	isLoaded: false,
	isPromoLoading: false,
	isPromoLoaded: false,
	error: null,
	products: [],
	allCount: 0,
	countView: 50,
	offset: 0,
	title: '',
	items: [],
	category: '',
	sizes: [],
	isSearching: false,
	isSearched: false,
	searchProducts: [],
	promoProducts: []
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
				sizes: action.sizes,
				category: action.category,
				config: action.data,
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

		case types.GET_PROMO_PRODUCTS_START:
			return {
				...state,
				isPromoLoading: true,
			};

		case types.GET_PROMO_PRODUCTS_SUCCESS:
			return {
				...state,
				isPromoLoading: false,
				isPromoLoaded: true,
				promoProducts: action.products.colors,
				error: null
			};

		case types.GET_PROMO_PRODUCTS_FAILURE:
			return {
				...state,
				isPromoLoading: false,
				isPromoLoaded: false,
				error: action.error,
				promoProducts: []
			};

		case types.SEARCH_START:
			return {
				...state,
				isSearching: true,
			};

		case types.SEARCH_SUCCESS:
			return {
				...state,
				isSearching: false,
				isSearched: true,
				searchProducts: action.products.colors,
				error: null
			};

		case types.SEARCH_FAILURE:
			return {
				...state,
				isSearching: false,
				isSearched: false,
				error: action.error,
				searchProducts: []
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
