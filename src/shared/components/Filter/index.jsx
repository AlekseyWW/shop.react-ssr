import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as productsAction from 'actions/products';
import * as paginationAction from '../../state/modules/pagination';
import qs from 'query-string';
import find from 'lodash/find';
import { CrossIcon } from 'components/Icon';

import FilterBlock from 'components/FilterBlock';
import BarFilter from 'components/BarFilter';

import style from './styles.styl';

const filterdata = [
	{
		title: 'показать на странице',
		type: 'count_view',
		items: [
			{
				name: '12',
				title: '12'
			}, {
				name: '48',
				title: '48'
			}, {
				name: '96',
				title: '96'
			}
		]
	}
];

class Filter extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	historyPush = query => {
		const { subCategoryId, categoryId, stockId, history} = this.props;
		const slug = subCategoryId ? `${categoryId}/${subCategoryId}` : categoryId;
		const pathname = slug ? stockId ? `/${stockId}/catalog/${slug}` : `/catalog/${slug}` : stockId ? `/${stockId}/catalog` : `/catalog`;
		history.push({
			pathname,
			search: `${qs.stringify(query)}`
		})
	}
	componentDidMount() {
		const ScrollMagic = require('scrollmagic');
		setTimeout(() => {
			this.scene = new ScrollMagic.Scene({
				offset: window.innerWidth <= 992 ? -40 : 0,
				triggerElement: '#filter',
				triggerHook: 'onLeave',
			})
				.setPin(this.block)
				.setClassToggle(this.block, 'active')
				.addTo(window.controller);
		}, 0);
	}
	handleClick(data) {
		const slug = this.props.subCategoryId ? `${this.props.categoryId}/${this.props.subCategoryId}` : `${this.props.categoryId}`;
		let pathname = ''
		if (slug) {
			if (this.props.stockId) {
				pathname = `/${this.props.stockId}/catalog/${slug}`
			} else {
				`/catalog/${slug}`
			} 
		} else {
			if (this.props.stockId) {
				pathname = `/${this.props.stockId}/catalog`
			} else {
				`/catalog`
			} 
		}
		const requestData = this.props.query ? { ...this.props.query, ...data }: data;
		// this.props.getProducts(requestData, this.props.subCategoryId || this.props.categoryId);
		this.props.history.push({
			pathname,
			search: `${qs.stringify(requestData)}`
		})
	}
	resetForm(name) {
		if (name) {
			this.props.changeForm(name, '')
		} else {
			this.props.changeForm('brand', '')
			this.props.changeForm('size', '')
		}
	}
	removeFilter = (item, type) => {
		const pathname = this.props.location.pathname;

		if (type === 'brand' || type === 'size') {
			var array = this.props[type].split(',');
			var index = array.indexOf(item);
			if (index > -1) {
				array.splice(index, 1);
			}
			const editedQuery = { ...this.props.parsedQuery };
			editedQuery[type] = array.length > 0 ? array.join(',') : '';

			this.props.history.push({
				pathname: pathname,
				search: `${qs.stringify(editedQuery)}`
			})
		}
		if (type === 'sex') {
			var array = this.props[type].split(',');
			var index = array.indexOf(item);
			if (index > -1) {
				array.splice(index, 1);
			}
			const editedQuery = { ...this.props.parsedQuery };
			editedQuery[type] = array.length > 0 ? array.join(',') : '';
			
			this.props.history.push({
				pathname: pathname,
				search: `${qs.stringify(editedQuery)}`
			})
		}
		if (type === 'stockId') {
			const editedQuery = { ...this.props.parsedQuery };

			this.props.history.push({
				pathname: `${pathname}`.replace(`/${item}`, ''),
				search: `${qs.stringify(this.props.parsedQuery)}`
			})
		}
		if (type === 'subCategoryId') {
			const editedQuery = { ...this.props.parsedQuery };

			this.props.history.push({
				pathname: `${pathname}`.replace(`/${item}`, ''),
				search: `${qs.stringify(this.props.parsedQuery)}`
			})
		}
		if (type === 'categoryId') {
			let newPath = `${pathname}`.replace(`/${item}`, '')
			if(this.props.subCategoryId) {
				newPath = `${newPath}`.replace(`/${this.props.subCategoryId}`, '')
			}
			
			const editedQuery = { ...this.props.parsedQuery };

			this.props.history.push({
				pathname: newPath,
				search: `${qs.stringify(this.props.parsedQuery)}`
			})
		}
	}
	render() {
		const { getProducts, allCount, sizes, brands, brand, size, sex, stockId, subCategoryId, categoryId, categories } = this.props;
		const currentSizes = sex && sizes.length > 0 && sizes[0].sex && sizes[0].sex.whom ? _.filter(sizes, b => b.sex.name === sex) : sizes;
		const category = categories && categoryId && find(categories.items, { slug: categoryId }) ? find(categories.items, { slug: categoryId }): null;
		const subCategory = categories && category && subCategoryId && find(category.items, { slug: subCategoryId }) ? find(category.items, { slug: subCategoryId }).name : subCategoryId
		
		return (
			<div className={style.Filter} id="filter">
				<div className={style.Filter__inner} ref={el => this.block = el}>
					{/* <div className={style.Filter__filters}>
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
							if (this.props.location.search !== `?${qs.stringify(query)}`) {
								this.historyPush(query);
								// getProducts(query, this.props.subCategoryId || this.props.categoryId);
							}
						}} />
					</div> */}
					<div className={style.Filter__list}>
						{stockId && <p className={style.Filter__list__item} onClick={() => this.removeFilter(stockId, 'stockId')}><CrossIcon />{stockId}</p>}
						{categoryId && <p className={style.Filter__list__item} onClick={() => this.removeFilter(categoryId, 'categoryId')}><CrossIcon />{category ? category.name : ''}</p>}
						{subCategoryId && <p className={style.Filter__list__item} onClick={() => this.removeFilter(subCategoryId, 'subCategoryId')}><CrossIcon />{subCategory}</p>}
						{brand && brand.length > 0 && brand.split(',').map(item => <p className={style.Filter__list__item} onClick={() => this.removeFilter(item, 'brand')} key={item}><CrossIcon />{item}</p>)}
						{size && size.length > 0 && size.split(',').map(item => <p className={style.Filter__list__item} onClick={() => this.removeFilter(item, 'size')} key={item}><CrossIcon />{item}</p>)}
						{sex && <p className={style.Filter__list__item} onClick={() => this.removeFilter(sex, 'sex')}><CrossIcon />{sex}</p>}
					</div>
					<div className={style.Filter__sorting}>
						{filterdata.map(item => (
							<FilterBlock
								active={this.props.query.count || '12'}
								key={item.title}
								items={item.items}
								title={item.title}
								type={item.type}
								handleClick={this.props.handleChange}
								countView={this.props.query.countView || 12}
								offset={this.props.query.offset || 0}
							/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

Filter.propTypes = {
	getProducts: PropTypes.func.isRequired,
	allCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const { brand, size, sex } = qs.parse(ownProps.location.search);
	const parsedQuery = qs.parse(ownProps.location.search);
	
	const brands = state.brands;
	const { sizes } = state.products;
	const { categories } = state.category;
	const { categoryId, subCategoryId, stockId } = ownProps.match.params;
	const query = qs.parse(ownProps.location.search);
	return { categoryId, parsedQuery, subCategoryId, stockId, query, brands, brand, size, sex, sizes, categories };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { categoryId } = ownProps;
	return ({
		getProducts: data => dispatch(productsAction.getProducts(data, categoryId)),
		changeForm: (field, value) => dispatch(change('filter', field, value)),
		setPagination: (offset, countView) => dispatch(paginationAction.setPagination(offset, countView))
	});
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
