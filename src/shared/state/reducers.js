import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import orderReducer from './modules/order';
import { reducer as formReducer } from 'redux-form';
import brandsReducer from './modules/brands';
import cartReducer from './modules/cart';
import categoryReducer from './modules/category';
import dataReducer from './modules/data';
import productsReducer from './modules/products';
import modal from './modules/modal';
import sdek from './modules/sdek';
import slider from './modules/slider';
import user from './modules/user';
import pagination from './modules/pagination';
import favorites from './modules/favorites';

const rootReducer = combineReducers({
  brands: brandsReducer,
  cart: cartReducer,
  category: categoryReducer,
  data: dataReducer,
  products: productsReducer,
  order: orderReducer,
  router: routerReducer,
  sdek,
  modal,
  slider,
  user,
  favorites,
  pagination,
  form: formReducer
});

export default rootReducer;
