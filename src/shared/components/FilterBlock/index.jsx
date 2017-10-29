import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from 'components/FilterItem';
import style from './styles.styl';

const FilterBlock = ({ items, handleClick, title, type, countView, offset }) => (
	<div className={style.FilterBlock__item}>
		<span className={style.FilterBlock__title}>
			{title}
		</span>
		{/* { items.map(item => (
			<FilterItem
				key={item.name}
				title={item.title}
				className={style.FilterBlock__button}
				onClick={() => handleClick({ [`${type}`]: item.name, offset, count: countView })}
			/>
		))} */}
	</div>
);

FilterBlock.propTypes = {
	items: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	countView: PropTypes.number.isRequired,
	offset: PropTypes.number.isRequired
};

export default FilterBlock;
