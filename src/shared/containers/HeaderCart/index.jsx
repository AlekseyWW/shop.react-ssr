import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartBlock from 'components/Cart';
import * as cartAtions from 'actions/cart';

const mapStateToProps = (state) => {
	const { isFetching, isFetched, added } = state.cart;
	return { isFetching, isFetched, added };
};

const mapDispatchToProps = dispatch => ({
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.addToCart(product,true, true))
	// appendToCart: (id, size) => dispatch(cartAtions.appendToCart(id, size)),
	// removeFromCart: (id, size, all) => dispatch(cartAtions.removeFromCart(id, size, all))
});

class HeaderCart extends Component {
	static propTypes = {
		isFetching: PropTypes.bool.isRequired,
		isFetched: PropTypes.bool.isRequired,
		addToCart: PropTypes.func.isRequired,
		added: PropTypes.array.isRequired
	}
	componentDidMount() {
		// const { isFetching, isFetched, getCart } = this.props;
		// if (!isFetching && !isFetched) getCart();
	}
	addInCart(product, remove) {
		this.props.addToCart(product, remove);
	}
	render() {
		return <CartBlock added={this.props.added} addToCart={(product, remove) => this.addInCart(product, remove)} removeFromCart={this.props.removeFromCart} appendToCart={this.props.appendToCart}/>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart);

