import * as types from '../constants/favorites';
import { getExtendedCartList, getExtendedList } from 'utils/helpers';

const initialState = {
	isFetching: false,
	isFetched: false,
	error: null,
	added: []
};
export default function cart(state = initialState, action) {
	switch (action.type) {
		case types.ADD_TO_FAVORITES_START:
			return {
				...state,
				isFetching: true
			};

		case types.ADD_TO_FAVORITES_SUCCESS:
			const newList = getExtendedCartList(state.added, { ...action.product }, action.remove);
			console.log(action.product);
			
			localStorage.setItem("favorites", JSON.stringify(newList));
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: newList,
				error: null
			};

		case types.SET_FAVORITES_SUCCESS:
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: action.data,
				error: null
			};

		case types.ADD_TO_FAVORITES_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
				error: action.error
			};

		case types.REMOVE_FROM_FAVORITES_START:
			return {
				...state,
				isFetching: true
			};

		case types.REMOVE_FROM_FAVORITES_SUCCESS:
			const editedList = getExtendedList(state.added, action.product ,{}, false, true);
			localStorage.setItem("vaforites", JSON.stringify(editedList));
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

		case types.GET_FAVORITES_START:
			return {
				...state,
				isFetching: true
			};

		case types.GET_FAVORITES_SUCCESS:
			return {
				...state,
				isFetching: false,
				isFetched: true,
				added: action.product,
				error: null
			};


		case types.GET_FAVORITES_FAILURE:
			return {
				...state,
				isFetching: false,
				isFetched: false,
			};

		default:
			return state;
	}
}
