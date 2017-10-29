import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as cartAction from 'actions/cart';


const CartItem = ({ product, add, remove }) => (
	<div>
		<div>
			{product.id}
		</div>
		<div>
			{product.name}
		</div>
		<div>
			{product.price}
		</div>
		<div>
			{product.count}
		</div>
		<div>
			{product.count * product.price}
		</div>
		<button onClick={() => add(product.id)}>
			+
		</button>
		<button onClick={() => remove(product.id)}>
			-
		</button>
	</div>
);

class CartPage extends Component {
	componentDidMount() {
		const { isFetched, isFetching, getCart } = this.props;
		if (!isFetched && !isFetching) getCart();
	}
	render() {
		const { products, addToCart, removeFromCart } = this.props;
		return (
			<div className="page__inner">
				<div className="CartContainer">
					{ products.length ? products.map(product => <CartItem key={product.id} product={product} add={addToCart} remove={removeFromCart} />) : 'хуй'}
				</div>
			</div>
		);
	}
}

CartItem.propTypes = {
	product: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

CartPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	getCart: PropTypes.func.isRequired,
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
	getCart: () => dispatch(cartAction.getCart()),
	addToCart: id => dispatch(cartAction.addToCart(id)),
	removeFromCart: id => dispatch(cartAction.removeFromCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
