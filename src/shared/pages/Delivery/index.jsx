import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import DeliveryForm from 'components/DeliveryForm';
import ProductCard from 'components/ProductCard';
import * as cartAtions from 'actions/cart';
import * as authActions from 'actions/user';
import { HeartSold, AdressIcon, CardIcon, KeyIcon, LockIcon, PresentIcon } from 'components/Icon'
import styles from './style.styl';

class Delivery extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		const accessToken = localStorage.getItem("accessToken");
		const { profileIsLoaded, profileIsLoading, getProfile } = this.props
		if (!accessToken) {
			this.props.history.replace('/')
		} else {
			!profileIsLoaded && !profileIsLoading && getProfile(accessToken);
		}
	}
	handleChange = (data) => {
		
		if (data.city) {
			data.city = {
				id: data.city.value || data.city.id
			}
		}
		this.props.setProfile(data, this.props.accessToken)
	}
	render() {
		const { products, addToCart, removeFromCart, profile, favorites } = this.props;
		const initialValues = profile ? {
			firstName: profile.firstName,
			lastName: profile.lastName,
			phone: profile.phone,
			city: profile.city ? {
				id: profile.city.id,
				label: profile.city.name,
			} : null,
			address: profile.address,
			postIndex: profile.postIndex,
		} : null;
		
		return (
			<div className="page__inner">
				<div className={styles.Delivery}>
					<div className={styles.Delivery__header}>
						<div className={styles.Delivery__user}>
							<AdressIcon />
							<span className={styles['Delivery__user-name']}>Адрес доставки</span>
						</div>
					</div>
					{profile && <DeliveryForm initialValues={initialValues} onSubmit={this.handleChange}/>}
				</div>
			</div>
		);
	}
}


Delivery.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	const { isFetched, isFetching, added } = state.cart;
	const favorites = state.favorites;
	const { profile, accessToken, profileIsLoaded, profileIsLoading} = state.user;
	
	const products = added;
	return { isFetched, isFetching, products, profile, profileIsLoaded, profileIsLoading, accessToken, favorites };
};

const mapDispatchToProps = dispatch => ({
	// getCart: () => dispatch(cartAction.getCart()),
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product)),
	getProfile: (favorites) => dispatch(authActions.getProfile(favorites)),
	setProfile: (data, accessToken) => dispatch(authActions.setProfile(data, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
