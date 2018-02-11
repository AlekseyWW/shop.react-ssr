import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Promo from 'components/Promo/';
import Category from 'containers/Category/';
import BrandList from 'components/BrandList/';
import NewPropducts from 'containers/NewPropducts/';
import InstagrammGallery from 'components/InstagrammGallery';
import * as productsAction from 'actions/products';
import * as sliderAction from '../../state/modules/slider';
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
		return store.dispatch(productsAction.getPromoProducts());
	}
	componentDidMount() {
		const { isLoading, isLoaded, getProducts, getCategories, getPromoCategories, slider, loadSlider } = this.props;
		if (!isLoading && !isLoaded) getProducts();
		getPromoCategories();
		getCategories();
		if (!slider.isLoading && !slider.isLoaded) loadSlider();
	}
	render() {
		const { propmoCategories, sex, isLoaded, isLoading, promoProducts, slider, categories } = this.props;
		// const currentProducts = _.filter(promoProducts, {top: true})
		return (
			<div className="page__inner">
				<Helmet title="Главная" />
				{categories && <Promo categories={categories} slides={slider.slider} />}
				{propmoCategories && categories && <Category categories={propmoCategories} categories={categories}/>}
				<InstagrammGallery />
				{promoProducts && <NewPropducts products={promoProducts} />}
			</div>
		);
	}
}
MainPage.defaultProps = {
	sex: '',
	promoProducts: []
};

MainPage.propTypes = {
	sex: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	promoProducts: PropTypes.array,
	isLoaded: PropTypes.bool.isRequired,
	getProducts: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { sex } = ownProps.match.params;
	const { promoProducts, isLoading, isLoaded } = state.products;
	const slider = state.slider;
	const { items } = state.category.promoCategories;
	const { items: categories } = state.category.categories;
	return { sex, propmoCategories: items, promoProducts, isLoading, isLoaded, slider, categories };
};

const mapDispatchToProps = (dispatch, ownProps) => {	
	return ({
		getProducts: () => dispatch(productsAction.getPromoProducts()),
		getPromoCategories: () => dispatch(categoryAction.getPromoCategories(productConfig)),
		getCategories: () => dispatch(categoryAction.getCategories(productConfig)),
		loadSlider: () => dispatch(sliderAction.loadSlider()),
		getBrands: () => dispatch(brandsAction())
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
