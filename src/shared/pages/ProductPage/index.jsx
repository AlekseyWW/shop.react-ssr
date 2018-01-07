import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PageInfo from 'containers/PageInfo/';
import { connect } from 'react-redux';
import qs from 'query-string';
import ProductContainer from 'containers/ProductContainer/';
import * as productsAction from 'actions/products/';
import * as cartAction from 'actions/cart/';

class ProductPage extends Component {
	componentDidMount() {
		const { isLoaded, isLoading, getProductInfo } = this.props;
		if (!isLoaded && !isLoading) getProductInfo();
	}
	static fetchData({ store, params, query }) {
		const color = query ? query : '';
		return store.dispatch(productsAction.getProductInfo(params.productId.split("?")[0], color));
	}
	render() {
		const { product, addToCart, isLoaded, color } = this.props;
		return (
			<div className="ProductPage">
				{isLoaded ? <ProductContainer product={product} addToCart={addToCart} color={color} /> : 'загрузка'}
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
	const { color } = qs.parse(ownProps.location.search);
	return {
		productId,
		product,
		isLoading,
		isLoaded,
		color
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { productId } = ownProps.match.params;
	const { color } = qs.parse(ownProps.location.search);
	return {
		getProductInfo: () => dispatch(productsAction.getProductInfo(productId, { color })),
		addToCart: (product) => dispatch(cartAction.addToCart(product))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
