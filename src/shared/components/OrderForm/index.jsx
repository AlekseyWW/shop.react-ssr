import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
	post: "Доставка Почтой России",
	sdek: "Служба доставки СДЭК",
	вук: "При выборе доставки почты россии, стоимость уточняется у администрации магазина, после оформления заказа",
	postRussianТщеу: "При заказе от на сумму 4 500 рублей, действует скидка 500 на доставку почтой россии, и при заказе от 8 000 рублей -  скидка 500 на доставку службой СДЕК.",
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

	state={
		promocode: 0
	}
	componentDidMount() {
		
		if (this.props.deliveryCity && this.props.deliveryCity.id) {
			const productsForDelivery = this.props.products.map(product => ({
				id: product.id,
				quantity: product.count,
				size: {
					id: product.sizeId
				}
			}))
			
			// this.props.getDeliveryCoast(data.value, productsForDelivery);
			
			if (this.props.deliveryCity.id) {
				
				this.props.getDeliveryCoast(this.props.deliveryCity.id, productsForDelivery)
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.deliveryCity && (nextProps.products !== this.props.products) && (nextProps.deliveryCity !== this.props.deliveryCity)) {
			console.log(nextProps);
			const productsForDelivery = nextProps.products.map(product => ({
				id: product.id,
				quantity: product.count,
				size: {
					id: product.sizeId
				}
			}))
			if (nextProps.deliveryCity.id) {
				this.props.getDeliveryCoast(nextProps.deliveryCity.id, productsForDelivery);
				this.props.change('deliveryType', null)
			}
		}
	}
	getOptions(input, callback) {
		const url = 'http://api-shop.abo-soft.com/sdek/cities';
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
		const { handleSubmit, products, deliveryCost, deliveryCity, delivery, profile, paymentType, sdek } = this.props;
		const productsForDelivery = products.map(product => ({
			id: product.id,
			quantity: product.count,
			size: {
				id: product.sizeId
			}
		}))
		
		const currentSumm = paymentType ? find(sdek.deliveryTypes, b => b.delivery === paymentType && b.code === delivery) : find(sdek.deliveryTypes, b => b.delivery !== 'electronic_payment' && b.code === delivery)
		const promoAmount = profile && profile.promocodes && profile.promocodes.length > 0 && getCartSummM(products) > 3000 ? profile.promocodes[0].amount : 0;
		
		if (delivery == 'post') {
			this.props.change('paymentType', 'payment_on_delivery')
		}
		
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
									if (data.value) {
										this.props.getDeliveryCoast(data.value, productsForDelivery);
										this.props.change('deliveryType', null)
									}
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
								{getCartSummM(products)} ₽
						</div>
						</div>
					</div>
					<div className={style.OrderDeliver}>
						<div className={style.OrderDeliver__column}>
							<p>Доставка</p>
							<p>При заказе на&nbsp;сумму от&nbsp;1&nbsp;500&nbsp;рублей, доставку почтой россии - БЕСПЛАТНО, и&nbsp;при заказе от&nbsp;7&nbsp;500 рублей&nbsp;&mdash; скидка 500&nbsp;на доставку службой СДЕК.</p>
						</div>
						<div className={style.OrderDeliver__column}>
							{sdek && sdek.deliveryTypes ? filter(sdek.deliveryTypes, b => b.delivery !== "electronic_payment").map((type, id) => {
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
								<p>После выбора города, здесь появятся доступные методы доставки.</p>
							}
						</div>
					</div>
					<div className={style.OrderSumm}>
						<p>Итого</p>
						<p>{getCartSummM(products) + (currentSumm ? currentSumm.priceWithDiscount : 0) - promoAmount} ₽</p>
						{/* {this.props.promocode === 'NEW_STEP_84458272' && <p>Скидка по промокоду: {promoAmount} ₽</p>} */}
					</div>
					<div className={style.OrderPay}>
						<div className={style.OrderPay__title}>
							<p>Выберите способ оплаты</p>
						</div>
						{sdek && sdek.paymentTypes ? 
							<div>
								{/* { delivery == 'post' ?  */}
								{/* <p>Вы выбрали доставку Почтой России, стоимость уточняется после оформления заказа</p> :  */}
								{sdek.paymentTypes.map((type, id) => {
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
							<p>После выбора города, здесь появятся доступные методы оплаты.</p>
						}
						{/* <Field
							name="paymentType"
							component={CheckBox}
							item={payData.cash}
							index={0}
							type="option"
							className={style.OrderPay__option}
						/>
						<Field
							name="paymentType"
							component={CheckBox}
							item={payData.card}
							index={0}
							type="option"
							className={style.OrderPay__option}
						/>
						{delivery === 'post' && <Field
							name="paymentType"
							component={CheckBox}
							item={payData.pod}
							index={0}
							type="option"
							className={style.OrderPay__option}
						/>} */}
					</div>
					<Button text="Оформить заказ" className={style.OrderPay__button} type="submit" />
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
	const { accessToken, profile, profileIsLoaded } = state.user;
	const val = order ? order.values : {};
	const sdek = state.sdek;
	const products = state.cart.added;
	const initialValues = accessToken && profileIsLoaded && profile ? { ...profile, promocode: profile.promocodes && profile.promocodes[0] ? profile.promocodes[0].code : '', city: profile.city ? { id: profile.city.id, label: profile.city.name } : null, colors: products.map(product => ({ id: product.id, quantity: product.count, size: { id: product.sizeId } })) } : { ...val, colors: products.map(product => ({ id: product.id, quantity: product.count, size: { id: product.sizeId }})) };
	const delivery = selector(state, 'deliveryType');
	const deliveryCity = selector(state, 'city');
	const paymentType = selector(state, 'paymentType');
	const promocode = selector(state, 'promocode');

	const deliveryCost = delivery === 'post' ? price : deliveryData[delivery] && deliveryData[delivery].price ? deliveryData[delivery].price : 0;
	return { products, sdek, delivery, deliveryCost, initialValues, paymentType, price, profile, deliveryCity, promocode };
}
const mapDispatchToProps = dispatch => ({
	getCities: (name) => dispatch(loadCities(name)),
	getDeliveryCoast: (id, data) => dispatch(getDeliveryCoast(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);

