import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BarFilter from 'components/BarFilter/';
import { Link } from 'react-router-dom';

import style from './styles.styl';

const BarItem = ({ category, isActive, subCategoryId }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: isActive,
	})
	return (
		<div>
			<Link to={`/catalog/${category.name}`} key={category.id} className={styles}>{category.name}</Link>
			<div className={subStyles}>
				{ category.items.map(item => {
						const itemStyles = classNames({
							[`${style.SideBar__filter__list__item}`]: true,
							[`${style.SideBar__filter__list__item_active}`]: subCategoryId === item.name,
						});
						return <Link to={`/catalog/${category.name}/${item.name}`} key={item.id} className={itemStyles}>{item.name}</Link>
					})
				}
				</div>
		</div>
	);
}
const brandsArray = [
	{
		"name": 'adidas Consortium',
		"id": 1
	},
	{
		"name": 'adidas Originals',
		"id": 2
	},
	{
		"name": 'adidas Spezial',
		"id": 3
	},
	{
		"name": 'adidas x Raf Simons',
		"id": 4
	},
	{
		"name": 'ASICS Diadora',
		"id": 5
	},
	{
		"name": 'Converse',
		"id": 6
	},
	{
		"name": 'Diadora Heritage Filling Pieces',
		"id": 7
	},
	{
		"name": 'Jordan',
		"id": 8
	},
	{
		"name": 'New Balance',
		"id": 9
	},
	{
		"name": 'Nike',
		"id": 10
	},
	{
		"name": 'Puma ',
		"id": 11
	},
	{
		"name": 'Reebok',
		"id": 12
	},
	{
		"name": 'Vans',
		"id": 13
	}
];
const sizesArray = [
	{
		"name": "33 EU",
		"id": 1
	},
	{
		"name": "34 EU",
		"id": 2
	},
	{
		"name": "34.5 EU",
		"id": 3
	},
	{
		"name": "35 EU",
		"id": 4
	},
	{
		"name": "35.5 EU",
		"id": 5
	},
	{
		"name": "36 EU",
		"id": 6
	},
	{
		"name": "36.5 EU",
		"id": 7
	},
	{
		"name": "37 EU",
		"id": 8
	},
	{
		"name": "37.5 EU",
		"id": 9
	},
	{
		"name": "38 EU",
		"id": 10
	},
	{
		"name": "38.5 EU",
		"id": 11
	},
	{
		"name": "39 EU",
		"id": 12
	},
	{
		"name": "39.5 EU",
		"id": 13
	},
	{
		"name": "40 EU",
		"id": 14
	},
	{
		"name": "40.5 EU",
		"id": 15
	},
	{
		"name": "41 EU",
		"id": 16
	},
	{
		"name": "41.5 EU",
		"id": 17
	},
	{
		"name": "42 EU",
		"id": 28
	},
	{
		"name": "42.5 EU",
		"id": 29
	},
	{
		"name": "43 EU",
		"id": 18
	},
	{
		"name": "43.5 EU",
		"id": 19
	},
	{
		"name": "44 EU",
		"id": 20
	},
	{
		"name": "44.5 EU",
		"id": 21
	},
	{
		"name": "45 EU",
		"id": 22
	},
	{
		"name": "45.5 EU",
		"id": 23
	}, 
	{
		"name": "46 EU",
		"id": 24
	},
	{
		"name": "47 EU",
		"id": 25
	},
	{
		"name": "47.5 EU",
		"id": 26
	}
];
const SideBar = ({ categories, brands, getProducts, categoryId, subCategoryId, title }) => (
	<div className={style.SideBar}>
		<div className={style.SideBar__filter}>
			<div className={style.SideBar__filter__item}>
				<div className={style.SideBar__filter__title}>
					{title}
				</div>
				<div className={style.SideBar__filter__list}>
					{ categories.map(category => <BarItem category={category} to={`/catalog/${category.name}`} key={category.id} className={style.SideBar__filter__list__item} isActive={categoryId === category.name} subCategoryId={subCategoryId} />) }
				</div>
			</div>
			<div className={style.SideBar__filter__item}>
				<div className={style.SideBar__filter__label}>
					Бренд
				</div>
				<BarFilter brands={brandsArray} onSubmit={getProducts} />
			</div>
			<div className={style.SideBar__filter__item}>
				<div className={style.SideBar__filter__label}>
					Размер
				</div>
				<BarFilter brands={sizesArray} onSubmit={getProducts} sm />
			</div>

			<button className={style.SideBar__button} type="submit">Применить</button>
		</div>
	</div>
);
SideBar.propTypes = {
	categories: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	categoryId: PropTypes.string.isRequired,
	subCategoryId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	brands: PropTypes.array.isRequired
};

BarItem.defaultProps = {
	subCategoryId: ''
};

BarItem.propTypes = {
	isActive: PropTypes.bool.isRequired,
	category: PropTypes.object.isRequired,
	subCategoryId: PropTypes.string
};
export default SideBar;
