import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import find from 'lodash/find';
import omit from 'lodash/omit';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { change } from 'redux-form';
import BarFilter from 'components/BarFilter/';
import { reset } from 'redux-form';
import qs from 'query-string';
import Button from 'components/Button/';
import * as productsAction from 'actions/products';
import { TweenMax, Power2, TimelineLite } from "gsap";
import { Link } from 'react-router-dom';
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
import style from './styles.styl';
import { blur } from 'redux-form';
let openedBrands = false;
const brandTest = [
	{
		name: "Nike",
		slug: "nike"
	},
	{
		name: "Nike1",
		slug: "nike1"
	},
	{
		name: "Nike2",
		slug: "nike2"
	},
	{
		name: "Nike3",
		slug: "nike3"
	},
	{
		name: "Nike4",
		slug: "nike4"
	},
	{
		name: "Nike5",
		slug: "nike5"
	},
	{
		name: "Nike6",
		slug: "nike6"
	},
	{
		name: "Nike7",
		slug: "nike7"
	},
	{
		name: "Nike8",
		slug: "nike8"
	},
	{
		name: "Nike9",
		slug: "nike9"
	},
	{
		name: "Nike10",
		slug: "nike10"
	},
	{
		name: "Nike11",
		slug: "nike11"
	},
	{
		name: "Nike12",
		slug: "nike12"
	}
]

const BarItem = ({ category, isActive, subCategoryId, historyLocation, stockId, query }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: isActive && !stockId,
	})
	const path = historyLocation ? `${category.slug}` : `${category.slug}`;
	
	const url = {
		pathname:`/catalog/${path}`,
		// search: query ? qs.stringify(omit(query, 'size')) : ''
	};
	
	const sublist = category.items || category.category;
	return (
		<div>
			<Link to={url} key={category.id} className={styles}>{category.name}</Link>
			{sublist &&
				<div className={subStyles}>
					{sublist.map(item => {
						const itemStyles = classNames({
							[`${style.SideBar__filter__sublist__item}`]: true,
							[`${style.SideBar__filter__sublist__item_active}`]: subCategoryId === item.slug,
						});
						
						const subPath = historyLocation ? `${category.slug}/${item.slug}${historyLocation}` : `${category.slug}/${item.slug}`;
						const subUrl = `/catalog/${subPath}`;
						return <Link to={subUrl} key={item.id} className={itemStyles}>{item.name}</Link>
						})
					}
				</div>
			}
		</div>
	);
}

const SubBarItem = ({ category, isActive, subCategoryId, historyLocation, stockId, categories, query }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: stockId === category.slug,
	})
	const path = historyLocation ? `${category.slug}` : `${category.slug}`;
	const url = {
		pathname: `/${path}/catalog`,
		// search: query ? qs.stringify(omit(query, 'size')) : ''
	};
	const sublist = category.items || category.categories;
	
	return (
		<div>
			<Link to={url} key={category.id} className={styles}>{category.name}</Link>
			{sublist.length &&
				<div className={subStyles}>
					{sublist.map(item => {
							const itemStyles = classNames({
								[`${style.SideBar__filter__sublist__item}`]: true,
								[`${style.SideBar__filter__sublist__item_active}`]: subCategoryId === item.slug,
							});
							const parentCategory = find(categories, b => find(b.items, { slug: item.slug })) ? find(categories, b => find(b.items, { slug: item.slug })) : {};
							const subPath = historyLocation ? `${parentCategory.slug}/${item.slug}${historyLocation}` : `${parentCategory.slug}/${item.slug}`;
							const subUrl = `/${category.slug}/catalog/${subPath}`;
							return <Link to={subUrl} key={item.id} className={itemStyles} replace>{item.name}</Link>
						})
					}
				</div>
			}
		</div>
	);
}
const FilterItem = ({ category, isActive, subCategoryId, historyLocation, stockId, categories }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: stockId === category.slug,
	})
	const path = historyLocation ? `${category.slug}` : `${category.slug}`;
	const url = `/${path}/catalog`;
	const sublist = category.items || category.categories;
	
	return (
		<div>
			<Link to={url} key={category.id} className={styles}>{category.name}</Link>
			{sublist.length &&
				<div className={subStyles}>
					{sublist.map(item => {
							const itemStyles = classNames({
								[`${style.SideBar__filter__sublist__item}`]: true,
								[`${style.SideBar__filter__sublist__item_active}`]: subCategoryId === item.slug,
							});
							const parentCategory = find(categories, b => find(b.items, { slug: item.slug })) ? find(categories, b => find(b.items, { slug: item.slug })) : {};
							const subPath = historyLocation ? `${parentCategory.slug}/${item.slug}${historyLocation}` : `${parentCategory.slug}/${item.slug}`;
							const subUrl = stockId ? `/${stockId}/catalog/${subPath}` : `/catalog/${subPath}`;
							return <Link to={subUrl} key={item.id} className={itemStyles} replace>{item.name}</Link>
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

SubBarItem.defaultProps = {
	subCategoryId: ''
};

SubBarItem.propTypes = {
	isActive: PropTypes.bool.isRequired,
	category: PropTypes.object.isRequired,
	subCategoryId: PropTypes.string
};


class SideBar extends PureComponent {
	constructor(props) {
		super(props);
		this.resetForm = this.resetForm.bind(this);
		this.state = {
			openedBrands: false
		}
	}
	componentDidMount() {
		this.heightBrands = '250px'
		// this.timeline = new
		if (this.brandList) {
			
			this.heightBrands = this.brandList.getBoundingClientRect().height
		}
		if (this.props.brands.brands.length > 10 && !openedBrands && this.brandList) {
			TweenMax.set(this.brandList, { height: "250px" });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.brands.brands.length !== prevProps.brands.brands.length && this.brandList) {
			if (this.brandList) {
				this.heightBrands = this.brandList.getBoundingClientRect().height
			}
			if (this.props.brands.brands.length > 10 && !openedBrands) {
				TweenMax.set(this.brandList, { height: "250px" });
				this.setState({
					openedBrands:false
				})
			}
		}
	}
	toggleBrands() {
		if (!openedBrands) {
			TweenMax.to(this.brandList, 0.35, { height: this.heightBrands });
		} else {
			TweenMax.to(this.brandList, 0.35, { height: "250px" });
		}
		openedBrands = !openedBrands
		this.setState({
			openedBrands: !this.state.openedBrands
		})
	}
	historyPush = query => {
		
		const slug = this.props.subCategoryId ? `${this.props.categoryId}/${this.props.subCategoryId}` : `${this.props.categoryId}`;
		const pathname = slug ? this.props.stockId ? `/${this.props.stockId}/catalog/${slug}` : `/catalog/${slug}` : this.props.stockId ? `/${this.props.stockId}/catalog` : `/catalog`;
		this.props.pushHistory({
			pathname,
			search: `${qs.stringify(query)}`
		})
	}
	resetForm() {
		this.props.changeForm('brand', '')
		this.props.changeForm('size', '')
	}
	// componentDidMount() {
	// 	if (window.innerWidth > 992) {
			
	// 		const ScrollMagic = require('scrollmagic');
	// 		setTimeout(() => {
	// 			this.scene = new ScrollMagic.Scene({
	// 				offset: window.innerWidth <= 992 ? -40 : 0,
	// 				triggerElement: this.block,
	// 				triggerHook: 'onLeave',
	// 			})
	// 				.setPin(this.block)
	// 				.setClassToggle(this.block, 'active')
	// 				.addTo(window.controller);
	// 		}, 0);
	// 	}
	// }

	render() {
		
		const { stockTitle, parsedQuery, stockCategories, stockId, categories, brands, size, sex, brand, getProducts, categoryId, sizes, subCategoryId, title, history, location, match, isMobile } = this.props;
		const currentSizes = sex && sizes.length > 0 && sizes[0].sex && sizes[0].sex.whom ? _.filter(sizes, b => b.sex.name === sex) : sizes;
		const genderSize = sizes[0] && sizes[0].sex && sizes[0].sex.whom ? _.groupBy(sizes, b => b.sex.whom) : [];
		const renderedStockCategories = _.filter(stockCategories, b => { 
			return !(/for/.test(b.slug))
		})
		const gender = Object.keys(genderSize);
		const url = (item) => {
			const query = {
				...parsedQuery,
				size: '',
				sex: item !== sex ? item : ''
			}
			this.historyPush(query)
			getProducts(query, subCategoryId || categoryId);
		};
		
		const brandUrl = (item, type) => {
			const pathname = this.props.location.pathname;
			
			var array = this.props[type] ? this.props[type].split(',') : [];
			var index = array.indexOf(item);
			if (index > -1) {
				array.splice(index, 1);
			} else {
				array.push(item);
			}
			const editedQuery = { ...this.props.parsedQuery };
			editedQuery[type] = array.length > 0 ? array.join(',') : '';
			this.props.pushHistory({
				pathname,
				search: `${qs.stringify(editedQuery)}`
			})
		};
		const brandToogleText = openedBrands ? 'скрыть' : 'показать все';
		return (
			<div key="sidebar" className={style.SideBar}>
				<div className={style.SideBar__filter} ref={el => this.block = el}>
					<div className={style.SideBar__filter__item}>
						<div className={style.SideBar__filter__title}>
							{title} {stockTitle && `/${stockTitle}`}
						</div>
						{isMobile && <div className={style.SideBar__filter__item}>

							<BarFilter resetForm={this.resetForm} brands={brands.brands} sizes={currentSizes} onSubmit={(data) => {
								const query = {};

								Object.keys(data).forEach(element => {
									if (data[element]) {
										query[element] = data[element].join(',')
									}
								});
								query.sex = sex;
								query.offset = this.props.parsedQuery.offset || 0;
								query.count = this.props.parsedQuery.count || 12;
								this.historyPush(query);
								getProducts(query, subCategoryId || categoryId);
							}} />
						</div>}
						{/* {gender.length > 0 &&
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
							{stockCategories && stockCategories.map(category => 
								<NavLink
									to={`/${category.slug}/catalog`}
									onClick={this.resetForm}
									key={category.id}
									className={style.SideBar__stock__item}
									activeClassName={style.SideBar__stock__item_active}
								>
									{category.name}
								</NavLink>
							)}
						</div> */}
						<div className={style.SideBar__filter__list}>
							{categories.map(category => 
								<BarItem
									category={category}
									key={category.id}
									className={style.SideBar__filter__list__item}
									isActive={categoryId === category.slug}
									subCategoryId={subCategoryId}
									historyLocation={location.search}
									stockId={stockId}
									query={this.props.parsedQuery}
								/>
							)}
						</div>
						<div className={style.SideBar__filter__list}>
							{renderedStockCategories && renderedStockCategories.map(category =>
								<SubBarItem
									category={category}
									key={category.id}
									className={style.SideBar__filter__list__item}
									isActive={categoryId === category.slug}
									subCategoryId={subCategoryId}
									historyLocation={location.search}
									stockId={stockId}
									categories={categories}
									query={this.props.parsedQuery}
								/>
							)}
						</div>
						{gender.length > 0 &&
							<div className={style.SideBar__filter__list}>
								<div className={`${style.SideBar__filter__list__item} ${style.SideBar__filter__list__item_active}`}>Пол</div>
								<div className={`${style.SideBar__filter__sublist} ${style.SideBar__filter__sublist_active}`}>
									{gender.map(gender => {
										const itemStyle = classNames({
											[`${style.SideBar__filter__sublist__item}`]: true,
											[`${style.SideBar__filter__sublist__item_active}`]: sex === genderSize[gender][0].sex.name
										})
										return <div onClick={() => url(genderSize[gender][0].sex.name)} key={gender} className={itemStyle}>{gender}</div>
									})}
								</div>
							</div>
						}
						{brands.brands && !isMobile &&
							<div className={style.SideBar__filter__list}>
								<div className={`${style.SideBar__filter__list__item} ${style.SideBar__filter__list__item_active}`}>Бренд</div>
								<div className={`${style.SideBar__filter__sublist} ${style.SideBar__filter__sublist_active} ${style.SideBar__brands}`} ref={el => { this.brandList = el }}>
									{/* {sortBy(brands.brands, 'name').map((brand, id) => { */}
									{brands.brands.map((brand, id) => {
										const key = `brand-${id}`;
										var array = this.props.brand ? this.props.brand.split(',') : [];
										var index = array.indexOf(brand.name);
										const itemStyle = classNames({
											[`${style.SideBar__filter__sublist__item}`]: true,
											[`${style.SideBar__filter__sublist__item_active}`]: index > -1
										})
										return <div key={key} onClick={() => brandUrl(brand.name, 'brand')} className={itemStyle}>{brand.name}</div>
									})}
								</div>
								{brands.brands.length > 10 &&<div className={style.SideBar__brands__button} onClick={() => this.toggleBrands()}>{brandToogleText}</div>}
							</div>
						}
						{currentSizes && !isMobile && (subCategoryId || categoryId) &&
							<div className={style.SideBar__filter__list}>
								<div className={`${style.SideBar__filter__list__item} ${style.SideBar__filter__list__item_active}`}>Размер</div>
								<div className={`${style.SideBar__filter__sublist} ${style.SideBar__filter__sublist_active} ${style.SideBar__filter__sublist_sizes}`}>
								{sortBy(uniqBy(currentSizes, 'name'), 'name').map((size, id) => {
										const key = `size-${id}`;
										var array = this.props.size ? this.props.size.split(',') : [];
										var index = array.indexOf(size.name);
										const itemStyle = classNames({
											[`${style.SideBar__filter__sublist__item}`]: true,
											[`${style.SideBar__filter__sublist__item_active}`]: index > -1
										})
										
										return <div key={key} onClick={() => brandUrl(size.name, 'size')} className={itemStyle}><p>{size.name}</p></div>
									})}
								</div>
							</div>
						}
						<Link to='/cart' className={`${style.SideBar__filter__list__item} ${style.SideBar__filter__list__item_cart}`}>Перейти в&nbsp;корзину</Link>
						
					</div>
					<Button to='/catalog'>Сбросить</Button>
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
	const parsedQuery = qs.parse(ownProps.location.search);
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
		size,
		parsedQuery,
		sizes,
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
	pushHistory: (value) => dispatch(push(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
