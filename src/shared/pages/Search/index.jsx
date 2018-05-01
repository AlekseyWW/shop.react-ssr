import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from 'components/ProductCard';
import Preloader from 'components/Preloader';
import * as productsAction from 'actions/products';
import * as categoryAction from 'actions/category';
import * as favoritesAction from 'actions/favorites/';
import brandsAction from 'actions/brands';
import MainBlock from 'containers/MainBlock/';
import PageInfo from 'containers/PageInfo/';
import qs from 'query-string';
import styles from './styles.styl';


class Search extends Component {
	componentDidMount() {
		const {
			isSearching,
			isSearched,
			getProducts,
			searchProduct,
			subCategoryId,
			brands,
			slug,
			parsedQuery,
			getBrands,
			value
		} = this.props;
		if (!isSearching && !isSearched && value) searchProduct(value);
	}
	static fetchData({ store, params, query }) {
		const productConfig = {
			sort: 'date',
			'custom-category': params.stockId,
			...query,
			offset: query.offset || 0,
			count: query.count || 12,
		};
		const category = params.subCategoryId || params.categoryId;
		return Promise.all([
			store.dispatch(productsAction.getProducts(productConfig, category)),
			store.dispatch(categoryAction.getCategories()),
			store.dispatch(categoryAction.getStockCategories())
		]);
	}
	componentDidUpdate(prevProps) {
		const category = this.props.subCategoryId || this.props.categoryId;
		const newCategory = prevProps.subCategoryId || prevProps.categoryId;
		
		if (category !== newCategory || prevProps.stockId !== this.props.stockId) {
			const {
				parsedQuery
			} = this.props;
			const productConfig = {
				sort: 'date',
				'custom-category': this.props.stockId,
				...parsedQuery,
				offset: parsedQuery.offset || 0,
				count: parsedQuery.count || 12,
			};
			this.props.getProducts(productConfig, category);
		}
	}
	componentWillReceiveProps(nextProps) {
		const category = this.props.subCategoryId || this.props.categoryId;
		const newCategory = nextProps.subCategoryId || nextProps.categoryId;
		
		if (category !== newCategory || nextProps.stockId !== this.props.stockId) {
			const {
				parsedQuery
			} = this.props;
			const productConfig = {
				sort: 'date',
				'custom-category': this.props.stockId,
				...parsedQuery,
				offset: parsedQuery.offset || 0,
				count: parsedQuery.count || 12,
			};
			this.props.getProducts(productConfig, nextProps.categoryId);
		}
	}
	toogleFavotite = (product) => {
		if (find(this.props.favorites, { id: product.id })) {
			this.props.removeFromFavorites(product.id)
		} else {
			this.props.addToFavorites(product)
		}
	}
	render() {
		const {
			products,
			categoryId,
			subCategoryId,
			allCount,
			countView,
			categories,
			brands,
			sizes,
			title,
			stockTitle,
			searchProducts,
			getProducts,
			isSearched,
			isSearching
		} = this.props;
		const historyPush = query => {
			this.props.history.push({
				pathname: subCategoryId ? `/Search/${categoryId}/${subCategoryId}` : `/Search/${categoryId}`,
				search: `${qs.stringify(query)}`
			})
		}
		const renderedProducts = _.filter(searchProducts, b => _.filter(b.sizes, a => a.quantity > 0).length > 0);
		
		return (
			<div className={styles.Search}>
				<div className={styles.Search__title}>
					Результаты поиска
				</div>
				{isSearching && <Preloader />}
				{searchProducts && searchProducts.length > 0 && isSearched && !isSearching && renderedProducts.map(product => <ProductCard key={product.id} {...product} toogleFavotite={() => this.toogleFavotite(product)} isFavorite={typeof find(this.props.favorites, { id: product.id }) !== 'undefined'} />)}
				{searchProducts && searchProducts.length === 0 && isSearched && !isSearching && <p>По заданным параметрам товаров не найдено</p>}
			</div>
		);
	}
}

Search.defaultProps = {
	subCategoryId: '',
	products: [],
	brand: '',
	categoryId: '',
	size: '',
};

Search.propTypes = {
	isSearching: PropTypes.bool.isRequired,
	getProducts: PropTypes.any.isRequired,
	getBrands: PropTypes.any.isRequired,
	products: PropTypes.array,
	categories: PropTypes.array.isRequired,
	brands: PropTypes.object.isRequired,
	brand: PropTypes.string,
	size: PropTypes.string,
	sizes: PropTypes.array.isRequired,
	categoryId: PropTypes.string,
	title: PropTypes.string.isRequired,
	stockTitle: PropTypes.string.isRequired,
	subCategoryId: PropTypes.string,
	allCount: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { added: favorites } = state.favorites;
	const { brand, size, sex, count, offset } = qs.parse(ownProps.location.search);
	const { value } = qs.parse(ownProps.location.search);
	const query = ownProps.location.search;
	const { stockId, categoryId, subCategoryId } = ownProps.match.params;
	const { items: categories } = state.category.categories;
	const { items: stockCategories } = state.category.stockCategories;
	const brands = state.brands;
	let category = _.find(categories, { slug: categoryId });
	let subCategories = _.map(categories, 'items');
	subCategories = _.reduce(subCategories, (sum, n) => ([...sum, ...n]), []);
	if (!category) category = _.find(subCategories, { slug: categoryId });
	const { isSearched, isSearching, products, allCount, sizes, countView, category: slug, config, searchProducts } = state.products;
	const title = category ? category.title || category.name : '';
	const stockTitle = stockCategories && stockId && _.find(stockCategories, { slug: stockId }) ? _.find(stockCategories, { slug: stockId }).name : ''
	return {
		isSearched,
		isSearching,
		products,
		config,
		subCategoryId,
		categoryId,
		allCount,
		categories,
		stockTitle,
		searchProducts,
		brands,
		sizes,
		brand,
		size,
		sex,
		query,
		stockId,
		slug,
		countView,
		favorites,
		value,
		title: title || 'Каталог'
	};
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories()),
	getStockCategories: () => dispatch(categoryAction.getStockCategories()),
	getProducts: (productConfig, category) => dispatch(productsAction.getProducts(productConfig, category)),
	getBrands: () => dispatch(brandsAction()),
	addToFavorites: (product) => dispatch(favoritesAction.addToFavorites(product)),
	searchProduct: (value) => dispatch(productsAction.searchProducts(value)),
	removeFromFavorites: (productId) => dispatch(favoritesAction.addToFavorites(productId, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
