import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { BasketIcon } from 'components/Icon';
import { Link } from 'react-router-dom';
import omit from 'lodash/omit';

const CartItem = ({ product, add, remove, styles }) => (
	<tr className={styles.CartTable__row}>
		<td
			className={cx([styles.CartTable__cell, styles.CartTable__cell_img])}
		>
			<img src={product.image} />
		</td>
		<td
			className={cx([
				styles.CartTable__cell,
				styles.CartTable__cell_name,
			])}
		>
			<Link to={`/products/${product.slug}?color=${product.color}`}>
				{product.name}
			</Link>
			<p>{product.color}</p>
			<span>{product.size.name}</span>
			<span>Колличество: {product.count}</span>
			<span>Цена: {product.price} ₽</span>
		</td>
		<td
			className={cx([
				styles.CartTable__cell,
				styles.CartTable__cell_size,
			])}
		>
			{product.size.name} - {product.size.sex.name}
		</td>
		<td
			className={cx([
				styles.CartTable__cell,
				styles.CartTable__cell_count,
			])}
		>
			<button onClick={() => add(omit(product, ['count']))}>+</button>
			{product.count}
			<button onClick={() => add(omit(product, ['count']), true)}>
				-
			</button>
		</td>
		<td
			className={cx([
				styles.CartTable__cell,
				styles.CartTable__cell_price,
			])}
		>
			{product.price} ₽
		</td>
		<td
			className={cx([styles.CartTable__cell, styles.CartTable__cell_del])}
		>
			<button>
				<BasketIcon onClick={() => remove(omit(product, ['count']))} />
			</button>
		</td>
	</tr>
);

CartItem.propTypes = {
	product: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
};

export default CartItem;
