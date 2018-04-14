import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import OrderForm from 'components/OrderForm';
import Order from 'components/Order';
import ModalExample from '../../components/ModalExample';
import * as cartAtions from 'actions/cart';
import * as orderAtions from '../../state/modules/order';
import { actions } from '../../state/modules/modal.js';
import { clearCart } from '../../state/actions/cart';
import style from './style.styl';
const deliveryData = {
	post: "Доставка Почтой России",
	sdek: "Служба доставки СДЭК",
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

class OrderPage extends Component {
	componentDidMount() {
		
		if(!this.props.order) {
			const order = localStorage.getItem("order");
	
			if (order) {
				this.props.requestOrderDone(JSON.parse(order), false);
			}
		}
	}
	succseOrder() {
		const url = `http://test-api-shop.abo-soft.com/orders/${this.props.order.id}/accept`
		axios({
			method: 'post',
			url,
		})
		.then(res => {
		})
		.catch(err => {
			console.log(err.message);
		});
	}
	onClick = () => {
		const { order } = this.props;
		const url = `http://test-api-shop.abo-soft.com/payment-url/order/${order.id}`
		axios({
			method: 'get',
			url,
		})
			.then(res => {
				const { data } = res;
				if (data === 'ok') {
					this.succseOrder();
					this.props.openModal({
						modalType: ModalExample,
						onClose: () => {
							this.props.history.push('/')
							this.props.clearCart();
							localStorage.setItem("order", "");
						},
						modalProps: {
							title: `Ваш заказ успешно оформлен`,
							status: 'order',
							text: (
								<p>
									Спасибо!!!
								</p>
							),
							subTitle: '',
							hasClose: true,
							// confirm: true,
						}
					});
				} else {
					this.props.clearCart()
					localStorage.setItem("order", "");
					window.location = data
				}
			})
			.catch(err => {
				console.log(err.message);
			});
	}
	getCartSumm = () => (this.props.products.length ? (this.props.products.reduce((summ, item) => (summ + item.count * item.price), 0)) : '');
	
	render() {
		const { order, products } = this.props;
		console.log({ order});
		
		const text = order && order.paymentType === 'electronic_payment' ? 'Оплатить' : 'Подтвердить заказ'
		return (
			<div className={style.Checkout}>
			
				<div className={style.Checkout__title}>
					<h1>Подтверждение заказа</h1>
				</div>
				{order && order.paymentType &&
					<Order order={order} withoutPrice />
				}
				<Button onClick={this.onClick}>{text}</Button>
			</div>
		);
	}
}

OrderPage.defaultProps = {
	order: undefined
};

OrderPage.propTypes = {
	order: PropTypes.any
};

const mapStateToProps = (state) => {
	const { isFetched, isFetching, added } = state.cart;
	const products = added;
	const { order } = state.order;
	return { isFetched, isFetching, products, order };
};

const mapDispatchToProps = dispatch => {
	return {
		openModal: modalParams => dispatch(actions.openModal(modalParams)),
		requestOrderDone: (data, redirect) => dispatch(orderAtions.requestOrderDone(data, redirect)),
		closeModal: () => dispatch(actions.closeModal()),
		clearCart: () => dispatch(clearCart()),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
