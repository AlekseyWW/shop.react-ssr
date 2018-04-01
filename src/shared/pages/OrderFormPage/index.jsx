import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import OrderForm from 'components/OrderForm';
import * as cartAtions from 'actions/cart';
import * as orderAtions from '../../state/modules/order';
import styles from './style.styl';


class OrderFormPage extends Component {
	handleSubmit(data) {
		if (data.city) {
			data.city = {
				id: data.city.value || data.city.id
			}
		}
		this.props.fetchOrder(omit(data, ['promocodes']));
	}
	render() {
		const { products, addToCart, removeFromCart } = this.props;
		return (
			<div className={styles.CartContainer}>
				<OrderForm onSubmit={data =>this.handleSubmit(data)}/>
			</div>
		);
	}
}

OrderFormPage.propTypes = {
	product: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

OrderFormPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	const { profile } = state.user;
	
	const { isFetched, isFetching, added } = state.cart;
	const products = added;
	return { isFetched, isFetching, products, profile };
};

const mapDispatchToProps = dispatch => ({
	// getCart: () => dispatch(cartAction.getCart()),
	fetchOrder: data => dispatch(orderAtions.fetchOrder(data)),
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormPage);
