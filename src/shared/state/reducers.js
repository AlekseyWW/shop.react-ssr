import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import postsReducer from './modules/posts';
import brandsReducer from './modules/brands';
import cartReducer from './modules/cart';
import categoryReducer from './modules/category';
import dataReducer from './modules/data';
import productsReducer from './modules/products';

const rootReducer = combineReducers({
  brands: brandsReducer,
  cart: cartReducer,
  category: categoryReducer,
  data: dataReducer,
  products: productsReducer,
  posts: postsReducer,
  router: routerReducer,
});

export default rootReducer;
