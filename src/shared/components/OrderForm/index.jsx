import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import Select from 'components/Select';
import { loadCities, getDeliveryCoast } from '../../state/modules/sdek';
import Button from 'components/Button';
import { required, email } from 'utils/validation';

import style from './styles.styl';

const getCartSummM = added => (added.length ? (added.reduce((summ, item) => (summ + item.count * item.price), 0)) : '');
const deliveryData = {
	post: {
		id: "post",
		name: "EMS почта россии",
		price: 500
	},
	courier: {
		id: "courier",
		name: "Курьер <nobr>по&nbsp;Ростову-на-Дону</nobr>",
		price: 290
	},
	self: {
		id: "self",
		name: "Забрать самостоятельно"
	}
}
const payData = {
	cash: {
		id: "cash",
		name: "Наличный расчет",
		price: "Оплата наличными при доставке заказа курьером"
	},
	card: {
		id: "card",
		name: "Дебетовая или кредитная карта"
	},
	pod: {
		id: "pod",
		name: "Наложенным платежом при получении"
	}
}

class OrderForm extends Component {

	getOptions(input, callback) {
		const url = 'http://test-api-shop.abo-soft.com/sdek/cities';
		axios({
			method: 'get',
			url,
			params: { name: input },
		})
			.then(res => {
				const { data } = res;
				callback(null, {
					options: data.map(option => ({ label: option.name, value: option.id }))
				})
			})
			.catch(err => {
				dispatch(loadCitiesFailure(err.message));
			});
	}
	render() {
		const { handleSubmit, products, deliveryCost, deliveryCity, delivery } = this.props;
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
								name="country"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Страна*"
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="city"
								component={Select}
								options={this.props.cities}
								type="text"
								getDeliveryCoast={this.props.getDeliveryCoast}
								onChange={(data) => {
									this.props.getDeliveryCoast({ receiverCityId: data.value, senderCityId: '438.0'});
									this.props.change('deliveryType', null)
								}}
								getOptions={this.getOptions}
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
							<Field
								name="apartments"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Квартира, корпус, строение ит.д.*"
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="email"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="E-mail"
								validate={[required, email]}
							/>
							<Field
								name="phone"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Телефон*"
								validate={[required]}
							/>
						</div>
						<div className={style.OrderForm__group}>
							<Field
								name="comment"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="Комментарий"
							/>
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
								{getCartSummM(products)} ₽
						</div>
						</div>
					</div>
					<div className={style.OrderDeliver}>
						<div className={style.OrderDeliver__column}>
							<p>Доставка</p>
						</div>
						<div className={style.OrderDeliver__column}>
							{deliveryCity && deliveryCity.label !== 'Ростов-на-Дону' &&
								<div className={style.OrderDeliver__item}>
									<Field
										name="deliveryType"
										component={CheckBox}
										item={{
											id: "post",
											name: "EMS почта россии",
											price: this.props.price
										}}
										index={0}
										type="option"
										className={style.OrderDeliver__option}
									/>
								</div>
							}
							{deliveryCity && deliveryCity.label === 'Ростов-на-Дону' &&
								<div className={style.OrderDeliver__item}>
									<Field
										name="deliveryType"
										component={CheckBox}
										item={deliveryData.courier}
										index={1}
										type="option"
										className={style.OrderDeliver__option}
									/>
								</div>
							}
							{((deliveryCity && deliveryCity.label === 'Ростов-на-Дону') || !deliveryCity) &&
								<div className={style.OrderDeliver__item}>
									<Field
										name="deliveryType"
										component={CheckBox}
										item={deliveryData.self}
										index={2}
										type="option"
										className={style.OrderDeliver__option}
									/>
								</div>
							}
						</div>
					</div>
					<div className={style.OrderSumm}>
						<p>Итого</p>
						<p>{getCartSummM(products) + (this.props.payType === 'card' ? 0 : deliveryCost)} ₽</p>
					</div>
					<div className={style.OrderPay}>
						<div className={style.OrderPay__title}>
							<p>Выберите способ оплаты</p>
						</div>
						<Field
							name="payType"
							component={CheckBox}
							item={payData.cash}
							index={0}
							type="option"
							className={style.OrderPay__option}
						/>
						<Field
							name="payType"
							component={CheckBox}
							item={payData.card}
							index={0}
							type="option"
							className={style.OrderPay__option}
						/>
						{delivery === 'post' && <Field
							name="payType"
							component={CheckBox}
							item={payData.pod}
							index={0}
							type="option"
							className={style.OrderPay__option}
						/>}
					</div>
					<Button text="Оформить заказ" className={style.OrderPay__button} type="submit" />
					<p>нажимая кнопку "Оформить заказ", Вы подтверждаете, что предоставляете свое согласие на обработку Ваших персональных данных</p>
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
	deliveryCost: PropTypes.any.isRequired
};

OrderForm = reduxForm({
	// a unique name for the form
	form: 'order',
	enableReinitialize: true,
	destroyOnUnmount: false
})(OrderForm);
const selector = formValueSelector('order')

const mapStateToProps = state => {
	const { price } = state.sdek;
	const products = state.cart.added;
	const initialValues = { colors: products.map(product => ({ id: product.id, quantity: product.count, size: product.size})) };
	const delivery = selector(state, 'deliveryType');
	const deliveryCity = selector(state, 'city');
	const payType = selector(state, 'payType');
	const deliveryCost = delivery === 'post' ? price : deliveryData[delivery] && deliveryData[delivery].price ? deliveryData[delivery].price : 0;
	return { products, delivery, deliveryCost, initialValues, payType, price, deliveryCity };
}
const mapDispatchToProps = dispatch => ({
	getCities: (name) => dispatch(loadCities(name)),
	getDeliveryCoast: (data) => dispatch(getDeliveryCoast(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);

