import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartIcon } from 'components/Icon';
import icon from './cart.svg';
import style from './styles.styl';

const getCartSumm = added => (added.length ? (added.reduce((summ, item) => (summ + item.count), 0)) : '');

const Cart = ({ added }) => (
	<div className={style.Cart} >
		<Link to="/cart">
			<CartIcon className={style.Cart__icon} width={30} height={39} />
			<span className={style.Cart__count}>{ getCartSumm(added) }</span>
		</Link>
	</div>
);

Cart.propTypes = {
	added: PropTypes.array.isRequired
};

export default Cart;
