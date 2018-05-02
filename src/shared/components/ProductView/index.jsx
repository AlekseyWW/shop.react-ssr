import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Swiper from 'react-id-swiper';
import classNames from 'classnames';
import ReactImageMagnify from 'react-image-magnify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import _ from 'lodash';
import { LeftArrow } from 'components/Icon';
import uuid from 'uuid';
import style from './styles.styl';

class ProductView extends Component {
	state = {
		activeSlide: 0
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
		const { product, activeSlider, color, actions } = this.props;
		const params = {
			containerClass: style.ProductView__container,
			wrapperClass: style.ProductView__wrapper,
			slidesPerView: 1,
			spaceBetween: 40,
			simulateTouch: false,
			allowTouchMove: false,
			on: {
				slideChange: swiper => {
					if (this.swiper) this.setState({activeSlide: this.swiper.swiper.activeIndex}); },
			}
		}
		const currentColor = activeSlider !== null ? product.colors[activeSlider] : _.find(product.colors, b => {
			return b.name.trim() === color.trim()
		}) || product.colors[1];
		
		this.swiper && this.swiper.swiper.update();
		return (
			<div className={style.ProductView}>
				<div className={style.ProductView__back}>
					<div onClick={() => actions.goBack()}>
						<LeftArrow />
						<span>Назад выбору товаров</span>
					</div>
				</div>
				<div className={style.ProductView__header}>
					<div className={style.ProductView__head}>
						<p className={style.ProductView__title}>{product.title}</p>
						<p className={style.ProductView__subline}>{product.name}</p>
						<span className={style.ProductView__note}>Наличие товара вашего размера и понравившегося цвета можно уточнить оформив заявку, или написав нам в <a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank">WhatsApp.</a></span>

					</div>
					<div className={style.ProductView__price}>
						<p className={style.ProductView__price__value}>{currentColor && currentColor.isSale ? currentColor.price : currentColor.oldPrice} руб.</p>
						{currentColor && currentColor.isSale && <p className={style.ProductView__price__old}>{currentColor.oldPrice} руб.</p>}
					</div>
				</div>
				<div className={style.ProductView__image}>
					<Swiper className={style.ProductView__container} {...params} ref={el => {this.swiper = el}}>
						{currentColor && currentColor.img.map(photo =>(
							<div  key={uuid.v4()}  className={style.ProductView__slide}>

								<ReactImageMagnify {...{
									smallImage: {
										alt: 'Wristwatch by Ted Baker London',
										isFluidWidth: true,
										src: photo,
										sizes: '(min-width: 480px) 100%, 360px'
									},
									largeImage: {
										alt: '',
										src: photo,
										width: 1420,
										height: 932
									},
									isHintEnabled: true,
									enlargedImagePosition: 'over'
								}} />
								{/* <img src={photo} alt="img" /> */}
							</div>)
						)}
					</Swiper>
					<div className={style.ProductView__navigation__item} onClick={() => this.slidePrev()}>
						<i />
					</div>
					<div className={style.ProductView__navigation__item} onClick={() => this.slideNext()}>
						<i />
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
export default connect(
	({ router }) => ({ router }),
	dispatch => ({ actions: bindActionCreators(routerActions, dispatch) })
)(ProductView);
