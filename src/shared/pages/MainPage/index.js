import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Promo from 'components/Promo/';
import Category from 'containers/Category/';
import BrandList from 'components/BrandList/';
import NewPropducts from 'containers/NewPropducts/';
import * as productsAction from 'actions/products';
import * as categoryAction from 'actions/category';
import brandsAction from 'actions/brands';
import text from 'config/mainPage.json';

class MainPage extends Component {
	static defaultProps = {
		sex: '',
	};
	static propTypes = {
		sex: PropTypes.string,
		categories: PropTypes.array.isRequired
	};
	static fetchData({ store, params }) {
		const productConfig = {
			offset: 0,
			count: 12,
			sortBy: 'date',
			sex: params.sex || '',
			categories: '',
			subCategoryId: '',
			filter: {
				categories: 'all',
				brands: '',
				priceFrom: '',
				priceTo: ''
			}
		};
		return store.dispatch(productsAction.getProducts(productConfig));
	}
	componentDidMount() {
		const { isLoading, isLoaded, getProducts } = this.props;
		if (!isLoading && !isLoaded) getProducts();
	}
	render() {
		const { categories, sex, isLoaded, isLoading, products } = this.props;
		const currentProducts = _.filter(products, {top: true})
		console.log('====================================');
		console.log(currentProducts);
		console.log('====================================');
		return (
			<div className="page__inner">
				<Helmet title="Главная" />
				{ sex === 'man' ?
					(<div>
						<Promo content={text.promo} />
						<Category categories={categories} />
						{ isLoaded && !isLoading && <NewPropducts products={products} /> }
						<BrandList />
					</div>
					) :
					(<div>
						<Promo content={text.promo} />
						<Category categories={categories} />
						{ isLoaded && !isLoading && <NewPropducts products={currentProducts} /> }
						<BrandList />
					</div>
					)
				}

			</div>
		);
	}
}
MainPage.defaultProps = {
	sex: '',
};

MainPage.propTypes = {
	sex: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	products: PropTypes.array.isRequired,
	isLoaded: PropTypes.bool.isRequired,
	getProducts: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { sex } = ownProps.match.params;
	const { products, isLoading, isLoaded } = state.products;
	const { items } = state.category.promoCategories;
	return { sex, categories: items, products, isLoading, isLoaded };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const productConfig = {
		offset: 0,
		count: 12,
		sortBy: 'date',
		sex: ownProps.match.params.sex || '',
		categories: '',
		subCategoryId: '',
		filter: {
			categories: 'all',
			brands: '',
			priceFrom: '',
			priceTo: ''
		}
	};
	
	return ({
		getProducts: () => dispatch(productsAction.getProducts(productConfig)),
		getBrands: () => dispatch(brandsAction())
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
