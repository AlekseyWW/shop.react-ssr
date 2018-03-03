import * as types from '../constants/category';
import axios from 'axios';
import { get } from 'utils/api';

const getCategoriesStart = () => ({
	type: types.GET_CATEGORIES_START
});

const getCategoriesSuccess = categories => ({
	type: types.GET_CATEGORIES_SUCCESS,
	categories
});

const getCategoriesError = error => ({
	type: types.GET_CATEGORIES_FAILURE,
	error
});

export const getCategories = () => (dispatch) => {
	dispatch(getCategoriesStart());
	return get(
		'/categories',
		{ },
		response => dispatch(getCategoriesSuccess(response)),
		error => dispatch(getCategoriesError(error.message))
	);
};

const getStockCategoriesStart = () => ({
	type: types.GET_STOCK_CATEGORIES_START
});

const getStockCategoriesSuccess = categories => ({
	type: types.GET_STOCK_CATEGORIES_SUCCESS,
	categories
});

const getStockCategoriesError = error => ({
	type: types.GET_STOCK_CATEGORIES_FAILURE,
	error
});

export const getStockCategories = () => (dispatch) => {
	dispatch(getStockCategoriesStart());
	return get(
		'/custom-categories',
		{ },
		response => dispatch(getStockCategoriesSuccess(response)),
		error => dispatch(getStockCategoriesError(error.message))
	);
};

const getPromoCategoriesStart = () => ({
	type: types.GET_PROMO_CATEGORIES_START
});

const getPromoCategoriesSuccess = categories => (dispatch) => {
	dispatch ({
		type: types.GET_PROMO_CATEGORIES_SUCCESS,
		categories
	})
};

const getPromoCategoriesError = error => ({
	type: types.GET_PROMO_CATEGORIES_FAILURE,
	error
});

export const getPromoCategories = () => (dispatch) => {
	dispatch(getPromoCategoriesStart());
	return get(
		'/categories/promo',
		{ },
		response => dispatch(getPromoCategoriesSuccess(response)),
		error => dispatch(getPromoCategoriesError(error.message))
	);
};

