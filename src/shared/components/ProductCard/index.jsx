import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ShadowIcon } from 'components/Icon';

import style from './styles.styl';

const ProductCard = ({ sm, category, price, img, name, slug }) => {
	const className = classNames({
		[`${style.ProductCard}`]: true,
		[`${style.ProductCard_sm}`]: sm
	});
	return (
		<Link className={className} to={`/products/${slug}`}>
			<div className={style.ProductCard__image}>
				<img src={img} alt="item" />
			</div>
			<span className={style.ProductCard__name}>
				{name}
			</span>
			<span className={style.ProductCard__description}>
				{category.name}
			</span>
			<span className={style.ProductCard__price}>
				{price}.-
			</span>
		</Link>
	);
};

ProductCard.defaultProps = {
	sm: false,
	price: 0,
	category: {},
	img: '',
	name: '',
	slug: ''
};

ProductCard.propTypes = {
	sm: PropTypes.bool,
	category: PropTypes.object,
	name: PropTypes.string,
	price: PropTypes.number,
	slug: PropTypes.string,
	img: PropTypes.string
};

export default ProductCard;
