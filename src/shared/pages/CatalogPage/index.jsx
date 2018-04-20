import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as productsAction from 'actions/products';
import * as categoryAction from 'actions/category';
import brandsAction from 'actions/brands';
import MainBlock from 'containers/MainBlock/';
import PageInfo from 'containers/PageInfo/';
import qs from 'query-string';


class Catalog extends Component {
	componentDidMount() {
		const {
			isLoading,
			isLoaded,
			getProducts,
			subCategoryId,
			brands,
			slug,
			parsedQuery,
			getBrands,
		} = this.props;
		const productConfig = {
			sort: 'date',
			'custom-category': this.props.stockId,
			...parsedQuery,
			offset: parsedQuery.offset || 0,
			count: parsedQuery.count || 12,
		};
		
		const category = this.props.subCategoryId || this.props.categoryId;
		if (!isLoading && !isLoaded || category!== slug || JSON.stringify(this.props.config) !== JSON.stringify(productConfig) ) getProducts(productConfig, category);
		if (!brands.isLoaded && !brands.isLoading) getBrands();
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
			console.log({ 'mocomponentDidUpdateunt': productConfig });
			
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
				'custom-category': nextProps.props.stockId,
				...parsedQuery,
				offset: parsedQuery.offset || 0,
				count: parsedQuery.count || 12,
			};
			console.log({ 'componentWillReceiveProps': productConfig });
			
			this.props.getProducts(productConfig, nextProps.categoryId);
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
			getProducts,
			isLoaded
		} = this.props;
		const historyPush = query => {
			this.props.history.push({
				pathname: subCategoryId ? `/catalog/${categoryId}/${subCategoryId}` : `/catalog/${categoryId}`,
				search: `${qs.stringify(query)}`
			})
		}
		return (
			<MainBlock
				title={title}
				stockTitle={stockTitle}
				products={products}
				categoryId={categoryId}
				subCategoryId={subCategoryId}
				allCount={allCount}
				countView={countView}
				categories={categories}
				brands={brands.brands}
				sizes={sizes}
				isLoaded={isLoaded}
				getProducts={getProducts}
				historyPush={historyPush}
				historyLocation={this.props.location.search}
				subCategoryId={subCategoryId}
			/>
		);
	}
}

Catalog.defaultProps = {
	subCategoryId: '',
	products: [],
	brand: '',
	categoryId: '',
	size: '',
};

Catalog.propTypes = {
	isLoading: PropTypes.bool.isRequired,
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
	const { brand, size, sex, count, offset } = qs.parse(ownProps.location.search);
	const parsedQuery = qs.parse(ownProps.location.search);
	const query = ownProps.location.search;
	const { stockId, categoryId, subCategoryId } = ownProps.match.params;
	const { items: categories } = state.category.categories;
	const { items: stockCategories } = state.category.stockCategories;
	const brands = state.brands;
	let category = _.find(categories, { slug: categoryId });
	let subCategories = _.map(categories, 'items');
	subCategories = _.reduce(subCategories, (sum, n) => ([...sum, ...n]), []);
	if (!category) category = _.find(subCategories, { slug: categoryId });
	const { isLoaded, isLoading, products, allCount, sizes, countView, category: slug, config } = state.products;
	const title = category ? category.title || category.name : '';
	const stockTitle = stockCategories && stockId && _.find(stockCategories, { slug: stockId }) ? _.find(stockCategories, { slug: stockId }).name : ''
	return {
		isLoaded,
		isLoading,
		products,
		config,
		subCategoryId,
		categoryId,
		allCount,
		categories,
		stockTitle,
		brands,
		sizes,
		brand,
		size,
		sex,
		query,
		stockId,
		parsedQuery,
		slug,
		countView,
		title: title || 'Каталог'
	};
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories()),
	getStockCategories: () => dispatch(categoryAction.getStockCategories()),
	getProducts: (productConfig, category) => dispatch(productsAction.getProducts(productConfig, category)),
	getBrands: () => dispatch(brandsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
