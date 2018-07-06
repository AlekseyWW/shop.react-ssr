import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import * as cartAtions from 'actions/cart';
import * as productsAction from 'actions/products/';

import styles from './style.styl';

class CartPage extends Component {
	getCartSumm = () =>
		this.props.products.length
			? this.props.products.reduce(
					(summ, item) => summ + item.count * item.price,
					0
			  )
			: '';

	componentDidUpdate() {
		if (
			this.props.product &&
			this.props.product.category &&
			this.props.product.category.name
		) {
			this.props.getForProducts(`for${this.props.product.category.name}`);
		}
	}
	render() {
		const {
			products,
			addToCart,
			removeFromCart,
			isForLoaded,
			isForLoading,
			forProducts,
		} = this.props;
		return (
			<div className="page__inner">
				<div className={styles.CartContainer}>
					<table className={styles.CartTable}>
						<tbody>
							<tr className={styles.CartTable__row}>
								<td
									className={`${styles.CartTable__cell} ${
										styles.CartTable__cell_img
									}`}
									colSpan="2"
								>
									Товар
								</td>
								<td
									className={`${styles.CartTable__cell} ${
										styles.CartTable__cell_size
									}`}
								>
									Размер
								</td>
								<td
									className={`${styles.CartTable__cell} ${
										styles.CartTable__cell_count
									}`}
								>
									Кол&#8209;во
								</td>
								<td
									className={`${styles.CartTable__cell} ${
										styles.CartTable__cell_price
									}`}
								>
									Цена
								</td>
								<td className={styles.CartTable__cell} />
							</tr>
							{products.length ? (
								products.map((product, id) => (
									<CartItem
										key={`key-${id}`}
										product={product}
										add={addToCart}
										remove={removeFromCart}
										styles={styles}
									/>
								))
							) : (
								<tr>
									<td colSpan="4">корзина пуста</td>
								</tr>
							)}
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
				{isForLoaded &&
					!isForLoading && (
						<NewPropducts
							products={forProducts}
							title="С этим также покупают"
							mod="for"
						/>
					)}
			</div>
		);
	}
}

CartPage.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
	const { isFetched, isFetching, added } = state.cart;
	const products = added;
	return { isFetched, isFetching, products };
};

const mapDispatchToProps = dispatch => ({
	getForProducts: slug => dispatch(productsAction.getForProducts(slug)),
	addToCart: (product, remove) =>
		dispatch(cartAtions.addToCart(product, remove, false, true)),
	removeFromCart: product =>
		dispatch(cartAtions.addToCart(product, true, true)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartPage);
