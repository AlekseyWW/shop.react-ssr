import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import * as cartAtions from 'actions/cart';
import styles from './style.styl';

const CartItem = ({ product, add, remove }) => {
	return (
		<tr className={styles.CartTable__row}>
			<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_img}`}>
				<img src={product.image} />
			</td>
			<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_name}`}>
				<Link to={`/products/${product.slug}`}>{product.name}</Link>
				<span>{product.size.name}</span>
				<span>Колличество: {product.count}</span>
				<span>Цена: {product.price} ₽</span>
			</td>
			<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_size}`}>
				{product.size.name} - {product.size.sex}
			</td>
			<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_count}`}>
				<button onClick={() => add(omit(product, ['count']))}>
					+
				</button>
				{product.count}
				<button onClick={() => add(omit(product, ['count']), true)}>
					-
				</button>
			</td>
			<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_price}`}>{product.price} ₽</td>
			<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_del}`}>
				<button>
					<BasketIcon onClick={() => remove(omit(product, ['count']))} />
				</button>
			</td>
		</tr>
	)
};

class CartPage extends Component {
	getCartSumm = () => (this.props.products.length ? (this.props.products.reduce((summ, item) => (summ + item.count * item.price), 0)) : '');

	render() {
		const { products, addToCart, removeFromCart } = this.props;
		return (
			<div className="page__inner">
				<div className={styles.CartContainer}>
					<table className={styles.CartTable}>
						<tbody>
							<tr className={styles.CartTable__row}>
								<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_img}`} colSpan="2">Товар</td>
								<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_size}`}>Размер</td>
								<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_count}`}>Кол&#8209;во</td>
								<td className={`${styles.CartTable__cell} ${styles.CartTable__cell_price}`}>Цена</td>
								<td className={styles.CartTable__cell}></td>
							</tr>
							{products.length ? products.map(product => <CartItem key={`${product.id}-${product.size.id}`} product={product} add={addToCart} remove={removeFromCart} />) : <tr><td colSpan="4">корзина пуста</td></tr>}
						</tbody>
					</table>
					<div className={styles.CartResult}>
						<span>Общая цена:</span>
						<span>{this.getCartSumm()} ₽</span>
					</div>
					<div className={styles.CartButton}>
						<Button text="Оформить заказ" to="/order" />
					</div>
				</div>
			</div>
		);
	}
}

CartItem.propTypes = {
	product: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

CartPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	const { isFetched, isFetching, added } = state.cart;
	const products = added;
	return { isFetched, isFetching, products };
};

const mapDispatchToProps = dispatch => ({
	// getCart: () => dispatch(cartAction.getCart()),
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
