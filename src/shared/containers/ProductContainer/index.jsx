import React from 'react';
import PropTypes from 'prop-types';
import ProductView from 'components/ProductView/';
import ProductForm from 'components/ProductForm/';

import './styles.styl';

const Product = ({ product, addToCart }) => (
	<div className="Product">
		<div className="Product__content">
			<ProductView img={product.img} />
			<ProductForm addToCart={addToCart} product={product} />
		</div>
	</div>
);

Product.propTypes = {
	product: PropTypes.object.isRequired,
	addToCart: PropTypes.func.isRequired
};

export default Product;
