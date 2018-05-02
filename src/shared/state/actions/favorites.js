import * as types from '../constants/favorites';
import { get, post, del, getAccessToken } from 'utils/api';


const addToFavoritesStart = productId => ({
	type: types.ADD_TO_FAVORITES_START,
	productId
});

const addToFavoritesSuccess = (product, remove) => ({
	type: types.ADD_TO_FAVORITES_SUCCESS,
	product,
	remove
});
const setFavoritesSuccess = data => ({
	type: types.SET_FAVORITES_SUCCESS,
	data
});

const addToFavoritesError = error => ({
	type: types.ADD_TO_FAVORITES_FAILURE,
	error
});

export const addToFavorites = (product, remove) => (dispatch) => {
	
	if (getAccessToken()) {
		
		const url = `users/${getAccessToken()}/colors/${product.id || product}/favourite`
		dispatch(addToFavoritesStart(product.id, remove));
		const method = remove ? del : post;
		method(
			url,
			{ },
			response => dispatch(getFavorites()),
			error => dispatch(addToFavoritesError(error.message)),
		)
	} else {
		if (remove) {
			dispatch(removeFromFavoritesSuccess(product.id));
		} else {
			dispatch(addToFavoritesSuccess(product));
		}
	}
};

export const setFavorites = data => (dispatch) => {
	dispatch(setFavoritesSuccess(data));
};

const removeFromFavoritesStart = productId => ({
	type: types.REMOVE_FROM_FAVORITES_START,
	productId
});

const removeFromFavoritesSuccess = product => ({
	type: types.REMOVE_FROM_FAVORITES_SUCCESS,
	product
});

const removeFromFavoritesError = error => ({
	type: types.REMOVE_FROM_FAVORITES_FAILURE,
	error
});

export const removeFromFavorites = product => (dispatch) => {
	dispatch(removeFromFavoritesSuccess(product));
};
const getFavoritesStart = () => ({
	type: types.GET_FAVORITES_START
});

const getFavoritesSuccess = product => ({
	type: types.GET_FAVORITES_SUCCESS,
	product
});

const getFavoritesError = error => ({
	type: types.GET_FAVORITES_FAILURE,
	error
});

export const getFavorites = (accessToken) => (dispatch) => {
	dispatch(getFavoritesStart());
	get(
		`/users/${getAccessToken()}/colors/favourite`,
		{ },
		response => dispatch(getFavoritesSuccess(response || [])),
		error => dispatch(getFavoritesError(error.message)),
	);
};
