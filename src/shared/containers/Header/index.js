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
		const { isLoaded, isLoading, accessToken, getCategories, setCart, setFavorites, loginSuccess, getProfile, getStockCategories} = this.props;
		if (!isLoaded && !isLoading) getCategories();
		if (!getStockCategories.isLoaded && !getStockCategories.isLoading) getStockCategories();
		const cart = localStorage.getItem("cart");
		if (cart) {
			setCart(JSON.parse(cart));
		}
		const favorites = localStorage.getItem("favorites");
		const accessTokenStorage = localStorage.getItem("accessToken");
		console.log({ accessToken });
		
		if (favorites) {
			setFavorites(JSON.parse(favorites));
		}
		if (accessTokenStorage) {
			loginSuccess(accessTokenStorage)
			getProfile();
		}
	}
	componentWillReceiveProps(nextProps) {
		const { profileIsLoaded, profileIsLoading } = this.props;
		if (nextProps.accessToken && !profileIsLoaded && !profileIsLoading) {
			this.props.getProfile();
		}
		
	}
	openRegisterModal() {
		this.props.openModal({
			modalType: ModalExample,
			modalProps: {
				className: "LoginForm__wrapper",
				title: 'Регистрация',
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
		const { items, cart, favorites, profile, accessToken } = this.props;
		return (
			<div className={style.Header}>
				<HeaderInfo data={headerData} />
				<LogoLine cart={cart} isFavorite={favorites.length > 0} loginModalOpen={this.loginModalOpen} profile={profile}/>
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
	const { profile, profileIsLoaded, profileIsLoading, accessToken } = state.user;
	const cart = state.cart.added;
	return { isLoaded, isLoading, accessToken, items, cart, favorites, profile, profileIsLoaded, profileIsLoading };
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories()),
	getStockCategories: () => dispatch(categoryAction.getStockCategories()),
	setCart: (cart) => dispatch(cartAction.setCart(cart)),
	openModal: modalParams => dispatch(actions.openModal(modalParams)),
	closeModal: () => dispatch(actions.closeModal()),
	setFavorites: (favorites) => dispatch(favoritesAction.setFavorites(favorites)),
	login: (favorites) => dispatch(authActions.login(favorites)),
	register: (favorites) => dispatch(authActions.register(favorites)),
	loginSuccess: (favorites) => dispatch(authActions.loginSuccess(favorites)),
	getProfile: (favorites) => dispatch(authActions.getProfile(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
