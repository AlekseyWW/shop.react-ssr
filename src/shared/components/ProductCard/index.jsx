import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import filter from 'lodash/filter';
import { ShadowIcon, HurtIcon } from 'components/Icon';

import style from './styles.styl';

class ProductCard extends Component {
	state = {
		sizesHeigth : -135
	}
	componentDidMount() {
		
		this.setState({
			sizesHeigth: -this.sizesBlock.getBoundingClientRect().height - 16
		})
	}
	render() {
		const { sm, sex, sizes, category, img, slug, name, price, oldPrice, isSale, product, toogleFavotite, isFavorite, actionText } = this.props
		const className = classNames({
			[`${style.ProductCard}`]: true,
			[`${style.ProductCard_sm}`]: sm
		});
		const url = name ? `/products/${slug ? slug : product.slug}?color=${name}` : `/products/${slug ? slug : product.slug}`;
		
		const favClass = classNames(style.ProductCard__overlay__button, {
			[style.ProductCard__overlay__button_active]: isFavorite
		})
		const imgClass = classNames(style.ProductCard__image, {
			[style.ProductCard__image_sale]: isSale
		})
		const text = actionText ? actionText : isFavorite ? "В избранном" : "В избранное"
		const currentSizes = sex ? filter(sizes, b => b.sex === sex && b.quantity > 0) : filter(sizes, b => b.quantity > 0);
		
		return (
			<div className={className}>
				<Link className={imgClass} to={url}>
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
						{isSale && <span className={`${style.ProductCard__price__current}`}>{price}&nbsp;&#8381;</span>}
						{oldPrice && <span className={style.ProductCard__price__old}>{oldPrice}&nbsp;&#8381;</span> }
					</span>
				</div>
				<div className={style.ProductCard__overlay} style={{bottom: this.state.sizesHeigth}}>
					<div className={style.ProductCard__overlay__content} ref={el => this.sizesBlock = el}>
						<div className={style.ProductCard__overlay__sizes}>
							<span className={style.ProductCard__overlay__sizes__label}>Размеры:</span>
							<span className={style.ProductCard__overlay__sizes__inner} >
								{currentSizes.map((size, id) => {
									const key = `item-${id}`;
									return <span key={key}>{size.name}</span>
								})}
							</span>
						</div>
						<button className={favClass} onClick={toogleFavotite}>
							<span>{text}</span>
							{!actionText && <HurtIcon />}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

ProductCard.defaultProps = {
	sm: false,
	price: 0,
	product: {},
	toogleFavotite: () => {},
	img: '',
	actionText: '',
	name: '',
	slug: '',
	sizes: [],
	sex: ''
};

ProductCard.propTypes = {
	sm: PropTypes.bool,
	price: PropTypes.number,
	product: PropTypes.object,
	slug: PropTypes.string,
	toogleFavotite: PropTypes.func,
	name: PropTypes.string,
	actionText: PropTypes.string,
	img: PropTypes.string,
	sex: PropTypes.string,
	sizes: PropTypes.array
};

export default ProductCard;
