import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import Button from 'components/Button';
import Select from 'react-select';
import _ from 'lodash';
import { post } from 'utils/api';
import style from './styles.styl';
import deliveryText from './delivery.json';
import * as favoritesAction from 'actions/favorites/';
import Icon from 'components/Icon';
import ModalExample from '../../components/ModalExample';
import { withRouter } from 'react-router';
import { InstagramIcon, CartIcon } from 'components/Icon';
import InputMask from 'react-input-mask';
import { HurtIcon, HeartSold } from 'components/Icon';
import contactData from 'config/header.json';

import InstagramEmbed from 'react-instagram-embed';
import { actions } from '../../state/modules/modal.js';

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}
const brandImages = requireAll(
	require.context('../HeaderInfo/icons', true, /^\.\/.*\.svg$/)
);
const IconsArray = [];
brandImages.map(brand => {
	IconsArray[brand.default.id] = brand;
});

const sizeImages = {
	sneakers: '/tablica_obuv_rus-01.jpg',
	keds: '/tablica_obuv_rus-01.jpg',
	botinki: '/tablica_obuv_rus-01.jpg',
	tufli: '/tablica_obuv_rus-01.jpg',
	Casual: '/tablica_obuv_rus-01.jpg',
	clothes: '/tablica_man_odegda-01.jpg',
	sweatshirt: '/tablica_man_odegda-01.jpg',
	Jeans: '//tablica_bruki-01.jpg',
	Bombers: '/tablica_man_odegda-01.jpg',
	Mantle: '/tablica_man_odegda-01.jpg',
	Polo: '/tablica_man_odegda-01.jpg',
	Tracksuits: '/tablica_man_odegda-01.jpg',
	SportsTrousers: '/tablica_man_odegda-01.jpg',
	'T-shirts': '/tablica_man_odegda-01.jpg',
};

const logos = {
	Puma: 'puma',

	Adidas: 'adidas',

	Reebok: 'reebok',

	Nike: 'nike',

	'Mont Blanc': 'mon',

	Vans: 'vans',

	'New Balance': 'nb',
};
class ProductForm extends Component {
	state = {
		modalIsOpen: false,
		status: 'order',
		error: null,
		activeSize: '',
		selectedOption: '',
	};

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
		this.setState({ error: null });
		yaCounter47068560.reachGoal('RESPONSE');
		this.props.closeModal();
		this.props.history.replace('/success');
	}
	addToCart() {
		if (!this.state.activeSize) {
			alert('Выберите размер');
			return false;
		}
		const currentColor = _.find(this.props.product.colors, b => {
			return b.name.trim() === this.props.color.trim();
		})
			? _.find(this.props.product.colors, b => {
					return b.name.trim() === this.props.color.trim();
			  })
			: this.props.product.colors[0];

		const id = _.find(currentColor.sizes, {
			id: _.find(currentColor.sizes, { id: this.state.activeSize.value })
				.id,
		}).id;

		const product = {
			id: currentColor.id,
			sizeId: id,
			image: currentColor.thumb,
			name: this.props.product.name,
			color: this.props.color,
			slug: this.props.product.slug,
			price:
				currentColor && currentColor.isSale
					? currentColor.price
					: currentColor.oldPrice,
			size: _.find(currentColor.sizes, {
				id: this.state.activeSize.value,
			}),
		};
		this.props.addToCart(product);
	}

	toogleFavotite = () => {
		const product = {
			..._.find(this.props.product.colors, b => {
				return b.name.trim() === this.props.color.trim();
			}),
		};
		product.img = product.thumb;
		product.product = this.props.product;
		const remove = _.find(this.props.favorites, { id: product.id })
			? true
			: false;
		this.props.addToFavorites(product, remove);
	};
	handleChange = selectedOption => {
		this.setState({ activeSize: selectedOption });
	};
	render() {
		const { addToCart, product, setSlider, color } = this.props;

		const filtredColors = _.filter(
			product.colors,
			b => _.filter(b.sizes, d => d.quantity > 0).length > 0
		);
		const activeColor =
			color &&
			_.find(filtredColors, b => {
				return color && b.name.trim() === color.trim();
			})
				? _.find(filtredColors, b => {
						return color && b.name.trim() === color.trim();
				  })
				: filtredColors[0];

		const id = activeColor ? activeColor.id : 0;

		const favClass = classNames(style.ProductForm__favorite, {
			[style.ProductForm__favorite_active]: _.find(this.props.favorites, {
				id: activeColor.id,
			}),
		});
		const heartClass = classNames(style.ProductForm__favorite__heart, {
			[style.ProductForm__favorite__heart_active]: _.find(
				this.props.favorites,
				{ id: activeColor.id }
			),
		});
		const sizeImg = product.category
			? sizeImages[product.category.name.trim()]
			: '';

		const groupSizes =
			activeColor && activeColor.sizes
				? _.groupBy(
						_.filter(activeColor.sizes, b => b.quantity > 0),
						'sex'
				  )
				: [];
		const options = Object.keys(groupSizes).map(sex => ({
			label: sex,
			options: groupSizes[sex].map(size => ({
				value: size.id,
				label: size.name,
			})),
		}));
		const { activeSize } = this.state;
		const value = activeSize && activeSize.value;
		const icon =
			product &&
			product.brand &&
			logos[product.brand.name] &&
			IconsArray[logos[product.brand.name]]
				? IconsArray[logos[product.brand.name]].default
				: '';

		return (
			<div className={style.ProductForm}>
				<div className={style.ProductForm__container}>
					<div className={style.ProductForm__head}>
						<p className={style.ProductForm__title}>
							{product.name}
						</p>
						{icon && (
							<Icon
								glyph={icon}
								width={40}
								height={20}
								className={style.HeaderInfo__brands__icon}
							/>
						)}
					</div>
					{activeColor && (
						<div className={style.ProductForm__priceblock}>
							<div className={style.ProductForm__price}>
								<p className={style.ProductForm__price__value}>
									{activeColor && activeColor.isSale
										? activeColor.price
										: activeColor.oldPrice}{' '}
									₽.
								</p>
								{activeColor &&
									activeColor.isSale && (
										<p
											className={
												style.ProductForm__price__old
											}
										>
											{activeColor.oldPrice} ₽.
										</p>
									)}
								<div
									className={
										style.ProductForm__priceblock__content
									}
								>
									<button
										className={favClass}
										onClick={this.toogleFavotite}
									>
										<HurtIcon />
										<HeartSold className={heartClass} />
									</button>
									<span>Колличество ограничено</span>
								</div>
							</div>
						</div>
					)}
					<div className={style.ProductForm__action}>
						{filtredColors.length > 1 && (
							<div className={style.ProductForm__colors}>
								{filtredColors.map((color, id) => (
									<NavLink
										key={color.name}
										className={style.ProductForm__color}
										to={`/products/${product.slug}?color=${
											color.name
										}`}
										replace
									>
										<img src={color.thumb} />
									</NavLink>
								))}
							</div>
						)}
						<div className={style.ProductForm__buttons}>
							<div className={style.ProductForm__sizes}>
								<div
									className={
										style.ProductForm__sizes__container
									}
								/>
								<div className={style.ProductForm__sizeblock}>
									<Select
										className={style.ProductForm__select}
										optionClassName={
											style.ProductForm__select__option
										}
										value={value}
										onChange={this.handleChange}
										options={options[0].options}
										placeholder="Выберите размер"
									/>
									{sizeImg && (
										<Button
											text="Подобрать размер"
											small
											onClick={() =>
												this.props.openModal({
													modalType: ModalExample,
													modalProps: {
														className:
															style.ProductForm__sizesModal,
														text: (
															<img
																src={sizeImg}
																alt=""
															/>
														),
														hasClose: true,
													},
												})
											}
										/>
									)}
								</div>
							</div>
							<Button
								className={style.ProductForm__button}
								text={
									_.find(this.props.cart, {
										id: activeColor.id,
									})
										? 'В корзине'
										: 'Добавить в корзину'
								}
								disabled={
									_.find(this.props.cart, {
										id: activeColor.id,
									}) || this.props.isFetching
										? true
										: false
								}
								onClick={() => this.addToCart()}
							>
								<CartIcon />
							</Button>
							<div className={style.ProductForm__fastOrder}>
								<p
									className={
										style.ProductForm__fastOrder__title
									}
								>
									Звонок менеджера за&nbsp;один клик
								</p>
								<div
									className={
										style.ProductForm__fastOrder__form
									}
								>
									<InputMask
										type="text"
										placeholder="Ваш номер телефона"
										className={
											style.ProductForm__fastOrder__input
										}
										mask="+7\ 999 999-99-99"
										ref={el => (this.phone = el)}
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
											const utm = window.utm
												? window.utm
												: {};
											post(
												`/colors/${id}/request`,
												{
													phone: this.phone.value,
													size: _.find(
														activeColor.sizes,
														{ id: activeSize.value }
													),
													...utm,
												},
												response => this.onSuccess(),
												error => console.log(error)
											);
										}}
									/>
								</div>
								<p className={style.ProductForm__agree}>
									нажимая кнопку "Отправить запрос", Вы
									подтверждаете, что предоставляете свое
									согласие на обработку Ваших персональных
									данных
								</p>
							</div>
						</div>
					</div>
					<div className={style.ProductForm__callback}>
						<div className={style.ProductForm__callback__title}>
							Свяжитесь с нами:
						</div>
						<div className={style.ProductForm__callback__inner}>
							<span className={style.ProductForm__callback__text}>
								Оформить заказ по телефону и уточнить наличие
								товара
							</span>
							<p>Ростовская область:</p>
							<a
								href={contactData.contacts.phone.url}
								className={style.ProductForm__callback__phone}
							>
								{contactData.contacts.phone.text}
							</a>
							<p>Россия:</p>
							<a
								href={contactData.contacts.phoneRussia.text}
								className={style.ProductForm__callback__phone}
							>
								{contactData.contacts.phoneRussia.text}
							</a>
							<span className={style.ProductForm__callback__note}>
								Информация о наличии товаров обновляется каждые
								30 минут. Ассортимент товара их цена в магазине
								могут отличаться от информации на сайте.
							</span>
						</div>
					</div>
					<div className={style.ProductForm__info}>
						{product.description && (
							<div className={style.ProductForm__info__block}>
								<p className={style.ProductForm__info__title}>
									Описание
								</p>
								<p className={style.ProductForm__info__text}>
									{product.description}
								</p>
							</div>
						)}
						{product.brand &&
							product.brand.description && (
								<div className={style.ProductForm__info__block}>
									<p
										className={
											style.ProductForm__info__title
										}
									>
										{product.brand.name
											? product.brand.name
											: 'Бренд'}
									</p>
									<p
										className={
											style.ProductForm__info__text
										}
									>
										{product.brand.description}
									</p>
								</div>
							)}
						{/* <div className={style.ProductForm__info__block}>
								<p className={style.ProductForm__info__title}>{product.brand.name}</p>
								<p className={style.ProductForm__info__text}>{product.brand.description}</p>
							</div> */}
						<div className={style.ProductForm__info__block}>
							<p className={style.ProductForm__info__title}>
								Доставка и возврат
							</p>
							<p className={style.ProductForm__info__text}>
								{htmlParser(deliveryText.text)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProductForm.defaultProps = {
	color: '',
};
ProductForm.propTypes = {
	addToCart: PropTypes.func.isRequired,
	setSlider: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired,
	color: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
	const { products } = state.products;
	const { added: favorites } = state.favorites;
	const { added: cart, isFetching } = state.cart;
	return { products, favorites, cart, isFetching };
};

const mapDispatchToProps = dispatch => {
	return {
		openModal: modalParams => dispatch(actions.openModal(modalParams)),
		closeModal: () => dispatch(actions.closeModal()),
		setStatusModal: status => dispatch(actions.setStatusModal(status)),
		addToFavorites: (product, remove) =>
			dispatch(favoritesAction.addToFavorites(product, remove)),
		removeFromFavorites: productId =>
			dispatch(favoritesAction.removeFromFavorites(productId)),
	};
};
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProductForm)
);
