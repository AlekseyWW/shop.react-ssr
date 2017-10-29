import * as types from '../constants/brands.js';
import { get } from 'utils/api';

const getBrandsStart = () => ({
	type: types.GET_BRANDS_START
});

const getBrandsSuccess = brands => ({
	type: types.GET_BRANDS_SUCCESS,
	brands
});

const getBrandsError = error => ({
	type: types.GET_BRANDS_FAILURE,
	error
});

const getBrands = () => (dispatch) => {
	dispatch(getBrandsStart());
	get(
		'/brands',
		{ },
		response => dispatch(getBrandsSuccess(response)),
		error => dispatch(getBrandsError(error.message))
	);
};

export default getBrands;
