import React from 'react';
import PropTypes from 'prop-types';
import ProductView from 'components/ProductView/';
import ProductForm from 'components/ProductForm/';

import style from './styles.styl';

const Product = ({ product, addToCart }) => (
	<div className={style.Product}>
		<div className={style.Product__content}>
			<ProductView product={product} />
			<ProductForm addToCart={addToCart} product={product} />
		</div>
	</div>
);

Product.propTypes = {
	product: PropTypes.object.isRequired,
	addToCart: PropTypes.func.isRequired
};

export default Product;
