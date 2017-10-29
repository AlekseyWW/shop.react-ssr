import React from 'react';
import PropTypes from 'prop-types';
import './styles.styl';

const ProductForm = ({ addToCart }) => (
	<div className="ProductForm">
		<div className="ProductForm__container">
			<p className="ProductForm__title">РУБАШКА M SLIM BLACK</p>
			<div className="ProductForm__select">
				<p className="ProductForm__select__name">Размер</p>
			</div>
			<div className="ProductForm__select">
				<p className="ProductForm__select__name">Цвет</p>
			</div>
			<div className="ProductForm__price">
				<p className="ProductForm__select__name">3390</p>
			</div>
			<button className="ProductForm__button" onClick={addToCart}>
				Добавить в корзину
			</button>
			<div className="ProductForm__dropdown">
				<p>Доставка и возврат</p>
			</div>
			<div className="ProductForm__note">
				Наличие уточняйте по телефону
			</div>
		</div>
	</div>
);

ProductForm.propTypes = {
	addToCart: PropTypes.func.isRequired
};

export default ProductForm;
