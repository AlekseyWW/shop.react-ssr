import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import style from './styles.styl';

const CategoryItem = ({ sm, img, name, textPos, brand, category, categories, size, sex, customCategory }) => {
	const styles = classNames({
		[`${style.CategoryItem}`]: true,
		[`${style.CategoryItem_sm}`]: sm,
		[`${style[`CategoryItem_${textPos}`]}`]: textPos,
	});
	
	const queryBrands =
		brand && brand.length && brand.length > 0 ? brand.map(item => item.name) : [];
	const search = qs.stringify({
		brand: brand ? brand.name || queryBrands : '',
		size: size || '',
		sex: sex ? sex.name || '' : '',
	});
	const getSlug = (name) => {
		const category = _.find(categories, b => b.slug === name || typeof _.find(b.items, b => b.slug === name) !== 'undefined');
		const slug = category ? category.slug === name ? `${category.slug}` : `${category.slug}/${_.find(category.items, b => b.slug === name).slug}` : '';
		return slug;
	}
	return (
		<Link
			to={{
				pathname: category ? customCategory ? `${customCategory.slug}/catalog/${getSlug(category.slug)}` : `/catalog/${getSlug(category.slug)}` : customCategory ? `${customCategory.slug}/catalog` : '/catalog',
				search,
			}}
			className={styles}>
			<div className={style.CategoryItem__inner} style={{ backgroundImage: `url(${img})` }}>
				<p className={style.CategoryItem__title}>{name}</p>
			</div>
		</Link>
	);
};

CategoryItem.defaultProps = {
	textPos: 'left-top',
};

CategoryItem.propTypes = {
	sm: PropTypes.bool.isRequired,
	img: PropTypes.string.isRequired,
	textPos: PropTypes.string,
	name: PropTypes.string.isRequired,
};

export default CategoryItem;
