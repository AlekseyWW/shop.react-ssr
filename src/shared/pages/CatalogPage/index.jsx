import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as productsAction from 'actions/products';
import brandsAction from 'actions/brands';
import MainBlock from 'containers/MainBlock/';
import PageInfo from 'containers/PageInfo/';


class Catalog extends Component {
	componentDidMount() {
		const {
			isLoading,
			isLoaded,
			getProducts,
			brands,
			getBrands,
			config
		} = this.props;
		const productConfig = {
			offset: 0,
			count: 12,
			sort: 'date',
			sex: this.props.sex || '',
			brand: [],
			size: []
		};
		const category = this.props.subCategoryId ? this.props.subCategoryId : this.props.categoryId;
		console.log('====================================');
		console.log(category);
		console.log('====================================');
		if (!isLoading) getProducts(productConfig, category);
		if (!brands.isLoaded && !brands.isLoading) getBrands();
	}
	static fetchData({ store, params }) {
		const productConfig = {
			offset: 0,
			count: 12,
			sort: 'date',
			sex: params.sex || '',
			brand: [],
			size: []
		};
		const category = params.subCategoryId ? params.subCategoryId : params.categoryId
		return store.dispatch(productsAction.getProducts(productConfig, category));
	}
	componentWillReceiveProps(nextProps) {
		 if (nextProps.categoryId !== this.props.categoryId) {
		 	const config = { ...this.props.config };
		 	config.categories = nextProps.categoryId;
		 	config.subCategoryId = nextProps.categoryId;
		 	this.props.getProducts(config);
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
			title,
			getProducts,
			isLoaded
		} = this.props;
		return (
			<MainBlock
				title={title}
				products={products}
				categoryId={categoryId}
				subCategoryId={subCategoryId}
				allCount={allCount}
				countView={countView}
				categories={categories}
				brands={brands.brands}
				isLoaded={isLoaded}
				getProducts={getProducts}
			/>
		);
	}
}

Catalog.defaultProps = {
	subCategoryId: '',
    products: [],
};

Catalog.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	getProducts: PropTypes.any.isRequired,
	getBrands: PropTypes.any.isRequired,
	products: PropTypes.array,
	categories: PropTypes.array.isRequired,
	brands: PropTypes.object.isRequired,
	categoryId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subCategoryId: PropTypes.string,
	config: PropTypes.object.isRequired,
	allCount: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { categoryId, subCategoryId, sex } = ownProps.match.params;
	const { items: categories } = state.category.categories;
	const brands = state.brands;
	let category = _.find(categories, { slug: categoryId });
	let subCategories = _.map(categories, 'items');
	subCategories = _.reduce(subCategories, (sum, n) => ([...sum, ...n]), []);
	if (!category) category = _.find(subCategories, { slug: categoryId });
	const { isLoaded, isLoading, products, allCount, countView, config } = state.products;
	const title = category ? category.title || category.name : '';
	return {
		sex,
		isLoaded,
		isLoading,
		products,
		categoryId,
		subCategoryId,
		allCount,
		categories,
		config,
		brands,
		countView,
		title: title || 'Каталог'
	};
};

const mapDispatchToProps = dispatch => ({
	getProducts: (productConfig, category) => dispatch(productsAction.getProducts(productConfig, category)),
	getBrands: () => dispatch(brandsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
