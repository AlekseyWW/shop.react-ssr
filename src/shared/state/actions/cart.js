import * as types from '../constants/cart';
import { post, get, del, patch, setAccessToken, getAccessToken } from 'utils/api';
import { push } from 'react-router-redux'
let alertify = undefined;
const addToCartStart = productId => ({
	type: types.ADD_TO_CART_START,
	productId
});

const addToCartSuccess = (product, remove) => {
	if(typeof alertyfy === 'undefined') {
		alertify = require('alertify.js')
	}
	
	return dispatch => {
		alertify.okBtn("В корзину")
			.cancelBtn("Продолжить").confirm(`<p>Товар "${product.name}" добавлен в корзину</p>`,
			function () {
				dispatch(push('/cart'));
			})
		dispatch({
			type: types.ADD_TO_CART_SUCCESS,
			product,
			remove
		})
	}
	// return dipatch => {
	// 	dispatch({
	// 		type: types.ADD_TO_CART_SUCCESS,
	// 		product,
	// 		remove
	// 	})
	// }
};
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
		const url = remove && !removeAll ? `users/${getAccessToken()}/carts/size-for-colors/${product.sizeId}/decrease` : `users/${getAccessToken()}/carts/size-for-colors/${product.sizeId}`
		dispatch(addToCartStart(product.id, remove));
		const method = remove ? del : post;
		method(
			url,
			{ removeAll },
			response => {
				
				return dispatch(setCartSuccess(response.map(item => ({
						id: item.sizeForColor.color.id,
						name: item.sizeForColor.color.product.name,
						image: item.sizeForColor.color.img,
						slug: item.sizeForColor.color.product.slug,
						color: item.sizeForColor.color.name,
						price: item.sizeForColor.color.price,
						size: item.sizeForColor.size,
						sizeId: item.sizeForColor.id,
						count: item.quantity
					}
					))
				));
			},
			error => dispatch(addToCartError(error.message))
		)
	} else {
		if (removeAll) {
			dispatch(removeFromCartSuccess(product));
		} else {
			
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
		`/users/${accessTokenStorage}/carts`,
		{ },
		response => {
			
			return dispatch(setCartSuccess(response.map(item => ({
					id: item.sizeForColor.color.id,
					name: item.sizeForColor.color.product.name,
					color: item.sizeForColor.color.name,
					slug: item.sizeForColor.color.product.slug,
					price: item.sizeForColor.color.price,
					image: item.sizeForColor.color.img,
					price: item.sizeForColor.color.price,
					size: item.sizeForColor.size,
					sizeId: item.sizeForColor.id,
					count: item.quantity
				}))
			));
		},
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
