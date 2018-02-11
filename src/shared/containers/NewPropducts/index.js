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
	freeMode: true,
	grabCursor: true
}
const NewProducts = ({ products }) => (
	<div className={style.NewProducts}>
		<div className={style.NewProducts__title}>
			<h2>Топ продаж</h2>
		</div>
		<div className={style.NewProducts__list}>
			<Swiper className={style.NewProducts__container} {...params} ref={el => { this.swiper = el }}>
				{products.map(product => <div key={product.id} className={style.NewProducts__item}><ProductCard  {...product} sm/></div>)}
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
