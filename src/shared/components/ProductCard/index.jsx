import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ShadowIcon, HurtIcon } from 'components/Icon';

import style from './styles.styl';

const ProductCard = ({ sm, category, img, slug, name, price, oldPrice, isSale, product, toogleFavotite, isFavorite, actionText }) => {
	const className = classNames({
		[`${style.ProductCard}`]: true,
		[`${style.ProductCard_sm}`]: sm
	});
	const url = name ? `/products/${slug ? slug : product.slug}?color=${name}` : `/products/${slug ? slug : product.slug}`;
	console.log(isFavorite);
	
	const favClass = classNames(style.ProductCard__overlay__button, {
		[style.ProductCard__overlay__button_active]: isFavorite
	})
	const text = actionText ? actionText : isFavorite ? "В избранном" : "В избранное"
	return (
		<div className={className}>
			<Link className={style.ProductCard__image} to={url}>
				<img src={img} alt="item" />
			</Link>
			<div className={style.ProductCard__content}>
				<Link className={style.ProductCard__inner} to={url}>
					<span className={style.ProductCard__name}>
						{product.name ? product.name : name}
					</span>
					<span className={style.ProductCard__description}>
						{category && category.name }
						{product.category && product.category.name }
					</span>
				</Link>
				<span className={style.ProductCard__price}>
					{isSale && <span>{price}&nbsp;&#8381;</span>}
					{oldPrice && <span>{oldPrice}&nbsp;&#8381;</span> }
				</span>
			</div>
			<div className={style.ProductCard__overlay}>
				<button className={favClass} onClick={toogleFavotite}>
					<span>{text}</span>
					{!actionText && <HurtIcon />}
				</button>
			</div>
		</div>
	);
};

ProductCard.defaultProps = {
	sm: false,
	price: 0,
	product: {},
	toogleFavotite: () => {},
	img: '',
	actionText: '',
	name: '',
	slug: ''
};

ProductCard.propTypes = {
	sm: PropTypes.bool,
	price: PropTypes.number,
	product: PropTypes.object,
	slug: PropTypes.string,
	toogleFavotite: PropTypes.func,
	name: PropTypes.string,
	actionText: PropTypes.string,
	img: PropTypes.string
};

export default ProductCard;
