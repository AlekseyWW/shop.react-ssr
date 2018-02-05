import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CartIcon } from 'components/Icon';
import { BasketIcon } from 'components/Icon';
import { omit } from 'lodash';
import icon from './cart.svg';
import Instafeed from 'react-instafeed';
import style from './styles.styl';


class Cart extends Component {

	render() {
		return (
			<div className={style.InstagrammBlock} >
				<Instafeed
					limit='5'
					ref='instafeed'
					resolution='standard_resolution'
					sortBy='most-recent'
					target={instafeedTarget}
					template=''
					userId='476484858'
					clientId='4aa25efb013c4e539667e0fa3021081d'
					accessToken='accessTokenInstagramApiString'
				/>
			</div>
		);
	}
}

export default Cart;
