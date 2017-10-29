import React from 'react';
import PropTypes from 'prop-types';
import ProductView from 'components/ProductView/';
import ProductForm from 'components/ProductForm/';

import './styles.styl';

const CartContainer = ({ product, addToCart }) => (
	<div className="Product">
		<div className="Product__content">
			<ProductView img={product.img} />
			<ProductForm addToCart={addToCart} product={product} />
		</div>
	</div>
);

CartContainer.propTypes = {
	product: PropTypes.object.isRequired,
	addToCart: PropTypes.func.isRequired
};

export default CartContainer;
