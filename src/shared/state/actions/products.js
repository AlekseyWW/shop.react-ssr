import * as types from '../constants/products';
import axios from 'axios';
import { get } from 'utils/api';

const getProductInfoStart = id => ({
	type: types.GET_PRODUCT_INFO_START,
	id
});

const getProductInfoSuccess = (id, product) => ({
	type: types.GET_PRODUCT_INFO_SUCCESS,
	id,
	product
});

const getProductInfoError = error => ({
	type: types.GET_PRODUCT_INFO_FAILURE,
	error
});

export const getProductInfo = productId => (dispatch) => {
	dispatch(getProductInfoStart(productId));
	get(
		`/products/${productId}`,
		{},
		response => dispatch(getProductInfoSuccess(productId, response)),
		error => dispatch(getProductInfoError(error.message))
	);
};

const getProductsStart = () => ({
	type: types.GET_PRODUCTS_START
});

const getProductsSuccess = (products, allCount, title, config) => (dispatch) => {
	dispatch({
		type: types.GET_PRODUCTS_SUCCESS,
		products,
		allCount,
		title,
		config
	});
};

const getProductsError = error => {
	return ({
		type: types.GET_PRODUCTS_FAILURE,
		error
	})
};

// export const getProducts = data => (dispatch) => {
// 	dispatch(getProductsStart());
// 	get(
// 		'/products',
// 		data,
// 		response => dispatch(getProductsSuccess(
// 			response.products,
// 			response.all_count,
// 			response.title,
// 			response.config)),
// 		error => dispatch(getProductsError(error.message))
// 	);
// };
export const getProducts = (data) => {
	return dispatch => {
		dispatch(getProductsStart());
		return axios
		.get('https://private-fc561-eshopexample.apiary-mock.com/products')
		.then(res => {
			/* istanbul ignore next */
			const { data } = res;
			/* istanbul ignore next */
			return dispatch(getProductsSuccess(
				data.products,
				data.all_count,
				data.title,
				data.config
			));
		})
		.catch(err => dispatch(getProductsError(err)));
	};
};
