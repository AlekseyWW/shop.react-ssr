import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as productsAction from 'actions/products';
import * as categoryAction from 'actions/category';
import * as favoritesAction from 'actions/favorites/';
import { HeartSold } from 'components/Icon';
import MainBlock from 'containers/MainBlock/';
import ProductCard from 'components/ProductCard/';
import style from './styles.styl'

class FavoritesPage extends Component {
	render() {
		const {
			products
		} = this.props;
		return (
			<div className={style.Page}>
				<div className={style.Page__header}>
					<h1><HeartSold />Избранное</h1>
				</div>
				<div className={style.Page__container}>
					{products.map(product => <ProductCard key={product.id} {...product} toogleFavotite={() => this.props.removeFromFavorites(product.id)} actionText="убрать из избранного" sm />)}
				</div>
			</div>
		);
	}
}

FavoritesPage.defaultProps = {
	products: [],
};

FavoritesPage.propTypes = {
	products: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
	const { added: products } = state.favorites;
	return {
		products
	};
};
const mapDispatchToProps = dispatch => ({
	removeFromFavorites: (productId) => dispatch(favoritesAction.removeFromFavorites(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
