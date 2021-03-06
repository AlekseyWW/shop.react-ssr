import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import HeaderInfo from 'components/HeaderInfo';
import { connect } from 'react-redux';
import LogoLine from 'components/LogoLine';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import headerData from 'config/header';
import ModalExample from '../../components/ModalExample';
import * as categoryAction from 'actions/category';
import * as favoritesAction from 'actions/favorites';
import * as authActions from '../../state/actions/user';
import * as cartAction from 'actions/cart';
import * as productsAction from 'actions/products';
import style from './styles.styl';
import { actions } from '../../state/modules/modal.js';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

class Header extends Component {
	constructor(props) {
		super(props);
		this.loginModalOpen = this.loginModalOpen.bind(this);
		this.openRegisterModal = this.openRegisterModal.bind(this);
		this.search = this.search.bind(this);
		this.fetchDistribution = this.fetchDistribution.bind(this);
	}
	componentDidMount() {
		const {
			isLoaded,
			isLoading,
			getCategories,
			setCart,
			getStockCategories,
			setFavorites,
		} = this.props;
		if (!isLoaded && !isLoading) {
			getCategories();
		}
		if (!getStockCategories.isLoaded && !getStockCategories.isLoading) {
			getStockCategories();
		}
		const cart = localStorage.getItem('cart');
		const orderStorage = localStorage.getItem('orderId');
		const deliveryType = localStorage.getItem('orderId');
		const favorites = localStorage.getItem('favorites');
		if (cart) {
			setCart(JSON.parse(cart));
		}
		if (favorites) {
			setFavorites(JSON.parse(favorites));
		}
		const { orderId } = qs.parse(this.props.history.location.search);

		if (orderStorage === orderId) {
			const time = deliveryType === 'post' ? '6-15' : '2-6';
			const text =
				deliveryType === 'courier'
					? 'В течении 15 минут с Вами свяжется менеджер, для уточнения деталей доставки.'
					: `Ваш заказ №${orderId} будет доставлен в течение ${time} дней. Вам поступит SMS уведомление с трек номером заказа – для отслеживания.`;
			localStorage.setItem('orderId', '');
			localStorage.setItem('deliveryType', '');
			yaCounter47068560.reachGoal('PAYMENT');
			this.props.openModal({
				modalType: ModalExample,
				onClose: () => {
					this.props.history.push('/');
					this.props.clearCart();
					localStorage.setItem('order', '');
				},
				modalProps: {
					title: `Спасибо, Ваш заказ оформлен`,
					status: 'order',
					text: <p>{text}</p>,
					subTitle: '',
					hasClose: true,
				},
			});
		}
	}
	setTimeout = null;
	search = (input, val) => {
		const value = input ? input.target.value : val;
		if (this.setTimeout) {
			clearTimeout(this.setTimeout);
		}
		this.setTimeout = setTimeout(() => {
			this.props.searchProducts(value);
		}, 1000);
	};
	onSuccess() {
		this.props.closeModal();
		this.props.history.replace('/success');
	}
	fetchDistribution = data => {
		const url = `${process.env.API_URL}/email-subscription`;
		return axios({
			method: 'post',
			url,
			data,
		})
			.then(res => {
				const { data } = res;
				return this.onSuccess();
			})
			.catch(err => {
				console.log(err.message);
			});
	};
	openRegisterModal() {
		if (!localStorage.getItem('accessToken')) {
			this.props.openModal({
				modalType: ModalExample,
				modalProps: {
					className: 'RegisterForm__wrapper',
					title: 'Регистрация',
					loginModalOpen: this.loginModalOpen,
					text: <RegisterForm onSubmit={this.props.register} />,
					hasClose: true,
				},
			});
		}
	}

	loginModalOpen() {
		this.props.openModal({
			modalType: ModalExample,
			modalProps: {
				className: 'LoginForm__wrapper',
				openRegisterModal: this.openRegisterModal,
				title: 'Вход',
				text: <LoginForm onSubmit={this.props.login} />,
				hasClose: true,
			},
		});
	}
	render() {
		const { cart, favorites, profile, logout, isFetching } = this.props;

		return (
			<div className={style.Header}>
				<HeaderInfo
					data={headerData}
					loginModalOpen={
						!profile
							? this.loginModalOpen
							: () => this.props.history.push('/user')
					}
					logout={logout}
				/>
				<LogoLine
					isFetching={isFetching}
					searchProducts={this.search}
					logout={logout}
					cart={cart}
					isFavorite={favorites.length > 0}
					loginModalOpen={this.loginModalOpen}
					profile={profile}
				/>
			</div>
		);
	}
}

Header.propTypes = {
	items: PropTypes.array.isRequired,
	getCategories: PropTypes.func.isRequired,
	getStockCategories: PropTypes.func.isRequired,
	cart: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
	const { isLoaded, isLoading, items } = state.category.categories;
	const { added: favorites } = state.favorites;
	const {
		profile,
		isFetching,
		profileIsLoaded,
		profileIsLoading,
		accessToken,
		error,
	} = state.user;
	const cart = state.cart.added;
	return {
		isLoaded,
		isLoading,
		isFetching,
		accessToken,
		items,
		cart,
		error,
		favorites,
		profile,
		profileIsLoaded,
		profileIsLoading,
	};
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories()),
	searchProducts: value => dispatch(productsAction.searchProducts(value)),
	getStockCategories: () => dispatch(categoryAction.getStockCategories()),
	setCart: cart => dispatch(cartAction.setCart(cart)),
	openModal: modalParams => dispatch(actions.openModal(modalParams)),
	closeModal: () => dispatch(actions.closeModal()),
	setFavorites: favorites =>
		dispatch(favoritesAction.setFavorites(favorites)),
	login: favorites => dispatch(authActions.login(favorites)),
	logout: favorites => dispatch(authActions.logout(favorites)),
	register: data => dispatch(authActions.register(data)),
	loginSuccess: favorites => dispatch(authActions.loginSuccess(favorites)),
	getProfile: accessToken => dispatch(authActions.getProfile(accessToken)),
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Header)
);
