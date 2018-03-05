import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as productsAction from 'actions/products';
import * as paginationAction from '../../state/modules/pagination';
import qs from 'query-string';
import FilterBlock from 'components/FilterBlock';

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
		this.props.getProducts(requestData, this.props.subCategoryId || this.props.categoryId);
		this.props.history.push({
			pathname,
			search: `${qs.stringify(requestData)}`
		})
	}
	render() {
		const { getProducts, allCount } = this.props;
		return (
			<div className={style.Filter}>
				<div className={style.Filter__filters}>
					{/* <div className={style.Filter__filters__item}>
				Кроссовки
			</div>
			<div className={style.Filter__filters__item}>
				Кеды
			</div>
			<div className={style.Filter__filters__item}>
				Мужчины
			</div>
			<div className={style.Filter__filters__item}>
				adidas Consortium
			</div>
			<div className={style.Filter__filters__item}>
				Nike
			</div>
			<div className={style.Filter__filters__item}>
				Jordan
			</div>
			<div className={style.Filter__filters__item}>
				46 EU
			</div> */}
				</div>
				<div className={style.Filter__sorting}>
					{filterdata.map(item => (
						<FilterBlock
							active={this.props.query.count || 12}
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
		)
	}
}

Filter.propTypes = {
	getProducts: PropTypes.func.isRequired,
	allCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const { categoryId, subCategoryId, stockId } = ownProps.match.params;
	const query = qs.parse(ownProps.location.search);
	return { categoryId, subCategoryId, stockId, query };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { categoryId } = ownProps;
	return ({
		getProducts: data => dispatch(productsAction.getProducts(data, categoryId)),
		setPagination: (offset, countView) => dispatch(paginationAction.setPagination(offset, countView))
	});
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
