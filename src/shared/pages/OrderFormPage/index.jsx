import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import { formValueSelector, change } from 'redux-form';
import axios from 'axios';
import find from 'lodash/find';
import {
	loadCities,
	getDeliveryCoast,
	clearDeliveryCoast,
} from '../../state/modules/sdek';
import Preloader from 'components/Preloader';
import OrderForm from 'components/OrderForm';
import * as cartAtions from 'actions/cart';
import * as orderAtions from '../../state/modules/order';
import styles from './style.styl';

class OrderFormPage extends Component {
	state = {
		promocode: 0,
		cartSumm: 0,
	};
	componentWillMount() {
		if (this.props.deliveryCity && this.props.deliveryCity.id) {
			const productsForDelivery = this.props.products.map(product => ({
				id: product.id,
				quantity: product.count,
				size: {
					id: product.sizeId,
				},
			}));
			if (this.props.deliveryCity.id) {
				this.props.getDeliveryCoast(
					this.props.deliveryCity.id,
					productsForDelivery
				);
			}
		}
		if (this.props.products.length > 0) {
			this.getCartSumm();
		}
		if (!this.props.deliveryCity) {
			this.props.clearDeliveryCoast();
		}
	}
	getCartSumm = () => {
		const summ = this.props.products.reduce(
			(summ, item) => summ + item.count * item.price,
			0
		);

		this.setState({
			cartSumm: summ,
		});
	};
	componentDidUpdate(prevProps) {
		if (prevProps.products !== this.props.products) {
			this.getCartSumm();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.deliveryCity &&
			(nextProps.products !== this.props.products ||
				nextProps.deliveryCity !== this.props.deliveryCity)
		) {
			const productsForDelivery = nextProps.products.map(product => ({
				id: product.id,
				quantity: product.count,
				size: {
					id: product.sizeId,
				},
			}));
			if (nextProps.deliveryCity.id && !nextProps.isDeliveryLoading) {
				nextProps.getDeliveryCoast(
					nextProps.deliveryCity.id,
					productsForDelivery
				);
				nextProps.deliveryTypeChange('deliveryType', null);
			}
		}
	}
	handleSubmit(data) {
		if (data.city) {
			data.city = {
				id: data.city.value || data.city.id,
			};
		}
		this.props.fetchOrder(omit(data, ['promocodes']));
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
					options: data.map(option => ({
						label: option.name,
						value: option.id,
					})),
				});
			})
			.catch(err => {
				console.log(err.message);
			});
	}

	render() {
		const {
			orderState,
			products,
			deliveryTypes,
			isDeliveryLoaded,
			delivery,
			paymentTypes,
			isDeliveryLoading,
			initialValues,
		} = this.props;
		const { cartSumm } = this.state;
		const deliveryCost =
			deliveryTypes && delivery && deliveryTypes.length > 0
				? find(
						deliveryTypes,
						b =>
							b.delivery === 'electronic_payment' &&
							b.code === delivery
				  ).priceWithDiscount
				: 0;

		const productsForDelivery = products.map(product => ({
			id: product.id,
			quantity: product.count,
			size: {
				id: product.sizeId,
			},
		}));

		return (
			<div className={styles.CartContainer}>
				{products && products.length > 0 && !orderState.isFetching ? (
					<OrderForm
						onSubmit={data => this.handleSubmit(data)}
						getOptions={this.getOptions}
						productsForDelivery={productsForDelivery}
						getCartSummM={this.getCartSummM}
						deliveryCost={deliveryCost}
						cartSumm={cartSumm}
						deliveryTypes={deliveryTypes}
						paymentTypes={paymentTypes}
						products={products}
						isDeliveryLoaded={isDeliveryLoaded}
						orderSumm={cartSumm + deliveryCost}
						initialValues={initialValues}
						productsForDelivery={productsForDelivery}
						isDeliveryLoading={isDeliveryLoading}
						getDeliveryCoast={this.props.getDeliveryCoast}
					/>
				) : (
					<h2>Сначала добавьте товары в корзину</h2>
				)}
				{orderState.isFetching && <Preloader />}
			</div>
		);
	}
}

OrderFormPage.defaultProps = {
	profile: undefined,
	product: undefined,
	delivery: '',
	deliveryTypes: undefined,
	paymentTypes: undefined,
	initialValues: undefined,
};

OrderFormPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	profileIsLoading: PropTypes.bool.isRequired,
	profileIsLoaded: PropTypes.bool.isRequired,
	isDeliveryLoading: PropTypes.bool.isRequired,
	isDeliveryLoading: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array,
	profile: PropTypes.object,
	delivery: PropTypes.string,
	deliveryTypes: PropTypes.array,
	paymentTypes: PropTypes.array,
	initialValues: PropTypes.object.isRequired,
};

const selector = formValueSelector('order');

const mapStateToProps = state => {
	const { isFetched, isFetching, added: products } = state.cart;
	const orderState = state.order;
	const {
		price,
		isDeliveryLoading,
		isDeliveryLoaded,
		paymentTypes,
		deliveryTypes,
	} = state.sdek;
	const {
		accessToken,
		profile,
		profileIsLoaded,
		profileIsLoading,
	} = state.user;
	const { order } = state.form;

	const val = order ? order.values : {};
	const initialValues =
		accessToken && profileIsLoaded && profile && profile.id
			? {
					...profile,
					city: profile.city
						? { id: profile.city.id, label: profile.city.name }
						: null,
					colors: products.map(product => ({
						id: product.id,
						quantity: product.count,
						size: { id: product.sizeId },
					})),
			  }
			: {
					...val,
					colors: products.map(product => ({
						id: product.id,
						quantity: product.count,
						size: { id: product.sizeId },
					})),
			  };

	const delivery = selector(state, 'deliveryType');
	const deliveryCity = selector(state, 'city');
	const paymentType = selector(state, 'paymentType');
	const promocode = selector(state, 'promocode');

	return {
		isFetched,
		isFetching,
		products,
		profile,
		profileIsLoading,
		profileIsLoaded,
		delivery,
		isDeliveryLoading,
		initialValues,
		paymentTypes,
		deliveryTypes,
		orderState,
		paymentType,
		price,
		profile,
		deliveryCity,
		promocode,
		deliveryTypes,
		isDeliveryLoading,
		isDeliveryLoaded,
	};
};

const mapDispatchToProps = dispatch => ({
	deliveryTypeChange: value =>
		dispatch(change('form', 'deliveryType', value)),
	fetchOrder: data => dispatch(orderAtions.fetchOrder(data)),
	addToCart: product => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product)),
	getCities: name => dispatch(loadCities(name)),
	getDeliveryCoast: (id, data) => dispatch(getDeliveryCoast(id, data)),
	clearDeliveryCoast: () => dispatch(clearDeliveryCoast()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderFormPage);
