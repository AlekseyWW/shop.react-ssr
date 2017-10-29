import * as types from '../constants/cart';
import { get } from 'utils/api';


const addToCartStart = productId => ({
	type: types.ADD_TO_CART_START,
	productId
});

const addToCartSuccess = product => ({
	type: types.ADD_TO_CART_SUCCESS,
	product
});

const addToCartError = error => ({
	type: types.ADD_TO_CART_FAILURE,
	error
});

export const addToCart = productId => (dispatch) => {
	dispatch(addToCartStart(productId));
	get(
		`/add-to-cart/${productId}`,
		{ },
		response => dispatch(addToCartSuccess(response)),
		error => dispatch(addToCartError(error.message))
	);
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

export const removeFromCart = productId => (dispatch) => {
	dispatch(removeFromCartStart(productId));
	get(
		`/remove-from-cart/${productId}`,
		{ },
		response => dispatch(removeFromCartSuccess(response)),
		error => dispatch(removeFromCartError(error.message))
	);
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
