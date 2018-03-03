import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from 'components/CategoryItem';
import style from './styles.styl';

const CategoryRow = ({ sm, items, categories }) => (
	<div className={style.CategoryRow}>
		{items.map(item => <CategoryItem key={item.name} categories={categories} {...item} sm={sm} />)}
	</div>
);
CategoryRow.defaultProps = {
	sm: false
}
CategoryRow.propTypes = {
	sm: PropTypes.bool,
	items: PropTypes.array.isRequired
};

export default CategoryRow;
