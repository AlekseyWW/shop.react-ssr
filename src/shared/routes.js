// import universal from 'react-universal-component';
import Home from 'pages/Home';
import Menu from 'pages/Menu';
import MainPage from 'pages/MainPage';
import CatalogPage from 'pages/CatalogPage';
import ProductPage from 'pages/ProductPage';
import SuccessPage from 'pages/SuccessPage';
// import Loader from './components/Loader';
// import NotFound from './components/NotFound';

// const Menu = universal(() => import('./pages/Menu'), {
// 	minDelay: 1200,
// 	loading: Loader,
// 	error: NotFound,
// });

export default [
	{
		path: '/',
		exact: true,
		component: MainPage,
	},
	{
		path: '/catalog',
		exact: true,
		component: CatalogPage,
	},
	{
		path: '/catalog/:categoryId',
		exact: true,
		component: CatalogPage,
	},
	{
		path: '/catalog/:categoryId/:subCategoryId',
		exact: true,
		component: CatalogPage,
	},
	{
		path: '/products/:productId',
		exact: true,
		component: ProductPage,
	},
	{
		path: '/success',
		exact: true,
		component: SuccessPage,
	},
];
