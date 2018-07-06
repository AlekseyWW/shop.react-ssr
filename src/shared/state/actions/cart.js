import * as types from '../constants/cart';
import { push } from 'react-router-redux';
let alertify = undefined;

const addToCartSuccess = (product, remove, isFromCart) => {
	if (typeof alertyfy === 'undefined') {
		alertify = require('alertify.js');
	}
	return dispatch => {
		if (!isFromCart) {
			alertify
				.okBtn('В корзину')
				.cancelBtn('Продолжить')
				.confirm(
					`<p>Товар "${product.name}" добавлен в корзину</p>`,
					function() {
						dispatch(push('/cart'));
					}
				);
		}
		dispatch({
			type: types.ADD_TO_CART_SUCCESS,
			product,
			remove,
		});
	};
};

const setCartSuccess = data => ({
	type: types.SET_CART_SUCCESS,
	data,
});

export const addToCart = (
	product,
	remove,
	removeAll,
	isFromCart
) => dispatch => {
	if (typeof alertyfy === 'undefined') {
		alertify = require('alertify.js');
	}

	if (removeAll) {
		dispatch(removeFromCartSuccess(product));
	} else {
		dispatch(addToCartSuccess(product, remove, isFromCart));
	}
};

export const setCart = data => dispatch => {
	dispatch(setCartSuccess(data));
};

const removeFromCartSuccess = product => ({
	type: types.REMOVE_FROM_CART_SUCCESS,
	product,
});

export const removeFromCart = product => dispatch => {
	dispatch(removeFromCartSuccess(product));
};

const clearCartSuccess = () => ({
	type: types.CLEAR_CART_SUCCESS,
});

export const clearCart = () => dispatch => {
	dispatch(clearCartSuccess());
};
