import * as types from '../constants/cart';
import { getExtendedList } from 'utils/helpers';

const initialState = {
	isFetching: false,
	isFetched: false,
	error: null,
	added: []
};
export default function cart(state = initialState, action) {
	switch (action.type) {
		case types.ADD_TO_CART_START:
			return {
				...state,
				isFetching: true
			};

		case types.ADD_TO_CART_SUCCESS:
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: getExtendedList(state.added, action.product),
				error: null
			};

		case types.ADD_TO_CART_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
				error: action.error
			};
		
		case types.REMOVE_FROM_START:
			return {
				...state,
				isFetching: true
			};

		case types.REMOVE_FROM_SUCCESS:
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: getExtendedList(state.added, action.product),
				error: null
			};

		case types.REMOVE_FROM_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
				error: action.error
			};

		case types.GET_CART_START:
			return {
				...state,
				isFetching: true
			};

		case types.GET_CART_SUCCESS:
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: action.product,
				error: null
			};


		case types.GET_CART_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
			};

		default:
			return state;
	}
}
