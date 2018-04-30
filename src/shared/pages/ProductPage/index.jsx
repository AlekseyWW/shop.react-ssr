import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PageInfo from 'containers/PageInfo/';
import Preloader from 'components/Preloader/';
import Reviews from 'components/Reviews/';
import { connect } from 'react-redux';
import qs from 'query-string';
import NewPropducts from 'containers/NewPropducts/';

import ProductContainer from 'containers/ProductContainer/';
import * as productsAction from 'actions/products/';
import * as cartAction from 'actions/cart/';

class ProductPage extends Component {
	componentDidMount() {
		const { isLoaded, isLoading, isForLoaded, isForLoading, getForProducts, getProductInfo, product } = this.props;
		if (!isLoaded && !isLoading) getProductInfo();
		if (this.props.product && this.props.product.category) {
			this.props.getForProducts(`for${this.props.product.category.name}`);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		
		if (this.props.product && this.props.product.category && this.props.product.category.name && this.props.product.name !== prevProps.product.name) {
			this.props.getForProducts(`for${this.props.product.category.name}`);
		}
	}
	static fetchData({ store, params, query }) {
		const color = query ? query : '';
		return store.dispatch(productsAction.getProductInfo(params.productId.split("?")[0], color));
	}
	render() {
		const { product, addToCart, isLoaded, color, forProducts, isForLoaded, isForLoading } = this.props;
		
		return (
			<div className="page__inner">
				{isLoaded ? <ProductContainer product={product} addToCart={addToCart} color={color} /> : <Preloader />}
				{isForLoaded && !isForLoading && forProducts && forProducts.length > 0 && <NewPropducts products={forProducts} title="Так же вам может понравиться" mod="for"/>}
				{isLoaded ? <Reviews pageId={product.slug}/> :''}
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
	const { items, forProducts, isForLoaded, isForLoading } = state.products;
	const product = _.find(items, { id: productId }) || {};
	const { isLoaded, isLoading } = product;
	const { color } = qs.parse(ownProps.location.search);
	return {
		productId,
		product,
		isLoading,
		isLoaded,
		color,
		forProducts,
		isForLoaded,
		isForLoading
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { productId } = ownProps.match.params;
	const { color } = qs.parse(ownProps.location.search);
	return {
		getProductInfo: () => dispatch(productsAction.getProductInfo(productId, { color })),
		getForProducts: (slug) => dispatch(productsAction.getForProducts(slug)),
		addToCart: (product) => dispatch(cartAction.addToCart(product))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
