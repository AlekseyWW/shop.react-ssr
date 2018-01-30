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
import ModalExample from '../../components/ModalExample';
import { withRouter } from 'react-router';
import { InstagramIcon } from 'components/Icon';
import InstagramEmbed from 'react-instagram-embed'
import { actions } from '../../state/modules/modal.js';

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
		this.setState({error: null})
		this.props.closeModal()
		this.props.history.replace('/success')
	}
	addToCart() {
		if (!this.state.activeSize) {
			alert('Выберите размер')
			return false;
		}
		const product = {
			id: _.find(this.props.product.colors, { name: this.props.color }).id,
			image: _.find(this.props.product.colors, { name: this.props.color }).thumb,
			name: this.props.product.name,
			color: this.props.color,
			price: this.props.product.price || this.props.product.oldPrice,
			size: this.state.activeSize
		}
		this.props.addToCart(product)
	}
	render() {
		const { addToCart, product, setSlider, color } = this.props;
		const activeColor = _.find(product.colors, { name: color });
		const id = activeColor ? activeColor.id : 0;
		const propsModal = {
			title: product.name,
			status: 'deliver',
			text: (
				<a href="http://instagram.com/sneaker_topcheg" target="_blank" className={style.ProductForm__instagramm}>
					<InstagramIcon />
				</a>
			),
			subTitle: 'Ваша заявка принята, ожидайте звонок личного консультанта! А пока загляните к нам в инстаграмм ',
			hasClose: true,
			buttons: []
		}
		return (
			<div className={style.ProductForm}>
				<div className={style.ProductForm__container}>
					<div className={style.ProductForm__head}>
						<p className={style.ProductForm__title}>{product.name}</p>
						{/* <p className={style.ProductForm__subline}>{product.name}</p> */}
						
					</div>
					<div className={style.ProductForm__price}>
						<p className={style.ProductForm__price__value}>{product.isSale ? product.price : product.oldPrice} руб.</p>
						{product.isSale && <p className={style.ProductForm__price__old}>{product.oldPrice} руб.</p>}
						<span className={style.ProductForm__callback__note}>Наличие товара вашего размера и понравившегося цвета можно уточнить оформив заявку, или написав нам в <a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank">WhatsApp.</a></span>
					</div>
					<div className={style.ProductForm__action}>
						{product.colors.length > 1 &&
							<div className={style.ProductForm__colors}>
								{product.colors.map((color, id) => (
									<NavLink key={color.name} className={style.ProductForm__color} to={`/products/${product.slug}?color=${color.name}`}>
										<img src={color.thumb} />
									</NavLink>
								))}
							</div>
						}
						<div className={style.ProductForm__buttons}>
							<div className={style.ProductForm__sizes}>
								<div className={style.ProductForm__sizes__container}>
									{activeColor.sizes.map(size => {
										const sizeClass = classNames({
											[`${style.ProductForm__sizes__item}`]: true,
											[`${style.ProductForm__sizes__item_active}`]: size === this.state.activeSize,
										})
										return (
											<div onClick={() => this.setState({ activeSize: size })} className={sizeClass} key={size.id}>{size.name}</div>
										)}
									)}
								</div>
								<Button text="Подобрать размер" small disabled/>
							</div>
							{/* <Button
								className={style.ProductForm__button}
								text="Добавить в&nbsp;корзину"
								onClick={() => this.addToCart()}/> */}
							<Button
								className={style.ProductForm__button}
								text="Оформить заявку"
								onClick={() => {
									this.props.openModal({
										modalType: ModalExample,
										modalProps: {
											title: product.name,
											status: 'order',
											text: (
												<form className={style.Modal__form}>
													{this.state.error &&
														<div className={style.Modal__error}>
															{this.state.error}
														</div>
													}
													<input name="phone" className={style.ProductForm__input} type="text" placeholder="Ваш телефон" ref={(el) => this.phone = el} />
													<input name="name" className={style.ProductForm__input} type="text" placeholder="Ваше имя" ref={(el) => this.name = el} />
												</form>
											),
											subTitle: 'Оставьте свои контактные данные и&nbsp;получите подарок к&nbsp;покупке!',
											hasClose: true,
											buttons: [
												{
													text: 'Отправить',
													intent: 'success',
													className: style.ProductForm__button,
													onClick: () => {
														if (!this.phone.value) {
															alert('Вы не указали телефон')
															return false;
														}
														if (!this.name.value) {
															alert('Вы не указали имя')
															return false;
														}
														post(
															`/colors/${id}/request`,
															{
																name: this.name.value,
																phone: this.phone.value,
															},
															response => this.onSuccess(),
															error => console.log(error)
														);
													}
												}
											]
										}
									});
								}}/>
						</div>
					</div>
					<div className={style.ProductForm__callback}>
						<div className={style.ProductForm__callback__title}>Свяжитесь с нами:</div>
						<div className={style.ProductForm__callback__inner}>
							<span className={style.ProductForm__callback__text}>Оформить заказ по телефону и уточнить наличие товара</span>
							<a href="tel:88005112008" className={style.ProductForm__callback__phone}>8-(800)-511-20-08</a>
							<span className={style.ProductForm__callback__note}>Информация о наличии товаров обновляется каждые 30 минут. Ассортимент товара их цена в магазине могут отличаться от информации на сайте.</span>
						</div>
					</div>
					{/* <div className={style.ProductForm__info}>
					<div className={style.ProductForm__info__block}>
						<p className={style.ProductForm__info__title}>Описание</p>
						<p className={style.ProductForm__info__text}>{product.description}</p>
					</div>
					{product.characteristics && (
						<div className={style.ProductForm__info__block}>
							<p className={style.ProductForm__info__title}>{product.characteristics.title ? product.characteristics.title : 'Характеристики'}</p>

						</div>
					)}
					<div className={style.ProductForm__info__block}>
						<p className={style.ProductForm__info__title}>{product.brand.name}</p>
						<p className={style.ProductForm__info__text}>{product.brand.description}</p>
					</div>
					<div className={style.ProductForm__info__block}>
						<p className={style.ProductForm__info__title}>Доставка и возврат</p>
						<p className={style.ProductForm__info__text}>{htmlParser(deliveryText.text)}</p>
					</div>
				</div> */}
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

const mapDispatchToProps = dispatch => {
	return {
		openModal: modalParams => dispatch(actions.openModal(modalParams)),
		closeModal: () => dispatch(actions.closeModal()),
		setStatusModal: (status) => dispatch(actions.setStatusModal(status))
	};
};
export default withRouter(connect(null, mapDispatchToProps)(ProductForm));
