import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ShadowIcon } from 'components/Icon';

import style from './styles.styl';

const ProductCard = ({ sm, category, img, slug, name, price, product }) => {
	const className = classNames({
		[`${style.ProductCard}`]: true,
		[`${style.ProductCard_sm}`]: sm
	});
	const url = name ? `/products/${slug ? slug : product.slug}?color=${name}` : `/products/${slug ? slug : product.slug}`
	return (
		<Link className={className} to={url}>
			<div className={style.ProductCard__image}>
				<img src={img} alt="item" />
			</div>
			<div className={style.ProductCard__content}>
				<div className={style.ProductCard__inner}>
					<span className={style.ProductCard__name}>
						{product.name ? product.name : name}
					</span>
					<span className={style.ProductCard__description}>
						{category && category.name }
						{product.category && product.category.name }
					</span>
				</div>
				<span className={style.ProductCard__price}>
					{product.oldPrice && <span>{product.oldPrice}&nbsp;&#8381;</span> }
					{product.price && <span>{product.price}&nbsp;&#8381;</span>}
				</span>
			</div>
		</Link>
	);
};

ProductCard.defaultProps = {
	sm: false,
	price: 0,
	product: {},
	img: '',
	name: '',
	slug: ''
};

ProductCard.propTypes = {
	sm: PropTypes.bool,
	price: PropTypes.number,
	product: PropTypes.object,
	slug: PropTypes.string,
	name: PropTypes.string,
	img: PropTypes.string
};

export default ProductCard;
