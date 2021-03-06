import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from 'components/ProductCard/';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import * as favoritesAction from 'actions/favorites/';
import * as productsAction from 'actions/products';
import * as paginationAction from '../../state/modules/pagination';
import Filter from 'components/Filter/';
import Preloader from 'components/Preloader/';
import qs from 'query-string';

import style from './styles.styl';

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(data) {
		const slug = this.props.subCategoryId
			? `${this.props.categoryId}/${this.props.subCategoryId}`
			: `${this.props.categoryId}`;
		let pathname = '';
		if (slug) {
			if (this.props.stockId) {
				pathname = `/${this.props.stockId}/catalog/${slug}`;
			} else {
				`/catalog/${slug}`;
			}
		} else {
			if (this.props.stockId) {
				pathname = `/${this.props.stockId}/catalog`;
			} else {
				`/catalog`;
			}
		}
		const queryData = this.props.query
			? { ...this.props.query, ...data }
			: data;
		const requestData = this.props.stockId
			? { ...queryData, 'custom-category': this.props.stockId }
			: queryData;

		this.props.getProducts(
			requestData,
			this.props.subCategoryId || this.props.categoryId
		);
		this.props.history.push({
			pathname,
			search: `${qs.stringify(queryData)}`,
		});
	}
	toogleFavotite = product => {
		const remove = find(this.props.favorites, { id: product.id })
			? true
			: false;
		this.props.addToFavorites(product, remove);
	};
	render() {
		const {
			sex,
			categoryId,
			allCount,
			products,
			isLoaded,
			isLoading,
		} = this.props;

		return (
			<div className={style.ProductList}>
				<Filter
					categoryId={categoryId}
					allCount={allCount}
					handleChange={this.handleClick}
				/>
				{isLoading ? (
					<div className={style.ProductList__preloader}>
						<Preloader />
					</div>
				) : (
					<div className={style.ProductList__container}>
						{products.length > 0 &&
							isLoaded &&
							!isLoading &&
							products.map(product => (
								<ProductCard
									sex={sex}
									key={product.id}
									{...product}
									toogleFavotite={() =>
										this.toogleFavotite(product)
									}
									isFavorite={
										typeof find(this.props.favorites, {
											id: product.id,
										}) !== 'undefined'
									}
								/>
							))}
						{products.length === 0 &&
							isLoaded &&
							!isLoading && (
								<p>По заданным параметрам товаров не найдено</p>
							)}
					</div>
				)}
			</div>
		);
	}
}

ProductList.defaultProps = {
	products: [],
	categoryId: '',
	subCategoryId: '',
	stockId: '',
};

ProductList.propTypes = {
	products: PropTypes.array,
	categoryId: PropTypes.string,
	subCategoryId: PropTypes.string,
	stockId: PropTypes.string,
	allCount: PropTypes.number.isRequired,
	countView: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	let { sex } = qs.parse(ownProps.location.search);
	const { categoryId, subCategoryId, stockId } = ownProps.match.params;
	const { products, isLoaded, isLoading } = state.products;
	const { added: favorites } = state.favorites;
	const query = qs.parse(ownProps.location.search);
	return {
		sex,
		categoryId,
		subCategoryId,
		stockId,
		query,
		products,
		isLoaded,
		isLoading,
		favorites,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { categoryId } = ownProps;
	return {
		getProducts: data =>
			dispatch(productsAction.getProducts(data, categoryId)),
		setPagination: (offset, countView) =>
			dispatch(paginationAction.setPagination(offset, countView)),
		addToFavorites: (product, remove) =>
			dispatch(favoritesAction.addToFavorites(product, remove)),
		removeFromFavorites: productId =>
			dispatch(favoritesAction.addToFavorites(productId, true)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProductList)
);
