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

export const getProductInfo = (productId, data) => (dispatch) => {
	dispatch(getProductInfoStart(productId));
	return get(
		`/products/${productId}`,
		{...data},
		response => dispatch(getProductInfoSuccess(productId, response)),
		error => dispatch(getProductInfoError(error.message))
	);
};
const searchProductsStart = () => ({
	type: types.SEARCH_START,
});

const searchProductsSuccess = (product) => ({
	type: types.SEARCH_SUCCESS,
	products
});

const searchProductsError = error => ({
	type: types.SEARCH_FAILURE,
	error
});

export const searchProducts = (value) => (dispatch) => {
	dispatch(searchProductsStart());
	
	return get(
		`products/search/${value}`,
		{},
		response => dispatch(searchProductsSuccess(response)),
		error => dispatch(searchProductsError(error.message))
	);
};

const getProductsStart = () => ({
	type: types.GET_PRODUCTS_START
});

const getProductsSuccess = (products, allCount, sizes, category, data) => (dispatch) => {
	dispatch({
		type: types.GET_PRODUCTS_SUCCESS,
		products,
		allCount,
		sizes,
		category,
		data
	});
};

const getProductsError = error => {
	return ({
		type: types.GET_PRODUCTS_FAILURE,
		error
	})
};

export const getProducts = (data, category = false) => (dispatch) => {
	dispatch(getProductsStart());
	const url = category ? `/categories/${category}/colors` : '/colors';
	return get(
		url,
		data,
		response => dispatch(getProductsSuccess(
			response.colors,
			response.all_count,
			response.sizes,
			category,
			data
		)),
		error => dispatch(getProductsError(error.message))
	);
};

const getPromoProductsStart = () => ({
	type: types.GET_PROMO_PRODUCTS_START
});

const getPromoProductsSuccess = (products) => (dispatch) => {
	dispatch({
		type: types.GET_PROMO_PRODUCTS_SUCCESS,
		products
	});
};

const getPromoProductsError = error => {
	return ({
		type: types.GET_PROMO_PRODUCTS_FAILURE,
		error
	})
};

export const getPromoProducts = data => (dispatch) => {
	dispatch(getPromoProductsStart());
	return get(
		'/colors/top',
		data,
		response => dispatch(getPromoProductsSuccess(response)),
		error => dispatch(getPromoProductsError(error.message))
	);
};
