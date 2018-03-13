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
import filter from 'lodash/filter';
import find from 'lodash/find';
import { required, email } from 'utils/validation';

import style from './styles.styl';

const getCartSummM = added => (added.length ? (added.reduce((summ, item) => (summ + item.count * item.price), 0)) : '');
const deliveryData = {
	post: "сдужба доставки СДЭК",
	courier: "Курьер <nobr>по&nbsp;Ростову-на-Дону</nobr>",
	'self_delivery': "Забрать самостоятельно"
}
const payData = {
	cash: {
		name: "Наличный расчет",
		price: "Оплата наличными при замовывозе или доставке заказа курьером"
	},
	electronic_payment: {
		name: "Предоплата дебетовой или кредитной картой"
	},
	payment_on_delivery: {
		name: "Наложенным платежом при получении"
	}
};
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
				console.log(err.message);
			});
	}
	render() {
		const { handleSubmit, products, deliveryCost, deliveryCity, delivery, payType, sdek } = this.props;
		const productsForDelivery = products.map(product => ({
			id: product.id,
			quantity: product.count,
			size: {
				id: product.size.id
			}
		}))
		const currentSumm = payType ? find(sdek.deliveryTypes, b => b.delivery === payType && b.code === delivery) : find(sdek.deliveryTypes, b => b.delivery !== 'electronic_payment' && b.code === delivery)
		
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
								getDeliveryCoast={this.props.getDeliveryCoast}
								onChange={(data) => {
									this.props.getDeliveryCoast(data.value, productsForDelivery);
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
							<Field
								name="country"
								component={Input}
								type="text"
								className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
								label="страна"
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
							{sdek && sdek.deliveryTypes && filter(sdek.deliveryTypes, b => b.delivery !== "electronic_payment").map((type, id) => {
								const key = `item-${id}`;

								return (
									<div key={key} className={style.OrderDeliver__item}>
										<Field
											name="deliveryType"
											component={CheckBox}
											item={{
												id: type.code,
												name: deliveryData[type.code],
												price: type.price > 0 ? type.price : ''
											}}
											index={0}
											type="option"
											className={style.OrderDeliver__option}
										/>
									</div>
								)
							})}
						</div>
					</div>
					<div className={style.OrderSumm}>
						<p>Итого</p>
						<p>{getCartSummM(products) + (currentSumm ? currentSumm.price : 0)} ₽</p>
					</div>
					<div className={style.OrderPay}>
						<div className={style.OrderPay__title}>
							<p>Выберите способ оплаты</p>
						</div>
						{sdek && sdek.paymentTypes && sdek.paymentTypes.map((type, id) => {
							const key = `item-${id}`;

							return (
									<Field
										key={key}
										name="payType"
										component={CheckBox}
										item={{
											id: type,
											name: payData[type].name,
											price: payData[type].price
										}}
										index={0}
										type="option"
										className={style.OrderPay__option}
									/>
							)
						})}
						{/* <Field
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
						/>} */}
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
	const { order } = state.form;
	const val = order ? order.values : {};
	const sdek = state.sdek;
	const products = state.cart.added;
	const initialValues = { ...val, colors: products.map(product => ({ id: product.id, quantity: product.count, size: product.size})) };
	const delivery = selector(state, 'deliveryType');
	const deliveryCity = selector(state, 'city');
	const payType = selector(state, 'payType');
	const deliveryCost = delivery === 'post' ? price : deliveryData[delivery] && deliveryData[delivery].price ? deliveryData[delivery].price : 0;
	return { products, sdek, delivery, deliveryCost, initialValues, payType, price, deliveryCity };
}
const mapDispatchToProps = dispatch => ({
	getCities: (name) => dispatch(loadCities(name)),
	getDeliveryCoast: (id, data) => dispatch(getDeliveryCoast(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);

