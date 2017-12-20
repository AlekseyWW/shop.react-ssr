import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BarFilter from 'components/BarFilter/';
import Button from 'components/Button/';
import { Link } from 'react-router-dom';

import style from './styles.styl';

const BarItem = ({ category, isActive, subCategoryId, historyLocation }) => {
	const styles = classNames({
		[`${style.SideBar__filter__list__item}`]: true,
		[`${style.SideBar__filter__list__item_active}`]: isActive,
	})
	const subStyles = classNames({
		[`${style.SideBar__filter__sublist}`]: true,
		[`${style.SideBar__filter__sublist_active}`]: isActive,
	})
	console.log('====================================');
	console.log(historyLocation);
	console.log('====================================');
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

const SideBar = ({ categories, brands, getProducts, categoryId, sizes, subCategoryId, title, historyPush, historyLocation }) => (
	<div className={style.SideBar}>
		<div className={style.SideBar__filter}>
			<div className={style.SideBar__filter__item}>
				<div className={style.SideBar__filter__title}>
					{title}
				</div>
				<div className={style.SideBar__filter__list}>
					{categories.map(category => <BarItem category={category} key={category.id} className={style.SideBar__filter__list__item} isActive={categoryId === category.slug} subCategoryId={subCategoryId} historyLocation={historyLocation}/>) }
				</div>
			</div>
			<div className={style.SideBar__filter__item}>
				<BarFilter brands={brands} sizes={sizes} onSubmit={(data) => {
					const query = {};
					Object.keys(data).forEach(element => {
						query[element] = data[element].join(',')
					});
					historyPush(query);
					getProducts(query, subCategoryId || categoryId);
				} } />
			</div>
		</div>
	</div>
);
SideBar.propTypes = {
	categories: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	historyPush: PropTypes.func.isRequired,
	categoryId: PropTypes.string.isRequired,
	subCategoryId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	sizes: PropTypes.array.isRequired,
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
