import * as types from '../constants/data';
import { get } from 'utils/api';

const getDataStart = () => ({
	type: types.GET_DATA_START
});

const getDataSuccess = data => ({
	type: types.GET_DATA_SUCCESS,
	data
});

const getDataError = error => ({
	type: types.GET_DATA_FAILURE,
	error
});

const getData = () => (dispatch) => {
	dispatch(getDataStart());
	get(
		'/data',
		{ },
		response => dispatch(getDataSuccess(response)),
		error => dispatch(getDataError(error.message))
	);
};

export default getData;
