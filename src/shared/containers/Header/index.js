import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderInfo from 'components/HeaderInfo';
import { connect } from 'react-redux';
import Menu from 'containers/Menu';
import LogoLine from 'components/LogoLine';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import headerData from 'config/header';
import ModalExample from '../../components/ModalExample';
import * as categoryAction from 'actions/category';
import * as favoritesAction from 'actions/favorites';
import * as authActions from '../../state/actions/user';
import * as cartAction from 'actions/cart';
import style from './styles.styl';
import { setCart } from '../../state/actions/cart';
import { actions } from '../../state/modules/modal.js';

class Header extends Component { 
	constructor(props) {
		super(props);
		this.loginModalOpen = this.loginModalOpen.bind(this)
		this.openRegisterModal = this.openRegisterModal.bind(this)
	}
	componentDidMount() {
		const { getFavorites, isLoaded, isLoading, accessToken, getCategories, setCart, setFavorites, loginSuccess, getProfile, getCart, getStockCategories} = this.props;
		if (!isLoaded && !isLoading) getCategories();
		if (!getStockCategories.isLoaded && !getStockCategories.isLoading) getStockCategories();
		const cart = localStorage.getItem("cart");
		const favorites = localStorage.getItem("favorites");
		const accessTokenStorage = localStorage.getItem("accessToken");
		
		if (favorites && !accessTokenStorage) {
			setFavorites(JSON.parse(favorites));
		}
		if (accessTokenStorage) {
			loginSuccess(accessTokenStorage);
			
			getProfile(accessTokenStorage);
		}
		if (accessTokenStorage) {
			getCart(accessTokenStorage);
			getFavorites(accessTokenStorage);
		} else if(cart) {
			setCart(JSON.parse(cart));
		}
		if (!accessTokenStorage) {
			setTimeout(() => {
				this.openRegisterModal()
			}, 1200);
		}
	}
	componentWillReceiveProps(nextProps) {
		const { profileIsLoaded, profileIsLoading, error } = this.props;
		if (nextProps.accessToken && !profileIsLoaded && !profileIsLoading && !error) {
			this.props.getProfile(nextProps.accessToken);
		}
		if (nextProps.accessToken && !this.props.accessToken) {
			this.props.getCart(nextProps.accessToken);
			this.props.getFavorites(nextProps.accessToken);
		}
		
	}
	openRegisterModal() {
		this.props.openModal({
			modalType: ModalExample,
			modalProps: {
				className: "RegisterForm__wrapper",
				title: 'Регистрация',
				loginModalOpen: this.loginModalOpen,
				text: (
					<RegisterForm onSubmit={this.props.register}/>
				),
				hasClose: true
			}
		})
	}
	
	loginModalOpen() {
		this.props.openModal({
			modalType: ModalExample,
			modalProps: {
				className: "LoginForm__wrapper",
				openRegisterModal: this.openRegisterModal,
				title: 'Вход',
				text: (
					<LoginForm onSubmit={this.props.login}/>
				),
				hasClose: true
			}
		})
	}
	render() {
		const { items, cart, favorites, profile, logout, accessToken } = this.props;
		return (
			<div className={style.Header}>
				<HeaderInfo data={headerData} />
				<LogoLine logout={logout} cart={cart} isFavorite={favorites.length > 0} loginModalOpen={this.loginModalOpen} profile={profile}/>
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
	isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
	const { isLoaded, isLoading, items } = state.category.categories;
	const { getStockCategories } = state.category;
	const { added: favorites } = state.favorites;
	const { profile, profileIsLoaded, profileIsLoading, accessToken, error } = state.user;
	const cart = state.cart.added;
	return { isLoaded, isLoading, accessToken, items, cart, error, favorites, profile, profileIsLoaded, profileIsLoading };
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories()),
	getStockCategories: () => dispatch(categoryAction.getStockCategories()),
	setCart: (cart) => dispatch(cartAction.setCart(cart)),
	getCart: (accessToken) => dispatch(cartAction.getCart(accessToken)),
	openModal: modalParams => dispatch(actions.openModal(modalParams)),
	closeModal: () => dispatch(actions.closeModal()),
	setFavorites: (favorites) => dispatch(favoritesAction.setFavorites(favorites)),
	getFavorites: (accessToken) => dispatch(favoritesAction.getFavorites(accessToken)),
	login: (favorites) => dispatch(authActions.login(favorites)),
	logout: (favorites) => dispatch(authActions.logout(favorites)),
	register: (data) => dispatch(authActions.register(data)),
	loginSuccess: (favorites) => dispatch(authActions.loginSuccess(favorites)),
	getProfile: (accessToken) => dispatch(authActions.getProfile(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
