import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductView from 'components/ProductView/';
import ProductForm from 'components/ProductForm/';

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
		const { product, addToCart } = this.props;
		return (
			<div className={style.Product}>
				<div className={style.Product__content}>
					<ProductView product={product} activeSlider={this.state.activeSlider}/>
					<ProductForm addToCart={addToCart} product={product} setSlider={id => this.setSlider(id)}/>
				</div>
			</div>
		);
	}
}

Product.propTypes = {
	product: PropTypes.object.isRequired,
	addToCart: PropTypes.func.isRequired
};

export default Product;
