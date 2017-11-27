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
	getCart: () => dispatch(cartAtions.getCart())
});

class HeaderCart extends Component {
	static propTypes = {
		isFetching: PropTypes.bool.isRequired,
		isFetched: PropTypes.bool.isRequired,
		getCart: PropTypes.func.isRequired,
		added: PropTypes.array.isRequired
	}
	componentDidMount() {
		// const { isFetching, isFetched, getCart } = this.props;
		// if (!isFetching && !isFetched) getCart();
	}
	render() {
		return <CartBlock added={this.props.added} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart);

