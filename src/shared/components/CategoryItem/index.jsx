import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './styles.styl';

const CategoryItem = ({ sm, img, name, slug, textPos }) => {
	const styles = classNames({
		[`${style.CategoryItem}`]: true,
		[`${style.CategoryItem_sm}`]: sm,
		[`${style[`CategoryItem_${textPos}`]}`]: textPos
	});
	return (
		<Link to={`/catalog/${slug}`} className={styles}>
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
	slug: PropTypes.string.isRequired,
	textPos: PropTypes.string,
	name: PropTypes.string.isRequired
};

export default CategoryItem;
