import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import Select from 'components/Select';
import OrderProducts from 'components/OrderProducts';
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
	courier: "Курьер по Ростову-на-Дону",
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
class Order extends Component {
	componentDidMount() {
		if (this.props.initialValues && this.props.initialValues.sity) {
			const productsForDelivery = this.props.products.map(product => ({
				id: product.id,
				quantity: product.count,
				size: {
					id: product.size.id
				}
			}))
			this.props.getDeliveryCoast(this.props.initialValues.sity, productsForDelivery)
		}
	}
	getOptions(input, callback) {
		const url = `${process.env.API_URL}/sdek/cities`;
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
		const { handleSubmit, products, deliveryCost, deliveryCity, delivery, order, paymentType, sdek, orders } = this.props;
		return (
			<div className={style.Order}>
				{order &&
					<div>
						<div className={style.Order__column}>
							<div className={style.Order__label}>
								<span className={style.Order__title}>Адрес доставки</span>
							</div>
							<div className={style.Order__list}>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Имя</p>
									<p className={style.Order__value}>{order.firstName}</p>
								</div>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Фамилия</p>
									<p className={style.Order__value}>{order.lastName}</p>
								</div>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Город/Населенный пункт</p>
									<p className={style.Order__value}>{order.city.name}</p>
								</div>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Почтовый индекс</p>
									<p className={style.Order__value}>{order.postIndex}</p>
								</div>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Адресс</p>
									<p className={style.Order__value}>{order.address}</p>
								</div>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Коммнетарий</p>
									<p className={style.Order__value}>{order.comment}</p>
								</div>
							</div>
							<div className={style.Order__label}>
								<span className={style.Order__title}>Доставка</span>
							</div>
							<div className={style.Order__list}>
								<div className={style.Order__list}>
									<div className={style.Order__delivery}>
										<p className={style.Order__note}>Способ доставки</p>
										<p className={style.Order__value}>{deliveryData[order.deliveryType]}</p>
									</div>
									<div className={style.Order__delivery}>
										<p className={style.Order__note}>Стоимость доставки</p>
									<p className={style.Order__value}>{order.deliveryPrice ? order.deliveryPrice : 'Бесплатно'}</p>
									</div>
								</div>
							</div>
						</div>
						<div className={style.Order__column}>
							<div className={style.OrderTable}>
							<OrderProducts products={order.colors} />
							</div>
							<div className={style.Order__list}>
								<div className={style.Order__delivery}>
									<p className={style.Order__note}>Способ оплаты</p>
									<p className={style.Order__value}>{payData[order.paymentType].name}</p>
								</div>
							</div>
							<div className={style.OrderSumm}>
								<p>Итого</p>
								<p>{order.sum} ₽</p>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default Order;

