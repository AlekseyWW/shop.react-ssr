import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import OrderForm from 'components/OrderForm';
import * as cartAtions from 'actions/cart';
import * as orderAtions from '../../state/modules/order';
import style from './style.styl';


class OrderPage extends Component {
	render() {
		const { order } = this.props;
		return (
			<div className={style.Checkout}>
			
				<div className={style.Checkout__title}>
					<h1>Заказ {order.id} успешно оформлен</h1>
				</div>
				<ul className={style.Checkout__block}>
					<li className={style.Checkout__block__item}>
						<span>E-mail: {order.email}</span>
						<span>Телефон: {order.phone}</span>
					</li>
					<li className={style.Checkout__block__item}>
						<span>Имя: {order.firstName}</span>
						<span>Фамилия: {order.firstName}</span>
					</li>
					<li className={style.Checkout__block__item}>
						<span>Адрес: {order.country}, {order.region}, {order.city}, {order.address}, {order.aprtaments}, {order.postIndex}</span>
					</li>
					<li className={style.Checkout__block__item}>
						<span> Коментарий: {order.comment}</span>
					</li>
					<li className={style.Checkout__block__item}>
						<span>Сумма заказа: {order.sum} Р</span>
					</li>
				</ul>
			</div>
		);
	}
}

OrderPage.defaultProps = {
	order: {}
};

OrderPage.propTypes = {
	order: PropTypes.any
};

const mapStateToProps = (state) => {
	const { order } = state.order;
	return { order };
};


export default connect(mapStateToProps)(OrderPage);
