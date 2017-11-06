import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PageInfo from 'containers/PageInfo/';
import { connect } from 'react-redux';
import ProductContainer from 'containers/ProductContainer/';
import * as productsAction from 'actions/products/';
import * as cartAction from 'actions/cart/';

class ProductPage extends Component {
	componentDidMount() {
		const { isLoaded, isLoading, getProductInfo } = this.props;
		if (!isLoaded && !isLoading) getProductInfo();
	}
	static fetchData({ store, params }) {
		return store.dispatch(productsAction.getProductInfo(params.productId));
	}
	render() {
		const { product, addToCart, isLoaded } = this.props;
		return (
			<div className="ProductPage">
				{isLoaded ? <ProductContainer product={product} addToCart={addToCart} /> : 'загрузка'}
			</div>
		);
	}
}

ProductPage.defaultProps = {
	isLoaded: false,
	isLoading: false,
	product: {}
};

ProductPage.propTypes = {
	isLoaded: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	getProductInfo: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { productId } = ownProps.match.params;
	const { items } = state.products;
	const product = _.find(items, { id: productId }) || {};
	const { isLoaded, isLoading } = product;
	return {
		productId,
		product,
		isLoading,
		isLoaded
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { productId } = ownProps.match.params;
	return {
		getProductInfo: () => dispatch(productsAction.getProductInfo(productId)),
		addToCart: () => dispatch(cartAction.addToCart(productId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
