import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import filter from 'lodash/filter';
import { required, email } from 'utils/validation';

import style from './styles.styl';

const deliveryData = {
	post: "Доставка Почтой России",
	sdek: "Служба доставки СДЭК",
	courier: "Курьер по Ростову-на-Дону",
	'self_delivery': "Забрать самостоятельно"
}
const payData = {
	cash: {
		name: "Наличный расчет",
		price: "Оплата наличными при доставке заказа курьером"
	},
	electronic_payment: {
		name: "Оплата дебетовой или кредитной картой"
	},
	payment_on_delivery: {
		name: "Наложенным платежом при получении"
	}
};
const promocode = [{
	"id": 1,
	"code": "NEW_STEP_STORE_38578641",
	"amount": 500
}]
class OrderForm extends Component {
	componentDidMount() {
		this.alertify = require('alertify.js');
	}
	submit() {
		if (!this.props.valid) {
			this.alertify.alert("Форма заполнена неверно! Пожалуста заполните все обязательные поля корректными данными.");
		}
	}
	render() {
		const { handleSubmit, products, isDeliveryLoading, isDeliveryLoaded, orderSumm, cartSumm, deliveryTypes, getDeliveryCoast, paymentTypes, productsForDelivery } = this.props;
		// console.log(this.props.valid);
		
		return (
			<form onSubmit={handleSubmit} className={style.OrderForm}>
				<div className={style.OrderForm__column}>
					<div className={style.OrderForm__label}>
						<span className={style.OrderForm__title}>Адрес доставки</span>
						<span className={style.OrderForm__note}>* Поля обязательные для заполнения</span>
					</div>
					<div className={style.OrderForm__list}>
						<div className={style.OrderForm__group}>
							<Field
								name="firstName"
								component={Input}
								type="text"
								className={style.OrderForm__input}
								label="Имя*"
								validate={[required]}
							/>
							<Field
								name="lastName"
								component={Input}
								type="text"
								className={style.OrderForm__input}
								label="Фамилия*"
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="city"
								component={Select}
								options={this.props.cities}
								type="text"
								getDeliveryCoast={getDeliveryCoast}
								onChange={(data) => {
									if (data.value) {
										getDeliveryCoast(data.value, productsForDelivery);
										this.props.change('deliveryType', null)
									}
								}}
								getOptions={this.props.getOptions}
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Город, населенный пункт*"
								validate={[required]}
							/>
							<Field
								name="postIndex"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Почтовый индекс*"
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="address"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Адрес*"
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="email"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="E-mail*"
								validate={[required, email]}
							/>
							<Field
								name="phone"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Телефон*"
								numberFormat
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="promocode"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Промокод"
							/>
							<Field
								name="comment"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Комментарий"
							/>
							<p className={style.OrderForm__group__note}>*Промокод десйтвует только при покупке от 3000 рублей.</p>
						</div>
					</div>
				</div>
				<div className={style.OrderForm__column}>
					<div className={style.OrderForm__label}>
						<span className={style.OrderForm__title}>Ваш заказ</span>
					</div>
					<div className={style.OrderTable}>
						<div className={`${style.OrderTable__row} ${style.OrderTable__row_title}`}>
							<div className={style.OrderTable__cell}>
								Наименование
						</div>
							<div className={style.OrderTable__cell}>
								Стоимость
						</div>
						</div>
						{products.map(product => (
							<div key={`${product.name}-${product.size.id}`} className={style.OrderTable__row}>
								<div className={`${style.OrderTable__cell} ${style.OrderTable__cell_name}`}>
									{product.name} x {product.count}
								</div>
								<div className={style.OrderTable__cell}>
									{product.price * product.count} ₽
							</div>
							</div>
						))}
						<div className={style.OrderTable__row}>
							<div className={style.OrderTable__cell}>
								Промежуточный итог
						</div>
							<div className={style.OrderTable__cell}>
								{cartSumm} ₽
						</div>
						</div>
					</div>
					<div className={style.OrderDeliver}>
						<div className={style.OrderDeliver__column}>
							<p>Доставка</p>
							<p>При заказе на&nbsp;сумму от&nbsp;1&nbsp;500&nbsp;рублей, доставку почтой россии - БЕСПЛАТНО, и&nbsp;при заказе от&nbsp;4&nbsp;500 рублей&nbsp;&mdash; скидка 500&nbsp;на доставку службой СДЕК.</p>
						</div>
						<div className={style.OrderDeliver__column}>
							{deliveryTypes && !isDeliveryLoading && isDeliveryLoaded ? filter(deliveryTypes, b => b.delivery !== "electronic_payment").map((type, id) => {
								const key = `item-${id}`;
								return type.code !== 'self_delivery' ? (
									<div key={key} className={style.OrderDeliver__item}>
										<Field
											name="deliveryType"
											component={CheckBox}
											item={{
												id: type.code,
												name: deliveryData[type.code],
												price: type.priceWithDiscount > 0 ? `${type.priceWithDiscount} ₽` : 'Бесплатно'
											}}
											index={0}
											type="option"
											className={style.OrderDeliver__option}
											validate={[required]}
										/>
									</div>
								) : null
							}): 
								isDeliveryLoading  ? <p>загрузка...</p> : <p>После выбора города, здесь появятся доступные методы доставки.</p>
							}
						</div>
					</div>
					<div className={style.OrderSumm}>
						<p>Итого</p>
						<p>{orderSumm} ₽</p>
						{/* {this.props.promocode === 'NEW_STEP_84458272' && <p>Скидка по промокоду: {promoAmount} ₽</p>} */}
					</div>
					<div className={style.OrderPay}>
						<div className={style.OrderPay__title}>
							<p>Выберите способ оплаты</p>
						</div>
						{paymentTypes && !isDeliveryLoading && isDeliveryLoaded ? 
							<div>
								{paymentTypes.map((type, id) => {
								const key = `item-${id}`;
									
									return type.code !== 'payment_on_delivery' ? (
										<Field
											key={key}
											name="paymentType"
											component={CheckBox}
											item={{
												id: type.code,
												name: payData[type.code].name,
												price: payData[type.code].price
											}}
											index={0}
											type="option"
											className={style.OrderPay__option}
											validate={[required]}
										/>
										) : null
								})}
							</div> :
							isDeliveryLoading ? <p>загрузка...</p> : <p>После выбора города, здесь появятся доступные методы оплаты.</p>
						}
					</div>
					<Button text="Оформить заказ" className={style.OrderPay__button} type="submit" onClick={() => this.submit()}/>
					<p>нажимая кнопку "Оформить заказ", Вы подтверждаете, что предоставляете свое согласие c <Link to="/agreement">политикой обработки персональных данных</Link></p>
				</div>
			</form>
		);
	}
}

OrderForm.defaultProps = {
	sm: false
}
OrderForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
};

OrderForm = reduxForm({
	form: 'order',
	enableReinitialize: true
})(OrderForm);

export default OrderForm;

