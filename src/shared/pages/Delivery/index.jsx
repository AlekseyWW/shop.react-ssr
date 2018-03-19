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
	componentDidMount() {
		const accessToken = localStorage.getItem("accessToken");
		const { profileIsLoaded, profileIsLoading, getProfile } = this.props
		if (!accessToken) {
			this.props.history.replace('/')
		} else {
			!profileIsLoaded && !profileIsLoading && getProfile();
		}
	}
	render() {
		const { products, addToCart, removeFromCart, profile, favorites } = this.props;
		console.log(profile.order);
		
		return (
			<div className="page__inner">
				<div className={styles.Delivery}>
					<div className={styles.Delivery__header}>
						<div className={styles.Delivery__user}>
							<AdressIcon />
							<span className={styles['Delivery__user-name']}>Адрес доставки</span>
						</div>
					</div>
					{profile && <DeliveryForm initialValues={profile.delivery} />}
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
	getProfile: (favorites) => dispatch(authActions.getProfile(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
