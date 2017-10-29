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
	get(
		'/categories',
		{ },
		response => dispatch(getCategoriesSuccess(response)),
		error => dispatch(getCategoriesError(error.message))
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
	axios.get('https://private-fc561-eshopexample.apiary-mock.com/categories/promo')
	.then(res => {
		const { data } = res;
		return dispatch(getPromoCategoriesSuccess(data));
	})
	.catch(error => dispatch(getPromoCategoriesError(error.message)));
};

