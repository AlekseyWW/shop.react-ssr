import axios from 'axios';
import { getExtendedList } from 'utils/helpers';

import { get } from 'utils/api';

// Constants
const SET_PAGINATION = 'SET_PAGINATION';

const initialState = {
	countView: 50,
	offset: 0,
};

// Reducer
export default function (state = initialState, action = {}) {
	switch (action.type) {
		case SET_PAGINATION:
			return {
				...state,
				countView: action.countView,
				offset: action.offset,
			};

		default:
			return state;
	}
}

// Actions

const setPaginationSuccess = (countView, offset) => ({
	type: SET_PAGINATION,
	countView,
	offset,
});


// Action Creators
export const setPagination = (countView, offset) => dispatch => {
	return dispatch(setPaginationSuccess(countView, offset))
};
