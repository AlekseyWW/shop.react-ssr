import * as types from '../constants/cart';
import { get } from 'utils/api';


const addToCartStart = productId => ({
	type: types.ADD_TO_CART_START,
	productId
});

const addToCartSuccess = (product, remove) => ({
	type: types.ADD_TO_CART_SUCCESS,
	product,
	remove
});
const setCartSuccess = data => ({
	type: types.SET_CART_SUCCESS,
	data
});

const addToCartError = error => ({
	type: types.ADD_TO_CART_FAILURE,
	error
});

export const addToCart = (product, remove) => (dispatch) => {
	dispatch(addToCartSuccess(product, remove));
};

export const setCart = data => (dispatch) => {
	dispatch(setCartSuccess(data));
};

const removeFromCartStart = productId => ({
	type: types.REMOVE_FROM_CART_START,
	productId
});

const removeFromCartSuccess = product => ({
	type: types.REMOVE_FROM_CART_SUCCESS,
	product
});

const removeFromCartError = error => ({
	type: types.REMOVE_FROM_CART_FAILURE,
	error
});

export const removeFromCart = product => (dispatch) => {
	dispatch(removeFromCartSuccess(product));
};
const getCartStart = () => ({
	type: types.GET_CART_START
});

const getCartSuccess = product => ({
	type: types.GET_CART_SUCCESS,
	product
});

const getCartError = error => ({
	type: types.GET_CART_FAILURE,
	error
});

export const getCart = () => (dispatch) => {
	dispatch(getCartStart());
	get(
		'/cart',
		{ },
		response => dispatch(getCartSuccess(response)),
		error => dispatch(getCartError(error.message))
	);
};

const clearCartSuccess = () => ({
	type: types.CLEAR_CART_SUCCESS,
});

const clearCartError = error => ({
	type: types.CLEAR_CART_FAILURE,
	error
});

export const clearCart = () => (dispatch) => {
	dispatch(clearCartSuccess());
	// get(
	// 	'/cart',
	// 	{ },
	// 	response => dispatch(clearCartSuccess(response)),
	// 	error => dispatch(clearCartError(error.message))
	// );
};
