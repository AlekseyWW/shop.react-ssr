import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as productsAction from 'actions/products';
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
			brand,
			slug,
			size,
			sex,
			getBrands,
		} = this.props;
		const productConfig = {
			offset: 0,
			count: 1000,
			sort: 'date',
			'custom-category': this.props.stockId,
			brand,
			size,
			sex
		};
		const category = this.props.subCategoryId || this.props.categoryId;
		if (!isLoading ) getProducts(productConfig, category);
		if (!brands.isLoaded && !brands.isLoading) getBrands();
	}
	static fetchData({ store, params, query }) {
		const productConfig = {
			offset: 0,
			count: 1000,
			sort: 'date',
			'custom-category': params.stockId,
			...query
		};
		const category = params.subCategoryId || params.categoryId;
		return store.dispatch(productsAction.getProducts(productConfig, category));
	}
	componentDidUpdate(prevProps) {
		const category = this.props.subCategoryId || this.props.categoryId;
		const newCategory = prevProps.subCategoryId || prevProps.categoryId;
		if (category !== newCategory || prevProps.stockId !== this.props.stockId) {
			const {
				brand,
				size,
			} = this.props;
			const productConfig = {
				offset: 0,
				count: 200,
				sort: 'date',
				'custom-category': this.props.stockId,
				brand,
				size,
			};
			this.props.getProducts(productConfig, category);
		}
	}
	componentWillReceiveProps(nextProps) {
		const category = this.props.subCategoryId || this.props.categoryId;
		const newCategory = nextProps.subCategoryId || nextProps.categoryId;
		if (category !== newCategory || nextProps.stockId !== this.props.stockId) {
			const {
				brand,
				size,
			} = this.props;
			const productConfig = {
				offset: 0,
				count: 1000,
				sort: 'date',
				'custom-category': this.props.stockId,
				brand,
				size,
			};
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
	const { brand, size, sex } = qs.parse(ownProps.location.search);
	const query = ownProps.location.search;
	const { stockId, categoryId, subCategoryId } = ownProps.match.params;
	const { items: categories } = state.category.categories;
	const { items: stockCategories } = state.category.stockCategories;
	const brands = state.brands;
	let category = _.find(categories, { slug: categoryId });
	let subCategories = _.map(categories, 'items');
	subCategories = _.reduce(subCategories, (sum, n) => ([...sum, ...n]), []);
	if (!category) category = _.find(subCategories, { slug: categoryId });
	const { isLoaded, isLoading, products, allCount, sizes, countView, category: slug } = state.products;
	const title = category ? category.title || category.name : '';
	const stockTitle = stockCategories && stockId && _.find(stockCategories, { slug: stockId }) ? _.find(stockCategories, { slug: stockId }).name : ''
	return {
		isLoaded,
		isLoading,
		products,
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
		slug,
		countView,
		title: title || 'Каталог'
	};
};

const mapDispatchToProps = dispatch => ({
	getProducts: (productConfig, category) => dispatch(productsAction.getProducts(productConfig, category)),
	getBrands: () => dispatch(brandsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
