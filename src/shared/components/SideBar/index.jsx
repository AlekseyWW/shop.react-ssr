import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { change } from 'redux-form';
import BarFilter from 'components/BarFilter/';
import { reset } from 'redux-form';
import qs from 'query-string';
import Button from 'components/Button/';
import * as productsAction from 'actions/products';
import { Link, NavLink } from 'react-router-dom';

import style from './styles.styl';
import { blur } from 'redux-form';

const BarItem = ({ category, isActive, subCategoryId, historyLocation, stockId }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: isActive,
	})
	const path = historyLocation ? `${category.slug}` : `${category.slug}`;
	const url = stockId ? `/${stockId}/catalog/${path}` : `/catalog/${path}`;
	
	return (
		<div>
			<Link to={url} key={category.id} className={styles}>{category.name}</Link>
			{category.items &&
				<div className={subStyles}>
					{ category.items.map(item => {
						const itemStyles = classNames({
							[`${style.SideBar__filter__list__item}`]: true,
							[`${style.SideBar__filter__list__item_active}`]: subCategoryId === item.slug,
						});
						const subPath = historyLocation ? `${category.slug}/${item.slug}${historyLocation}` : `${category.slug}/${item.slug}`;
						const subUrl = stockId ? `/${stockId}/catalog/${subPath}` : `/catalog/${subPath}`;
						return <Link to={subUrl} key={item.id} className={itemStyles}>{item.name}</Link>
						})
					}
				</div>
			}
		</div>
	);
}

BarItem.defaultProps = {
	subCategoryId: ''
};

BarItem.propTypes = {
	isActive: PropTypes.bool.isRequired,
	category: PropTypes.object.isRequired,
	subCategoryId: PropTypes.string
};


class SideBar extends Component {
	constructor(props) {
		super(props);
		this.resetForm = this.resetForm.bind(this);
	}
	historyPush = query => {
		const slug = this.props.subCategoryId ? `${this.props.categoryId}/${this.props.subCategoryId}` : `${this.props.categoryId}`;
		const pathname = slug ? this.props.stockId ? `/${this.props.stockId}/catalog/${slug}` : `/catalog/${slug}` : this.props.stockId ? `/${this.props.stockId}/catalog` : `/catalog`;
		this.props.history.push({
			pathname,
			search: `${qs.stringify(query)}`
		})
	}
	resetForm() {
		this.props.changeForm('brand', '')
		this.props.changeForm('size', '')
	}
	render() {
		const { stockTitle, query, stockCategories, stockId, categories, brands, size, sex, brand, getProducts, categoryId, sizes, subCategoryId, title, history, location, match } = this.props;
		const currentSizes = sex && sizes.length > 0 && sizes[0].sex && sizes[0].sex.whom ? _.filter(sizes, b => b.sex.name === sex) : sizes;
		const genderSize = sizes[0] && sizes[0].sex && sizes[0].sex.whom ? _.groupBy(sizes, b => b.sex.whom) : [];
		const gender = Object.keys(genderSize);
		const url = (item) => {
			const query = {
				...query,
				sex: item
			}
			this.historyPush(query)
			getProducts(query, subCategoryId || categoryId);
		};
		return (
			<div className={style.SideBar}>
				<div className={style.SideBar__filter}>
					<div className={style.SideBar__filter__item}>
						<div className={style.SideBar__filter__title}>
							{title} {stockTitle && `/${stockTitle}`}
						</div>
						{gender.length > 0 &&
							<div className={style.SideBar__sex}>
								{gender.map(gender => {
									const itemStyle = classNames({
										[`${style.SideBar__sex__item}`]: true,
										[`${style.SideBar__sex__item_active}`]: sex === genderSize[gender][0].sex.name
									})
									return <div onClick={() => url(genderSize[gender][0].sex.name)} key={gender} className={itemStyle}>{gender}</div>
								})}
							</div>
						}
						<div className={style.SideBar__stock}>
							<NavLink to={`/catalog`} onClick={this.resetForm} className={style.SideBar__stock__item} activeClassName={style.SideBar__stock__item_active}>Все товары</NavLink>
							{stockCategories && stockCategories.map(category => <NavLink to={`/${category.slug}/catalog`} onClick={this.resetForm} key={category.id} className={style.SideBar__stock__item} activeClassName={style.SideBar__stock__item_active}>{category.name}</NavLink>)}
						</div>
						<div className={style.SideBar__filter__list}>
							{categories.map(category => <BarItem category={category} key={category.id} className={style.SideBar__filter__list__item} isActive={categoryId === category.slug} subCategoryId={subCategoryId} historyLocation={location.search} stockId={stockId} />)}
							<Link to='/cart' className={`${style.SideBar__filter__list__item} ${style.SideBar__filter__list__item_cart}`}>Перейти в&nbsp;корзину</Link>
						</div>
					</div>
					<div className={style.SideBar__filter__item}>
						<BarFilter resetForm={this.resetForm} brands={brands.brands} sizes={currentSizes} onSubmit={(data) => {
							const query = {};
							Object.keys(data).forEach(element => {
								if (data[element]) {
									query[element] = data[element].join(',')
								}
							});
							query.sex = sex;
							query.offset = this.props.query.offset || 0;
							query.count = this.props.query.count || 12;
							this.historyPush(query);
							getProducts(query, subCategoryId || categoryId);
						}} />
					</div>
				</div>
			</div>
		)
	}
}

SideBar.defaultProps = {
	subCategoryId: '',
	categoryId: '',
};
SideBar.propTypes = {
	categories: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	categoryId: PropTypes.string,
	subCategoryId: PropTypes.string,
	title: PropTypes.string.isRequired,
	stockTitle: PropTypes.string.isRequired,
	sizes: PropTypes.array.isRequired,
	brands: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) => {
	const { brand, size, sex } = qs.parse(ownProps.location.search);
	const query = qs.parse(ownProps.location.search);
	const { categoryId, subCategoryId, stockId } = ownProps.match.params;
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
		stockId,
		categories,
		stockTitle,
		brands,
		sizes,
		brand,
		query,
		size,
		sex,
		slug,
		stockCategories,
		countView,
		title: title || 'Каталог'
	};
};

const mapDispatchToProps = dispatch => ({
	getProducts: (productConfig, category) => dispatch(productsAction.getProducts(productConfig, category)),
	changeForm: (field, value) => dispatch(change('filter', field, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
