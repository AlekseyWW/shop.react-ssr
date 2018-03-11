import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Promo from 'components/Promo/';
import Category from 'containers/Category/';
import BrandList from 'components/BrandList/';
import Reviews from 'components/Reviews/';
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
		return Promise.all([
			store.dispatch(productsAction.getPromoProducts()),
			store.dispatch(sliderAction.loadSlider()),
			store.dispatch(categoryAction.getPromoCategories())
		]);
	}
	componentDidMount() {
		const { isPromoLoading, isPromoLoaded, categories, promoCategories, getProducts, getCategories, getPromoCategories, slider, loadSlider } = this.props;
		if (!isPromoLoading && !isPromoLoaded) getProducts();
		if (!promoCategories.isLoading && !promoCategories.isLoaded) getPromoCategories();
		if (!categories.isLoading && !categories.isLoaded) getCategories();
		if (!slider.isLoading && !slider.isLoaded) loadSlider();
		
	}
	render() {
		const { promoCategories, sex, promoProducts, slider, categories } = this.props;
		return (
			<div className="page__inner">
				<Helmet title="Главная" />
				{slider && slider.slider.length > 0 && <Promo categories={categories.items} slides={slider.slider} content={text.promo}/>}
				{promoCategories.items && categories.items && <Category items={promoCategories.items} categories={categories.items}/>}
				{promoProducts && <NewPropducts products={promoProducts} />}
				<InstagrammGallery />
				<Reviews />
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
	isPromoLoading: PropTypes.bool.isRequired,
	promoProducts: PropTypes.array,
	isPromoLoaded: PropTypes.bool.isRequired,
	getProducts: PropTypes.func.isRequired,
	categories: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const { sex } = ownProps.match.params;
	const { promoProducts, isPromoLoading, isPromoLoaded } = state.products;
	const slider = state.slider;
	const promoCategories = state.category.promoCategories;
	const categories = state.category.categories;
	return { sex, promoCategories, promoProducts, isPromoLoading, isPromoLoaded, slider, categories };
};

const mapDispatchToProps = (dispatch, ownProps) => {	
	return ({
		getProducts: () => dispatch(productsAction.getPromoProducts()),
		getPromoCategories: () => dispatch(categoryAction.getPromoCategories()),
		getCategories: () => dispatch(categoryAction.getCategories()),
		loadSlider: () => dispatch(sliderAction.loadSlider()),
		getBrands: () => dispatch(brandsAction())
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
