import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from 'components/ProductCard/';
import Swiper from 'react-id-swiper';
import style from './styles.styl';
const params = {
	containerClass: style.NewProducts__container,
	wrapperClass: style.NewProducts__wrapper,
	slidesPerView: 'auto',
	loop: true,
	loopedSlides: 5,
	grabCursor: true
}
const NewProducts = ({ products, title, mod }) => (
	<div className={`${style.NewProducts} ${style[`NewProducts_${mod}`]}`}>
		<div className={style.NewProducts__title}>
			<h2>{title ? title: 'Топ продаж'}</h2>
		</div>
		<div className={style.NewProducts__list}>
			<Swiper className={style.NewProducts__container} {...params} >
				{products.map(product => <div key={product.id} className={style.NewProducts__item}><ProductCard  {...product}/></div>)}
			</Swiper>
		</div>
	</div>
);

NewProducts.defaultProps = {
    products: [],
};

NewProducts.propTypes = {
    products: PropTypes.array,
};

export default NewProducts;
