import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import RecoveryForm from 'components/RecoveryForm';
import ProductCard from 'components/ProductCard';
import * as cartAtions from 'actions/cart';
import * as authActions from 'actions/user';
import { HeartSold, AdressIcon, CardIcon, KeyIcon, LockIcon, PresentIcon } from 'components/Icon'
import styles from './style.styl';

class UserPage extends Component {
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
				<div className={styles.UserPage}>
					{profile && profile.email && (
						<div className={styles.UserPage__header}>
							<div className={styles.UserPage__user}>
								<span className={styles['UserPage__user-name']}>{profile.firstName}{' '}{profile.lastName}</span>
								<div className={styles['UserPage__user-info']}>
									<span>{profile.email}</span>
									<span>{profile.phone}</span>
								</div>
							</div>
							<div className={styles.UserPage__contacts}>
								<p>ЕСТЬ ВОПРОСЫ? ЗВОНИТЕ ПО&nbsp;ТЕЛ.: <nobr class="phone">+7 (928) 620-64-04</nobr></p>
								<p>МЫ&nbsp;РАБОТАЕМ ЕЖЕДНЕВНО С&nbsp;10.30&nbsp;ДО 20.00</p>
							</div>
						</div>
					)}
					{profile && profile.delivery && (
						<div className={styles.UserPage__container}>
							<div className={styles.UserPage__column}>
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<AdressIcon />
										Основной адрес доставки
									</div>
									<div className={styles.UserPage__item__text}>
										{profile.delivery.address ? `${profile.delivery.country} ${profile.delivery.address}` : 'Тут будет отображаться ваш основной адрес'}
									</div>
								</div>
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<PresentIcon />
										Последний заказ
									</div>
									<div className={styles.UserPage__item__text}>
										{profile.order ? (
											<p>{profile.order[0].id}</p>
										) : 'Тут будет отображен статус вашего последнего заказа'}
									</div>
								</div>
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<CardIcon />
										Дисконтная карта
									</div>
									<div className={styles.UserPage__item__text}>
										При совершении покупок в&nbsp;интернет-магазине необходимости в&nbsp;оформлении карты нет&nbsp;&mdash; сумма  покупок сохраняется на&nbsp;вашем аккаунте (эл. почта). Достаточно совершать покупку с&nbsp;одного Логина/эл.  почты. Подробнее о&nbsp;картах читайте в&nbsp;разделе
									</div>
								</div>
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<HeartSold />
										Избранное
									</div>
									<div className={styles.UserPage__item__text}>
										Добавляйте понравившиеся вещи в&nbsp;избранное, так они не&nbsp;потеряются и&nbsp;вы&nbsp;сможете приобрести их&nbsp;позже. Чтобы добавить вещь в&nbsp;избранное наведите на&nbsp;фото товара в&nbsp;каталоге и&nbsp;нажмите на&nbsp;символ сердца
									</div>
								</div>
							</div>
							<div className={styles.UserPage__column}>
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<KeyIcon />
										Смена пароля
									</div>
									<div className={styles.UserPage__item__text}>Если вы&nbsp;хотите сменить свой пароль, то&nbsp;укажите старый пароль и&nbsp;желаемый новый. После этого нажмите кнопку &laquo;Сохранить&raquo;</div>
								</div>
								<div className={styles.UserPage__item}>
									<RecoveryForm />
								</div>
							</div>
						</div>
					)}
					{favorites && favorites.added && (
						<div className={styles.Page__container}>
							{favorites.added.map(product => <ProductCard key={product.id} {...product} toogleFavotite={() => this.props.removeFromFavorites(product.id)} actionText="убрать из избранного" sm />)}
						</div>
					)}
				</div>
			</div>
		);
	}
}


UserPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
