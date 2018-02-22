import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderInfo from 'components/HeaderInfo';
import { connect } from 'react-redux';
import Menu from 'containers/Menu';
import LogoLine from 'components/LogoLine';
import headerData from 'config/header';
import * as categoryAction from 'actions/category';
import * as cartAction from 'actions/cart';
import style from './styles.styl';
import { setCart } from '../../state/actions/cart';

class Header extends Component { 
	componentDidMount() {
		const { isLoaded, isLoading, getCategories, setCart, getStockCategories } = this.props;
		if (!isLoaded && !isLoading) getCategories();
		if (!getStockCategories.isLoaded && !getStockCategories.isLoading) getStockCategories();
		const cart = localStorage.getItem("cart");
		if (cart) {
			setCart(JSON.parse(cart));
		}
	}
	render() {
		const { items, cart } = this.props;
		return (
			<div className={style.Header}>
				<HeaderInfo data={headerData} />
				<LogoLine cart={cart}/>
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
	const cart = state.cart.added;
	return { isLoaded, isLoading, items, cart };
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories()),
	getStockCategories: () => dispatch(categoryAction.getStockCategories()),
	setCart: (cart) => dispatch(cartAction.setCart(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
