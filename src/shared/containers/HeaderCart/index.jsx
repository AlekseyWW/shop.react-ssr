import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartBlock from 'components/Cart';
import * as cartAtions from 'actions/cart';

const mapStateToProps = state => {
	const { isFetching, isFetched, added } = state.cart;
	return { isFetching, isFetched, added };
};

const mapDispatchToProps = dispatch => ({
	addToCart: (product, remove) =>
		dispatch(cartAtions.addToCart(product, remove, false, true)),
	removeFromCart: product =>
		dispatch(cartAtions.addToCart(product, true, true)),
});

class HeaderCart extends Component {
	static propTypes = {
		isFetching: PropTypes.bool.isRequired,
		isFetched: PropTypes.bool.isRequired,
		addToCart: PropTypes.func.isRequired,
		added: PropTypes.array.isRequired,
	};
	addInCart(product, remove) {
		this.props.addToCart(product, remove);
	}
	render() {
		return (
			<CartBlock
				added={this.props.added}
				addToCart={(product, remove) => this.addInCart(product, remove)}
			/>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderCart);
