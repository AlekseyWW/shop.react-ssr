import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import classNames from 'classnames';
import _ from 'lodash';
import uuid from 'uuid';
import style from './styles.styl';

class ProductView extends Component {
	state = {
		activeSlide: 0
	}
	componentDidMount() {
		console.log(this.swiper.swiper)
	}
	toSlide = (index) => {
		if (this.swiper) {
			this.swiper.swiper.slideTo(index);
			this.setState({activeSlide: index})
		}
	}
	slideNext = () => {
		if (this.swiper) {
			this.swiper.swiper.slideNext()
		}
	}
	slidePrev = () => {
		if (this.swiper) {
			this.swiper.swiper.slidePrev()
		}
	}
	render() {
		const { product, activeSlider, color } = this.props;
		const params = {
			containerClass: style.ProductView__container,
			wrapperClass: style.ProductView__wrapper,
			slidesPerView: 1,
			centeredSlides: true,
			grabCursor: true,
			pagination: {
				type: 'bullets',
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			},
			on: {
				slideChange: swiper => {
					if (this.swiper) this.setState({activeSlide: this.swiper.swiper.activeIndex}); },
			}
		}
		const currentColor = activeSlider !== null ? product.colors[activeSlider] : _.find(product.colors, { name: color }) || product.colors[1];
		this.swiper && this.swiper.swiper.update();
		return (
			<div className={style.ProductView}>
				<div className={style.ProductView__header}>
					<div className={style.ProductView__head}>
						<p className={style.ProductView__title}>{product.title}</p>
						<p className={style.ProductView__subline}>{product.name}</p>
						<span className={style.ProductView__note}>Наличие товара вашего размера и понравившегося цвета можно уточнить оформив заявку, или написав нам в <a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank">WhatsApp.</a></span>

					</div>
					<div className={style.ProductView__price}>
						<p className={style.ProductForm__price__value}>{product.isSale ? product.price : product.oldPrice} руб.</p>
						{product.isSale && <p className={style.ProductForm__price__old}>{product.oldPrice}</p>}
					</div>
				</div>
				<div className={style.ProductView__image}>
					<Swiper className={style.ProductView__container} {...params} ref={el => {this.swiper = el}}>
						{currentColor && currentColor.img.map(photo =>(
							<div  key={uuid.v4()}  className={style.ProductView__slide}>
								<img src={photo} alt="img" />
							</div>)
						)}
					</Swiper>
					<div className={style.ProductView__navigation}>
						<div className={style.ProductView__navigation__item} onClick={() => this.slidePrev()}>
						</div>
						<div className={style.ProductView__navigation__item} onClick={() => this.slideNext()}>
						</div>
					</div>
				</div>
				<div className={style.ProductView__pagination}>
					{currentColor && currentColor.img.length > 1 && currentColor.img.map( (photo, index) =>{
						const styl = classNames({
							[`${style.ProductView__pagination__item}`]: true,
							[`${style.ProductView__pagination__item_active}`]: this.state.activeSlide === index
						})
						return (
							<div key={uuid.v4()} className={styl} onClick={() => this.toSlide(index)}>
								<img src={photo} alt="img" />
							</div>
						)}
					)}
				</div>
			</div>
		);
	}
}

ProductView.defaultProps = {
	img: ''
};

ProductView.propTypes = {
	img: PropTypes.string.isRequired
};

export default ProductView;
