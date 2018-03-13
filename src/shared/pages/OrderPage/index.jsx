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


class OrderPage extends Component {
	handleSubmit(data) {
		if (data.city) {
			data.city = {
				id: data.city.value
			}
		}
		this.props.fetchOrder(data);
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

OrderPage.propTypes = {
	product: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

OrderPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	const { isFetched, isFetching, added } = state.cart;
	const products = added;
	return { isFetched, isFetching, products };
};

const mapDispatchToProps = dispatch => ({
	// getCart: () => dispatch(cartAction.getCart()),
	fetchOrder: data => dispatch(orderAtions.fetchOrder(data)),
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
