import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ShadowIcon } from 'components/Icon';

import style from './styles.styl';

const ProductCard = ({ sm, description, price, img, name, slug }) => {
	const className = classNames({
		[`${style.ProductCard}`]: true,
		[`${style.ProductCard_sm}`]: sm
	});
	return (
		<Link className={className} to={`/products/Nike-Air-Max`}>
			<div className={style.ProductCard__image}>
				<img src={img} alt="item" />
				<div className={style.ProductCard__shadow} />
			</div>
			<span className={style.ProductCard__name}>
				{name}
			</span>
			<span className={style.ProductCard__description}>
				{description}
			</span>
			<span className={style.ProductCard__price}>
				{price}.-
			</span>
		</Link>
	);
};

ProductCard.defaultProps = {
	sm: false,
	price: '',
	description: '',
	img: '',
	name: '',
	slug: ''
};

ProductCard.propTypes = {
	sm: PropTypes.bool,
	description: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.string,
	slug: PropTypes.string,
	img: PropTypes.string
};

export default ProductCard;
