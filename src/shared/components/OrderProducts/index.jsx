import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.styl';

class OrderProducts extends PureComponent {
	render() {
		const { products, price, sum } = this.props;
		console.log(this.props);
		
		return (
			<div className={styles.OrderProducts}>
				{products.map((color, id) => {
					const key = `item=${id}`;
					
					return (
						<div key={key} className={styles.OrderProducts__item}>
							<div className={styles.OrderProducts__item__id}>{id + 1}</div>
							<div className={styles.OrderProducts__item__img}><img src={color.product.img} alt="" /></div>
							<div className={styles.OrderProducts__item__size}>{color.size.name}</div>
							<div className={styles.OrderProducts__item__name}>{color.product.name}</div>
							<div className={styles.OrderProducts__item__price}>{color.price} ₽</div>
						</div>
					)
				}
				)}
				{sum &&
					<div key={key} className={styles.OrderProducts__item}>
					{price &&<span>Стоимость доставки: {price} ₽</span>}<span>Сумма заказа: {sum} ₽</span>
					</div>
				}
			</div>
		);
	}
}

export default OrderProducts;

