import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import htmlParser from 'react-html-parser';
import Button from 'components/Button';
import style from './styles.styl';
import deliveryText from './delivery.json';

const ProductForm = ({ addToCart, product }) => {
	return (
		<div className={style.ProductForm}>
			<div className={style.ProductForm__container}>
				<div className={style.ProductForm__head}>
					<p className={style.ProductForm__title}>{product.title}</p>
					<p className={style.ProductForm__subline}>{product.name}</p>
				</div>
				<div className={style.ProductForm__price}>
					<p className={style.ProductForm__price__value}>{product.price}</p>
					{product.oldPrice && <p className={style.ProductForm__price__old}>{product.oldPrice}</p>}
				</div>
				<div className={style.ProductForm__action}>
					{product.colors.length > 1 &&
					<div className={style.ProductForm__colors}>
						{product.colors.map(color => (
							<div key={color.name} className={style.ProductForm__color}>
								<img src={color.thumb} />
							</div>
						))}
					</div>
					}
					<div className={style.ProductForm__buttons}>
						<div className={style.ProductForm__selectSize}>
							<Button className={style.ProductForm__select} text="Выберите размер" disabled />
							<Button text="Подобрать размер" small disabled/>
						</div>
						<Button className={style.ProductForm__button} onClick={addToCart} text="Добавить в корзину" />
					</div>
				</div>
				<div className={style.ProductForm__callback}>
					<div className={style.ProductForm__callback__title}>Свяжитесь с нами:</div>
					<div className={style.ProductForm__callback__inner}>
						<span className={style.ProductForm__callback__text}>Оформить заказ по телфону и уточнить наличие товара</span>
						<span className={style.ProductForm__callback__phone}>+ 7 (928) 620-64-04</span>
						<span className={style.ProductForm__callback__note}>Информация о наличии товаров обновляется каждые 30 минут. Ассортимент товара их их цена в магазине могут отличаться от информации на сайте.</span>
					</div>
				</div>
				<div className={style.ProductForm__info}>
					<div className={style.ProductForm__info__block}>
						<p className={style.ProductForm__info__title}>Описание</p>
						<p className={style.ProductForm__info__text}>{product.description}</p>
					</div>
					{product.characteristics && (
						<div className={style.ProductForm__info__block}>
							<p className={style.ProductForm__info__title}>{product.characteristics.title ? product.characteristics.title : 'Характеристики'}</p>

						</div>
					)}
					<div className={style.ProductForm__info__block}>
						<p className={style.ProductForm__info__title}>{product.brand.name}</p>
						<p className={style.ProductForm__info__text}>{product.brand.description}</p>
					</div>
					<div className={style.ProductForm__info__block}>
						<p className={style.ProductForm__info__title}>Доставка и возврат</p>
						<p className={style.ProductForm__info__text}>{htmlParser(deliveryText.text)}</p>
					</div>
				</div>
			</div>
		</div>
	)
};

ProductForm.propTypes = {
	addToCart: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired
};

export default ProductForm;
