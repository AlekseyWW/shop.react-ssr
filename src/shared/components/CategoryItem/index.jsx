import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import style from './styles.styl';

const CategoryItem = ({ sm, img, name, textPos, brand, category, size, sex }) => {
	const styles = classNames({
		[`${style.CategoryItem}`]: true,
		[`${style.CategoryItem_sm}`]: sm,
		[`${style[`CategoryItem_${textPos}`]}`]: textPos
	});
	const search = qs.stringify({
		brand: brand || '',
		size: size|| '',
		sex: sex.name || ''
	})
	return (
		<Link to={{
			pathname: `/catalog/${category.slug}`,
				search
			}}
			className={styles}>
			<div className={style.CategoryItem__inner} style={{ backgroundImage: `url(${img})` }}>
				<p className={style.CategoryItem__title}>{name}</p>
			</div>
		</Link>
	);
};

CategoryItem.defaultProps ={
	textPos: 'left-top'
};

CategoryItem.propTypes = {
	sm: PropTypes.bool.isRequired,
	img: PropTypes.string.isRequired,
	textPos: PropTypes.string,
	name: PropTypes.string.isRequired
};

export default CategoryItem;
