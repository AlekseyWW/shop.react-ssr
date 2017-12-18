import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import Button from 'components/Button';
import style from './styles.styl';
import deliveryText from './delivery.json';
import ModalExample from '../../components/ModalExample';
import { actions } from '../../state/modules/modal.js';

class ProductForm extends Component {
	state = {
		modalIsOpen: false
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
	render() {
		const { addToCart, product, setSlider, color } = this.props;
		return (
			<div className={style.ProductForm}>
				<div className={style.ProductForm__container}>
					<div className={style.ProductForm__head}>
						<p className={style.ProductForm__title}>{product.title}</p>
						<p className={style.ProductForm__subline}>{product.name}</p>
					</div>
					<div className={style.ProductForm__price}>
						<p className={style.ProductForm__price__value}>{product.isSale ? product.price : product.oldPrice} руб.</p>
						{product.isSale && <p className={style.ProductForm__price__old}>{product.oldPrice}</p>}
					</div>
					<div className={style.ProductForm__action}>
						{product.colors.length > 1 &&
							<div className={style.ProductForm__colors}>
								{product.colors.map((color, id) => (
									<NavLink key={color.name} className={style.ProductForm__color} to={`/products/${product.slug}#color=${color.name}`}>
										<img src={color.thumb} />
									</NavLink>
								))}
							</div>
						}
						<div className={style.ProductForm__buttons}>
							{/* <div className={style.ProductForm__selectSize}>
							<Button className={style.ProductForm__select} text="Выберите размер" disabled />
							<Button text="Подобрать размер" small disabled/>
						</div> */}
							<Button
								className={style.ProductForm__button}
								text="Оформить заявку"
								onClick={() => {
									this.props.openModal({
										modalType: ModalExample,
										modalProps: {
											title: product.name,
											text: (
												<form className={style.Modal__form}>
													<input className={style.ProductForm__input} type="text" placeholder="Ваш телефон" />
													<input className={style.ProductForm__input} type="text" placeholder="Ваше имя" />
												</form>
											),
											subTitle: 'Оставьте свои контактные данные и наш консульатнт вам перезвонит',
											hasClose: false,
											buttons: [
												{
													text: 'Отправить',
													intent: 'success',
													className: style.ProductForm__button,
													onClick: () => {
														alert('Ок =)');
														this.props.closeModal();
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
							<span className={style.ProductForm__callback__text}>Оформить заказ по телфону и уточнить наличие товара</span>
							<span className={style.ProductForm__callback__phone}>+ 7 (928) 620-64-04</span>
							<span className={style.ProductForm__callback__note}>Информация о наличии товаров обновляется каждые 30 минут. Ассортимент товара их их цена в магазине могут отличаться от информации на сайте.</span>
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
		closeModal: () => dispatch(actions.closeModal())
	};
};
export default connect(null, mapDispatchToProps)(ProductForm);
