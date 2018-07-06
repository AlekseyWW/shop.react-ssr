import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Order from 'components/Order';
import * as cartAtions from 'actions/cart';
import * as orderAtions from '../../state/modules/order';
import * as userAtions from '../../state/actions/user';
import styles from './style.styl';

class OrderPage extends Component {
	componentDidMount() {
		const {
			orders,
			ordersIsLoading,
			ordersIsLoaded,
			getOrders,
		} = this.props;
		if (!ordersIsLoading && !ordersIsLoaded) {
			getOrders();
		}
	}
	handleSubmit(data) {
		if (data.city) {
			data.city = {
				id: data.city.value,
			};
		}
		this.props.fetchOrder(data);
	}
	render() {
		const { order } = this.props;

		return (
			<div className={styles.CartContainer}>
				<Order order={order} withoutPrice />
			</div>
		);
	}
}

OrderPage.propTypes = {
	product: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
};

OrderPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const { isFetched, isFetching, added } = state.cart;
	const { ordersIsLoading, ordersIsLoaded, orders, profile } = state.user;
	const { id } = ownProps.match.params;
	const products = added;
	const order = _.find(orders, { id: parseInt(id) });
	return {
		isFetched,
		isFetching,
		products,
		id,
		ordersIsLoading,
		ordersIsLoaded,
		order,
		profile,
	};
};

const mapDispatchToProps = dispatch => ({
	fetchOrder: data => dispatch(orderAtions.fetchOrder(data)),
	getOrders: () => dispatch(userAtions.getOrders()),
	addToCart: (product, remove) =>
		dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderPage);
