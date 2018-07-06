import * as types from '../constants/favorites';

const addToFavoritesSuccess = (product, remove) => ({
	type: types.ADD_TO_FAVORITES_SUCCESS,
	product,
	remove,
});
const setFavoritesSuccess = data => ({
	type: types.SET_FAVORITES_SUCCESS,
	data,
});

export const addToFavorites = (product, remove) => dispatch => {
	if (remove) {
		dispatch(removeFromFavoritesSuccess(product.id));
	} else {
		dispatch(addToFavoritesSuccess(product));
	}
};

export const setFavorites = data => dispatch => {
	dispatch(setFavoritesSuccess(data));
};

const removeFromFavoritesSuccess = product => ({
	type: types.REMOVE_FROM_FAVORITES_SUCCESS,
	product,
});

export const removeFromFavorites = product => dispatch => {
	dispatch(removeFromFavoritesSuccess(product));
};
