import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartIcon } from 'components/Icon';
import { BasketIcon } from 'components/Icon';
import { omit } from 'lodash';
import icon from './cart.svg';
import style from './styles.styl';

const getCartSumm = added => (added.length ? (added.reduce((summ, item) => (summ + item.count), 0)) : '');
const getCartSummM = added => (added.length ? (added.reduce((summ, item) => (summ + item.count * item.price), 0)) : '');

const Cart = ({ added, addToCart, removeFromCart }) => (
	<div className={style.Cart} >
		<Link to="/cart">
			<CartIcon className={style.Cart__icon} width={30} height={39} />
			<span className={style.Cart__count}>{ getCartSumm(added) }</span>
		</Link>
		{added.length > 0 &&
			<div className={style.Cart__container} >
				<table className={style.Cart__table} >
					<tbody>
						<tr className={style.Cart__table__row} >
							<td className={style.Cart__table__cell}></td>
							<td className = {`${style.Cart__table__cell} ${style.Cart__table__cell_name}`}>Модель</td>
							<td className={style.Cart__table__cell}>Размер</td>
							<td className={style.Cart__table__cell}>Цена</td>
							<td className={style.Cart__table__cell}>Колл-во</td>
						</tr>
						{added.map(item => (
							<tr key={`${item.id}${item.size.id}`} className={style.Cart__table__row}>
								<td className={style.Cart__table__cell}>
									<img src={item.image} />
								</td>
								<td className={`${style.Cart__table__cell} ${style.Cart__table__cell_name}`}>
									<span>
										{item.name}
									</span>
									<span>
										{item.color}
									</span>
								</td>
								<td className={style.Cart__table__cell}>{item.size.name}</td>
								<td className={style.Cart__table__cell}>{item.price} ₽</td>
								<td className={style.Cart__table__cell}>
									<div className={style.Cart__table__cell__count}>
										<button onClick={() => addToCart(omit(item, ['count']), true)}>-</button>
										{item.count}
										<button onClick={() => addToCart(omit(item, ['count']))}>+</button>
									</div>
								</td>
								<td className={`${style.Cart__table__cell} ${style.Cart__table__cell_del}`}>
									<button>
										<BasketIcon onClick={() => removeFromCart(omit(item, ['count']))} />
									</button>
								</td>
							</tr>
						))}
						<tr className={style.Cart__table__row}>
							<td className={style.Cart__table__cell} colSpan="2">
								<Link to="/cart">
									Перейти в&nbsp;корзину
								</Link>
							</td>
							<td className={style.Cart__table__cell}></td>
							<td className={style.Cart__table__cell} colSpan="2">Сумма: {getCartSummM(added)} ₽</td>
						</tr>
					</tbody>
				</table>
			</div>
		}
	</div>
);

Cart.propTypes = {
	added: PropTypes.array.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
