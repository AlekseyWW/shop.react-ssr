import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import Button from 'components/Button';
import { required, email } from 'utils/validation';
import style from './styles.styl';

const getCartSummM = added => (added.length ? (added.reduce((summ, item) => (summ + item.count * item.price), 0)) : '');

const deliveryData = {
	ems: {
		id: "ems",
		name: "EMS поста россии",
		price: 500
	},
	courier: {
		id: "courier",
		name: "Курьер по&nbsp;Ростову-на-Дону",
		price: 300
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
	}
}

let OrderForm = (props) => {
	const { handleSubmit, products, deliveryCost } = props;
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
							name="name"
							component={Input}
							type="text"
							className={style.OrderForm__input}
							label="Имя*"
							validate={[required]}
						/>
						<Field
							name="lastname"
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
							component={Input}
							type="text"
							className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
							label="Город, населенный пункт*"
							validate={[required]}
						/>
						<Field
							name="region"
							component={Input}
							type="text"
							className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
							label="Область, край, республика*"
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
							name="appartaments"
							component={Input}
							type="text"
							className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
							label="Квартира, корпус, строение ит.д.*"
							validate={[required]}
						/>
					</div>
					<div className={style.OrderForm__group}>
						<Field
							name="index"
							component={Input}
							type="text"
							className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
							label="Почтовый индекс*"
							validate={[required]}
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
							name="email"
							component={Input}
							type="text"
							className={`${style.OrderForm__input} ${style.OrderForm__input_wide}`}
							label="E-mail"
							validate={[required, email]}
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
						<div key={`${product.name}-${product.size}`} className={style.OrderTable__row}>
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
						<div className={style.OrderDeliver__item}>
							<Field
								name="delivery"
								component={CheckBox}
								item={deliveryData.ems}
								index={0}
								type="option"
								className={style.OrderDeliver__option}
							/>
						</div>
						<div className={style.OrderDeliver__item}>
							<Field
								name="delivery"
								component={CheckBox}
								item={deliveryData.courier}
								index={1}
								type="option"
								className={style.OrderDeliver__option}
							/>
						</div>
						<div className={style.OrderDeliver__item}>
							<Field
								name="delivery"
								component={CheckBox}
								item={deliveryData.self}
								index={2}
								type="option"
								className={style.OrderDeliver__option}
							/>
						</div>
						
					</div>
				</div>
				<div className={style.OrderSumm}>
					<p>Итого</p>
					<p>{getCartSummM(products) + deliveryCost} ₽</p>
				</div>
				<div className={style.OrderPay}>
					<Field
						name="pay"
						component={CheckBox}
						item={payData.cash}
						index={0}
						type="option"
						className={style.OrderPay__option}
					/>
					<Field
						name="pay"
						component={CheckBox}
						item={payData.card}
						index={0}
						type="option"
						className={style.OrderPay__option}
					/>
					<Field
						name="term"
						component={CheckBox}
						item="Я&nbsp;прочитал и&nbsp;принимаю условия соглашения"
						index={0}
						type="checkbox"
						single={true}
						className={style.OrderPay__option}
						validate={[required]}
					/>
				</div>
				<Button text="Оформить заказ" className={style.OrderPay__button} type="submit" />
			</div>
		</form>
	);
};
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
	destroyOnUnmount: false
})(OrderForm);
const selector = formValueSelector('order')

const mapStateToProps = state => {
	const products = state.cart.added;
	const delivery = selector(state, 'delivery');
	const deliveryCost = deliveryData[delivery] && deliveryData[delivery].price ? deliveryData[delivery].price : 0
	return { products, deliveryCost };
}

export default connect(mapStateToProps)(OrderForm);

