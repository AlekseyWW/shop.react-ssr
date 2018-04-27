import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import RecoveryForm from 'components/RecoveryForm';
import OrderProducts from 'components/OrderProducts';
import ProductCard from 'components/ProductCard';
import * as cartAtions from 'actions/cart';
import * as authActions from 'actions/user';
import { HeartSold, AdressIcon, CardIcon, KeyIcon, LockIcon, PresentIcon } from 'components/Icon'
import styles from './style.styl';

class UserPage extends Component {
	componentDidMount() {
		const accessToken = localStorage.getItem("accessToken");
		const { profileIsLoaded, profileIsLoading, ordersIsLoaded, ordersIsLoading, getProfile, getOrders } = this.props
		if (!accessToken) {
			this.props.history.replace('/')
		} else {
			!profileIsLoaded && !profileIsLoading && getProfile();
			!ordersIsLoaded && !ordersIsLoading && getOrders();
		}
	}
	render() {
		const { products, addToCart, removeFromCart, profile, favorites, orders } = this.props;
		
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
								<p>Оформление заказа круглосуточно</p>
								<p>Работа отдела продажс 9:00 до 18:00 вторник-воскресенье.</p>
								<p>Понедельник выходной</p>
							</div>
						</div>
					)}
					{profile && (
						<div className={styles.UserPage__container}>
							<div className={styles.UserPage__column}>
								{profile.promocodes && profile.promocodes[0] &&
									<div className={styles.UserPage__item}>
										<div className={styles.UserPage__item__title}>
											<AdressIcon />
											Промокод
										</div>
										<div className={styles.UserPage__item__text}>
											<div className={styles.UserPageList__list}>
												<div className={styles.UserPageList__delivery}>
													<p className={styles.UserPageList__note}>{profile.promocodes[0].code}</p>
													<p className={styles.UserPageList__value}>{profile.promocodes[0].amount} ₽ на покупку</p>
												</div>
											</div>
										</div>
									</div>
								}
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<AdressIcon />
										Основной адрес доставки
									</div>
									<div className={styles.UserPage__item__text}>
										{profile.address ? (
											<div className={styles.UserPageList__list}>
												<div className={styles.UserPageList__delivery}>
													<p className={styles.UserPageList__note}>Имя</p>
													<p className={styles.UserPageList__value}>{profile.firstName}</p>
												</div>
												<div className={styles.UserPageList__delivery}>
													<p className={styles.UserPageList__note}>Фамилия</p>
													<p className={styles.UserPageList__value}>{profile.lastName}</p>
												</div>
												<div className={styles.UserPageList__delivery}>
													<p className={styles.UserPageList__note}>Город/Населенный пункт</p>
													<p className={styles.UserPageList__value}>{profile.city.name}</p>
												</div>
												<div className={styles.UserPageList__delivery}>
													<p className={styles.UserPageList__note}>Почтовый индекс</p>
													<p className={styles.UserPageList__value}>{profile.postIndex}</p>
												</div>
												<div className={styles.UserPageList__delivery}>
													<p className={styles.UserPageList__note}>Адресс</p>
													<p className={styles.UserPageList__value}>{profile.address}</p>
												</div>
										</div>) : <p>Тут будет отображаться ваш основной адрес</p>}
										<Button to="/user/delivery">{profile.address ? 'Изменить' : 'Добавить'}</Button>
									</div>
								</div>
								<div className={styles.UserPage__item}>
									<div className={styles.UserPage__item__title}>
										<PresentIcon />
										Последний заказ
									</div>
									<div className={styles.UserPage__item__text}>
										{orders && orders[0] ? (
											<Link to={`order/${orders[0].id}`}>
												<OrderProducts products={orders[0].colors} price={orders[0].deliveryPrice} sum={orders[0].sum}/>
											</Link>
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
									<RecoveryForm onSubmit={this.props.changePassword}/>
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
	const { profile, accessToken, profileIsLoaded, profileIsLoading, orders, ordersIsLoaded, ordersIsLoading} = state.user;
	
	const products = added;
	return { isFetched, isFetching, products, profile, profileIsLoaded, profileIsLoading, accessToken, favorites, orders, ordersIsLoaded, ordersIsLoading };
};

const mapDispatchToProps = dispatch => ({
	// getCart: () => dispatch(cartAction.getCart()),
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product)),
	getProfile: (favorites) => dispatch(authActions.getProfile(favorites)),
	changePassword: (data) => dispatch(authActions.changePassword(data)),
	getOrders: (favorites) => dispatch(authActions.getOrders(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
