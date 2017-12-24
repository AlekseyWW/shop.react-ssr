import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductView from 'components/ProductView/';
import ProductForm from 'components/ProductForm/';
import { Link } from 'react-router-dom';
import style from './styles.styl';

class Product extends Component {
	state = {
		activeSlider: null
	}
	setSlider = (id) => {
		this.setState({
			activeSlider: id
		})
	}
	render() {
		const { product, addToCart, color } = this.props;
		return (
			<div className={style.Product}>
				<div className={style.Product__content}>
					<Link to="/catalog" className={style.Product__back}>
						В каталог
					</Link>
					<ProductView product={product} activeSlider={this.state.activeSlider} color={color}/>
					<ProductForm addToCart={addToCart} product={product} setSlider={id => this.setSlider(id)} color={color}/>
				</div>
			</div>
		);
	}
}

Product.propTypes = {
	product: PropTypes.object.isRequired,
	color: PropTypes.string.isRequired,
	addToCart: PropTypes.func.isRequired
};

export default Product;
