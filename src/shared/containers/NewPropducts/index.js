import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from 'components/ProductCard/';

import style from './styles.styl';

const NewProducts = ({ products }) => (
	<div className={style.NewProducts}>
		<div className={style.NewProducts__title}>
			<h2>Топ продаж</h2>
		</div>
		<div className={style.NewProducts__list}>
			{ products.map(product => <ProductCard key={product.id} {...product} />)}
		</div>
	</div>
);

NewProducts.propTypes = {
	products: PropTypes.array.isRequired
};

export default NewProducts;
