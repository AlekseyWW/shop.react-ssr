import axios from 'axios';
import { post } from 'utils/api';

export const FETCH_ORDER_REQUEST = '@ORDER/FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = '@ORDER/FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = '@ORDER/FETCH_ORDER_FAILURE';

export function requestOrderStart() {
	return { type: FETCH_ORDER_REQUEST };
}

export function requestOrderDone(data) {
	return {
		type: FETCH_ORDER_SUCCESS,
		payload: data,
	};
}

export function requestOrderFail(err) {
	return {
		type: FETCH_ORDER_FAILURE,
		error: err,
	};
}

export const fetchOrder = (data) => {
	return dispatch => {
		dispatch(requestOrderStart());
		return post(
			'/order',
			{...data},
			response => dispatch(requestOrderDone(response)),
			error => dispatch(requestOrderFail(error.message))
		);
	};
};



const initialState = {
	order: {},
	isFetching: false,
	error: null,
};

export default function postsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ORDER_REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_ORDER_SUCCESS:
			return {
				...state,
				isFetching: false,
				order: action.payload,
			};
		case FETCH_ORDER_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
			};
		default:
			return state;
	}
}
