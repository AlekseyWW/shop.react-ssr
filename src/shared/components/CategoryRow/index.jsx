import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from 'components/CategoryItem';
import style from './styles.styl';

const CategoryRow = ({ sm, items }) => (
	<div className={style.CategoryRow}>
		{ items.map(item => <CategoryItem key={item.id} {...item} sm={sm} />)}
	</div>
);

CategoryRow.propTypes = {
	sm: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
};

export default CategoryRow;
