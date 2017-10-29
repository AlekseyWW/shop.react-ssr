import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as productsAction from 'actions/products';
import FilterBlock from 'components/FilterBlock';

import style from './styles.styl';

const filterdata = [
	{
		title: 'показать на странице',
		type: 'count_view',
		items: [
			{
				name: '50',
				title: '50'
			}, {
				name: '100',
				title: '100'
			}, {
				name: 'all',
				title: 'Все'
			}
		]
	},
	{
		title: 'сортировать',
		type: 'sort',
		items: [
			{
				name: 'new',
				title: 'Новый товар'
			}, {
				name: 'price',
				title: 'По цене'
			},
		]
	},
];

const Filter = ({ getProducts, allCount, offset, countView }) => (
	<div className={style.Filter}>
		<div className={style.Filter__filters}>
			<div className={style.Filter__filters__item}>
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
			</div>
		</div>
		<div className={style.Filter__sorting}>
			{filterdata.map(item => (
				<FilterBlock
					key={item.title}
					items={item.items}
					title={item.title}
					type={item.type}
					handleClick={getProducts}
					countView={countView}
					offset={offset}
				/>
			))}
		</div>
	</div>
);

Filter.propTypes = {
	getProducts: PropTypes.func.isRequired,
	allCount: PropTypes.number.isRequired,
	offset: PropTypes.number.isRequired,
	countView: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
	const { offset, countView } = state.products;
	return { offset, countView };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { categoryId } = ownProps;
	return ({
		getProducts: data => dispatch(productsAction.getProducts(categoryId, data))
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
