import * as types from '../constants/cart';
import { post, get, del, patch, setAccessToken, getAccessToken } from 'utils/api';



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

export const addToCart = (product, remove, removeAll) => (dispatch) => {
	if (getAccessToken()) {
		const url = `users/${getAccessToken()}/cart/${product.id}`
		dispatch(addToCartStart(product.id, remove));
		const method = remove ? del : post;
		method(
			url,
			{ removeAll },
			response => dispatch(setCartSuccess(response)),
			error => dispatch(addToCartError(error.message)),
			null,
			'https://private-0b0d2-onlineshop2.apiary-mock.com/'
		)
	} else {
		if (removeAll) {
			dispatch(removeFromCartSuccess(product));
		} else {
			console.log({ remove});
			
			dispatch(addToCartSuccess(product, remove));
		}
	}
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

export const getCart = (accessTokenStorage) => (dispatch) => {
	dispatch(getCartStart());
	get(
		`/users/${accessTokenStorage}/cart`,
		{ },
		response => dispatch(getCartSuccess(response)),
		error => dispatch(getCartError(error.message)),
		null,
		'https://private-0b0d2-onlineshop2.apiary-mock.com/'
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
