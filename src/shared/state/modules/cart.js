import * as types from '../constants/cart';
import { getExtendedCartList } from 'utils/helpers';

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
			const newList = getExtendedCartList(state.added, { ...action.product }, action.remove);
			localStorage.setItem("cart", JSON.stringify(newList));
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: newList,
				error: null
			};

		case types.SET_CART_SUCCESS:
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: action.data,
				error: null
			};

		case types.ADD_TO_CART_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
				error: action.error
			};
		
		case types.REMOVE_FROM_CART_START:
			return {
				...state,
				isFetching: true
			};

		case types.REMOVE_FROM_CART_SUCCESS:
			const editedList = getExtendedCartList(state.added, { ...action.product }, false, true);
			localStorage.setItem("cart", JSON.stringify(editedList));
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: editedList,
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

		case types.GET_CART_START:
			return {
				...state,
				isFetching: true
			};

		case types.CLEAR_CART_SUCCESS:
			localStorage.setItem("cart", '');
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: [],
				error: null
			};


		case types.CLEAR_CART_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
			};

		default:
			return state;
	}
}
