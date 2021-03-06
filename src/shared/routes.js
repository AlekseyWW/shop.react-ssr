import MainPage from 'pages/MainPage';
import CatalogPage from 'pages/CatalogPage';
import ProductPage from 'pages/ProductPage';
import SuccessPage from 'pages/SuccessPage';
import OrderSuccessPage from 'pages/OrderSuccessPage';
import CartPage from 'pages/CartPage';
import OrderFormPage from 'pages/OrderFormPage';
import OrderPage from 'pages/OrderPage';
import FavoritesPage from 'pages/FavoritesPage';
import UserPage from 'pages/UserPage';
import Delivery from 'pages/Delivery';
import Agreement from 'pages/Agreement';
import Info from 'pages/Info';
import Return from 'pages/Return';
import Search from 'pages/Search';
import Contacts from 'pages/Contacts';

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
		path: '/:stockId/catalog',
		exact: true,
		component: CatalogPage,
	},
	{
		path: '/:stockId/catalog/:categoryId',
		exact: true,
		component: CatalogPage,
	},
	{
		path: '/:stockId/catalog/:categoryId/:subCategoryId',
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
	{
		path: '/cart',
		exact: true,
		component: CartPage,
	},
	{
		path: '/favorites',
		exact: true,
		component: FavoritesPage,
	},
	{
		path: '/order',
		exact: true,
		component: OrderFormPage,
	},
	{
		path: '/order/:id',
		exact: true,
		component: OrderPage,
	},
	{
		path: '/checkout',
		exact: true,
		component: OrderSuccessPage,
	},
	{
		path: '/user',
		exact: true,
		component: UserPage,
	},
	{
		path: '/user/delivery',
		exact: true,
		component: Delivery,
	},
	{
		path: '/agreement',
		exact: true,
		component: Agreement,
	},
	{
		path: '/info',
		exact: true,
		component: Info,
	},
	{
		path: '/return',
		exact: true,
		component: Return,
	},
	{
		path: '/search',
		exact: true,
		component: Search,
	},
	{
		path: '/contacts',
		exact: true,
		component: Contacts,
	},
];
