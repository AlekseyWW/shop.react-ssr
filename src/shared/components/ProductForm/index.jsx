import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import Button from 'components/Button';
import _ from 'lodash';
import { post } from 'utils/api';
import style from './styles.styl';
import deliveryText from './delivery.json';
import * as favoritesAction from 'actions/favorites/';
import ModalExample from '../../components/ModalExample';
import { withRouter } from 'react-router';
import { InstagramIcon } from 'components/Icon';
import InputMask from 'react-input-mask';
import { HurtIcon, HeartSold } from 'components/Icon';

import InstagramEmbed from 'react-instagram-embed';
import { actions } from '../../state/modules/modal.js';

const sizeImages = {
	sneakers: '/tablica_obuv_rus-01.jpg',
	keds: '/tablica_obuv_rus-01.jpg',
	botinki: '/tablica_obuv_rus-01.jpg',
	tufli: '/tablica_obuv_rus-01.jpg',
	Casual: '/tablica_obuv_rus-01.jpg',
	clothes:'/tablica_man_odegda-01.jpg',
	sweatshirt:'/tablica_man_odegda-01.jpg',
	Jeans: '//tablica_bruki-01.jpg',
	Bombers:'/tablica_man_odegda-01.jpg',
	Mantle:'/tablica_man_odegda-01.jpg',
	Polo:'/tablica_man_odegda-01.jpg',
	Tracksuits:'/tablica_man_odegda-01.jpg',
	SportsTrousers: '/tablica_man_odegda-01.jpg',
	'T-shirts':'/tablica_man_odegda-01.jpg',
}
class ProductForm extends Component {
	state = {
		modalIsOpen: false,
		status: 'order',
		error: null,
		activeSize: '',
	}
	componentDidMount() {
		// Modal.setAppElement('#app');
	}
	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}
	onSuccess() {
		this.setState({error: null});
		yaCounter47068560.reachGoal('RESPONSE');
		this.props.closeModal();
		this.props.history.replace('/success')
	}
	addToCart() {
		if (!this.state.activeSize) {
			alert('Выберите размер')
			return false;
		}
		const currentColor = _.find(this.props.product.colors, { name: this.props.color })
		const id = _.find(currentColor.sizes, { id: this.state.activeSize.id }).id
		
		const product = {
			id: currentColor.id,
			sizeId: id,
			image: currentColor.thumb,
			name: this.props.product.name,
			color: this.props.color,
			slug: this.props.product.slug,
			price: currentColor && currentColor.isSale ? currentColor.price : currentColor.oldPrice,
			size: this.state.activeSize
		}
		this.props.addToCart(product)
	}

	toogleFavotite = () => {
		const product = {..._.find(this.props.product.colors, { name: this.props.color })};
		product.img = product.thumb;
		product.product = this.props.product;
		if (_.find(this.props.favorites, { id: product.id })) {
			this.props.removeFromFavorites(product.id)
		} else {
			this.props.addToFavorites(product)
		}
	}
	render() {
		const { addToCart, product, setSlider, color } = this.props;
		const activeColor = color ? _.find(product.colors, { name: color }) : product.colors[0];
		const id = activeColor ? activeColor.id : 0;
		const propsModal = {
			title: product.name,
			status: 'deliver',
			text: (
				<a href="https://www.instagram.com/newstep_rnd/" target="_blank" className={style.ProductForm__instagramm} onClick={() => { yaCounter47068560.reachGoal('ORDER'); return true; }}>
					<InstagramIcon />
				</a>
			),
			subTitle: 'Ваша заявка принята, ожидайте звонок личного консультанта! А пока загляните к нам в инстаграмм ',
			hasClose: true,
			buttons: []
		}
		const favClass = classNames(style.ProductForm__favorite, {
			[style.ProductForm__favorite_active]: _.find(this.props.favorites, { id: activeColor.id })
		})
		const heartClass = classNames(style.ProductForm__favorite__heart, {
			[style.ProductForm__favorite__heart_active]: _.find(this.props.favorites, { id: activeColor.id })
		})
		const sizeImg = product.category ? sizeImages[product.category.name.trim()] : '';
		
		// : 'tablica_man_odegda-01.jpg' : 'tablica_obuv_rus-01.jpg' ;
		const groupSizes = activeColor && activeColor.sizes ? _.groupBy(_.filter(activeColor.sizes, b => b.quantity), 'sex') : [];
		return (
			<div className={style.ProductForm}>
				<div className={style.ProductForm__container}>
					<div className={style.ProductForm__head}>
						<p className={style.ProductForm__title}>{product.name}</p>
						{/* <p className={style.ProductForm__subline}>{product.name}</p> */}
						<button className={favClass} onClick={this.toogleFavotite}>
							<HurtIcon />
							<HeartSold className={heartClass} />
						</button>
					</div>
					{activeColor &&
						<div className={style.ProductForm__price}>
						<p className={style.ProductForm__price__value}>{activeColor && activeColor.isSale ? activeColor.price : activeColor.oldPrice} руб.</p>
						{activeColor && activeColor.isSale && <p className={style.ProductForm__price__old}>{activeColor.oldPrice} руб.</p>}
							<span className={style.ProductForm__callback__note}>Наличие товара вашего размера и понравившегося цвета можно уточнить оформив заявку, или написав нам в <a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank">WhatsApp.</a></span>
						</div>
					}
					<div className={style.ProductForm__action}>
						{product.colors.length > 1 &&
							<div className={style.ProductForm__colors}>
								{product.colors.map((color, id) => (
									<NavLink key={color.name} className={style.ProductForm__color} to={`/products/${product.slug}?color=${color.name}`} replace>
										<img src={color.thumb} />
									</NavLink>
								))}
							</div>
						}
						<div className={style.ProductForm__buttons}>
							<div className={style.ProductForm__sizes}>
								<div className={style.ProductForm__sizes__container}>
									{/* {activeColor.sizes.map(size => {
										const sizeClass = classNames({
											[`${style.ProductForm__sizes__item}`]: true,
											[`${style.ProductForm__sizes__item_active}`]: size === this.state.activeSize,
										})
										return (
											<div onClick={() => this.setState({ activeSize: size })} className={sizeClass} key={size.id}>{size.name}</div>
										)}
									)} */}

									{groupSizes['Мужской'] && (
										<div className={style.ProductForm__sizes__row}>
											<p>Мужские</p>
											<div className={style.ProductForm__sizes__rowContainer}>
												{groupSizes['Мужской'].map(size => {
													const sizeClass = classNames({
														[`${style.ProductForm__sizes__item}`]: true,
														[`${style.ProductForm__sizes__item_active}`]: size === this.state.activeSize,
													})
													return (
														<div onClick={() => this.setState({ activeSize: size })} className={sizeClass} key={size.id}>{size.name}</div>
													)
												})}
											</div>
										</div>
									)}
									{groupSizes['Женский'] && (
										<div className={style.ProductForm__sizes__row}>
											<p>Женские</p>
											<div className={style.ProductForm__sizes__rowContainer}>
												{groupSizes['Женский'].map(size => {
													const sizeClass = classNames({
														[`${style.ProductForm__sizes__item}`]: true,
														[`${style.ProductForm__sizes__item_active}`]: size === this.state.activeSize,
													})
													return (
														<div onClick={() => this.setState({ activeSize: size })} className={sizeClass} key={size.id}>{size.name}</div>
													)
												})}
											</div>
										</div>
									)}
									{groupSizes['Детский'] && (
										<div className={style.ProductForm__sizes__row}>
											<p>Детские</p>
											<div className={style.ProductForm__sizes__rowContainer}>
												{groupSizes['Детский'].map(size => {
													const sizeClass = classNames({
														[`${style.ProductForm__sizes__item}`]: true,
														[`${style.ProductForm__sizes__item_active}`]: size === this.state.activeSize,
													})
													return (
														<div onClick={() => this.setState({ activeSize: size })} className={sizeClass} key={size.id}>{size.name}</div>
													)
												})}
											</div>
										</div>
									)}
								</div>
								{sizeImg &&
									<Button
										text="Подобрать размер"
										small
										onClick={
											() => this.props.openModal({
												modalType: ModalExample,
												modalProps: {
													className: style.ProductForm__sizesModal,
													text: (
														<img src={sizeImg} alt=""/>
													),
													hasClose: true
												}
											})
										}
									/>
								}
							</div>
							{/* <Button
								className={style.ProductForm__button}
								text="Добавить в&nbsp;корзину"
								onClick={() => this.addToCart()}/> */}
							<div className={style.ProductForm__fastOrder}>
								<p className={style.ProductForm__fastOrder__title}>Купить в&nbsp;один клик</p>
								<div className={style.ProductForm__fastOrder__form}>
									<InputMask
										type="text"
										placeholder="Ваш номер телефона"
										className={style.ProductForm__fastOrder__input}
										mask="+7\ 999 999-99-99"
										ref={(el) => this.phone = el}
										maskChar=""
									/>
									<Button
										className={style.ProductForm__button}
										text="отправить запрос"
										onClick={() => {
											if (!this.phone.value) {
												alert('Вы не указали телефон');
												return false;
											}
											const utm = window.utm ? window.utm : {}
											post(
												`/colors/${id}/request`,
												{
													phone: this.phone.value,
													size: this.state.activeSize,
													...utm,
												},
												response => this.onSuccess(),
												error => console.log(error)
											);
										}}/>
								</div>
								<p className={style.ProductForm__agree}>нажимая кнопку "Отправить запрос", Вы подтверждаете, что предоставляете свое согласие на обработку Ваших персональных данных</p>
							</div>
						</div>
					</div>
					<div className={style.ProductForm__callback}>
						<div className={style.ProductForm__callback__title}>Свяжитесь с нами:</div>
						<div className={style.ProductForm__callback__inner}>
							<span className={style.ProductForm__callback__text}>Оформить заказ по телефону и уточнить наличие товара</span>
							<a href="tel:89286206404" className={style.ProductForm__callback__phone}>8-(928)-620-64-04</a>
							<span className={style.ProductForm__callback__note}>Информация о наличии товаров обновляется каждые 30 минут. Ассортимент товара их цена в магазине могут отличаться от информации на сайте.</span>
						</div>
					</div>
					{product.description &&
						<div className={style.ProductForm__info}>
								<div className={style.ProductForm__info__block}>
									<p className={style.ProductForm__info__title}>Описание</p>
									<p className={style.ProductForm__info__text}>{product.description}</p>
								</div>
							{/* {product.characteristics && (
								<div className={style.ProductForm__info__block}>
									<p className={style.ProductForm__info__title}>{product.characteristics.title ? product.characteristics.title : 'Характеристики'}</p>

								</div>
							)} */}
							{/* <div className={style.ProductForm__info__block}>
								<p className={style.ProductForm__info__title}>{product.brand.name}</p>
								<p className={style.ProductForm__info__text}>{product.brand.description}</p>
							</div>
							<div className={style.ProductForm__info__block}>
								<p className={style.ProductForm__info__title}>Доставка и возврат</p>
								<p className={style.ProductForm__info__text}>{htmlParser(deliveryText.text)}</p>
							</div> */}
						</div>
					}
				</div>
			</div>
		)
	}
}

ProductForm.propTypes = {
	addToCart: PropTypes.func.isRequired,
	setSlider: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { products } = state.products;
	const { added: favorites } = state.favorites;
	return { products, favorites };
};

const mapDispatchToProps = dispatch => {
	return {
		openModal: modalParams => dispatch(actions.openModal(modalParams)),
		closeModal: () => dispatch(actions.closeModal()),
		setStatusModal: (status) => dispatch(actions.setStatusModal(status)),
		addToFavorites: (product) => dispatch(favoritesAction.addToFavorites(product)),
		removeFromFavorites: (productId) => dispatch(favoritesAction.removeFromFavorites(productId))
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));
