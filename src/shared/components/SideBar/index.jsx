import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import BarFilter from 'components/BarFilter/';
import qs from 'query-string';
import Button from 'components/Button/';
import * as productsAction from 'actions/products';
import { Link } from 'react-router-dom';

import style from './styles.styl';
import { blur } from 'redux-form';

const BarItem = ({ category, isActive, subCategoryId, historyLocation }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: isActive,
	})
	const url = historyLocation ? `/catalog/${category.slug}${historyLocation}` : `/catalog/${category.slug}`;
	return (
		<div>
			<Link to={url} key={category.id} className={styles}>{category.name}</Link>
			<div className={subStyles}>
				{ category.items.map(item => {
					const itemStyles = classNames({
						[`${style.SideBar__filter__list__item}`]: true,
						[`${style.SideBar__filter__list__item_active}`]: subCategoryId === item.slug,
					});
					const subUrl = historyLocation ? `/catalog/${category.slug}/${item.slug}${historyLocation}` : `/catalog/${category.slug}/${item.slug}`;
					return <Link to={subUrl} key={item.id} className={itemStyles}>{item.name}</Link>
					})
				}
				</div>
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


const SideBar = ({ categories, brands, size, sex, brand, getProducts, categoryId, sizes, subCategoryId, title, history, location, match}) => {
	const historyPush = query => {
		history.push({
			pathname: subCategoryId ? `/catalog/${categoryId}/${subCategoryId}` : `/catalog/${categoryId}`,
			search: `${qs.stringify(query)}`
		})
	}
	const genderSize = sizes[0] && sizes[0].sex && sizes[0].sex.whom ? _.groupBy(sizes, b => b.sex.whom) : [];
	const currentSizes = sex && sizes[0].sex && sizes[0].sex.whom ? _.filter(sizes, b => b.sex.name === sex) : sizes;
	const gender = Object.keys(genderSize); 
	const url = (item) => {
		const query = {
			size,
			brand,
			sex: item
		}
		historyPush(query)
		getProducts(query, subCategoryId || categoryId);
	};
	return (
		<div className={style.SideBar}>
			<div className={style.SideBar__filter}>
				<div className={style.SideBar__filter__item}>
					<div className={style.SideBar__filter__title}>
						{title}
					</div>
					{gender.length > 0 &&
						<div className={style.SideBar__sex}>
							{gender.map(gender => <div onClick={() => url(genderSize[gender][0].sex.name)} key={gender} className={style.SideBar__sex__item}>{gender}</div>)}
						</div>
					}
					<div className={style.SideBar__filter__list}>
						{categories.map(category => <BarItem category={category} key={category.id} className={style.SideBar__filter__list__item} isActive={categoryId === category.slug} subCategoryId={subCategoryId} historyLocation={location.search}/>) }
						<Link to='/cart' className={`${style.SideBar__filter__list__item} ${style.SideBar__filter__list__item_cart}`}>Перейти в&nbsp;корзину</Link>
					</div>
				</div>
				<div className={style.SideBar__filter__item}>
					<BarFilter brands={brands.brands} sizes={currentSizes} onSubmit={(data) => {
						const query = {};
						Object.keys(data).forEach(element => {
							query[element] = data[element].join(',')
						});
						query.sex = sex;
						historyPush(query);
						getProducts(query, subCategoryId || categoryId);
					} } />
				</div>
			</div>
		</div>
	)
};
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
	sizes: PropTypes.array.isRequired,
	brands: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) => {
	const { brand, size, sex } = qs.parse(ownProps.location.search);
	const { categoryId, subCategoryId } = ownProps.match.params;
	const { items: categories } = state.category.categories;
	const brands = state.brands;
	let category = _.find(categories, { slug: categoryId });
	let subCategories = _.map(categories, 'items');
	subCategories = _.reduce(subCategories, (sum, n) => ([...sum, ...n]), []);
	if (!category) category = _.find(subCategories, { slug: categoryId });
	const { isLoaded, isLoading, products, allCount, sizes, countView, category: slug } = state.products;
	const title = category ? category.title || category.name : '';
	return {
		isLoaded,
		isLoading,
		products,
		subCategoryId,
		categoryId,
		allCount,
		categories,
		brands,
		sizes,
		brand,
		size,
		sex,
		slug,
		countView,
		title: title || 'Каталог'
	};
};

const mapDispatchToProps = dispatch => ({
	getProducts: (productConfig, category) => dispatch(productsAction.getProducts(productConfig, category)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
