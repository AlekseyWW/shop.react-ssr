import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from 'components/FilterItem';
import style from './styles.styl';

const FilterBlock = ({ items, handleClick, title, type, countView, offset }) => {
	return (
		<div className={style.FilterBlock__item}>
			<span className={style.FilterBlock__title}>
				{title}
			</span>
			{items.map(item => {
				const config = { offset, count: item.name };
				return (
					<FilterItem
						key={item.name}
						title={item.title}
						className={style.FilterBlock__button}
						onClick={() => handleClick(config)}
					/>
				)
			})}
		</div>
	)
};

FilterBlock.propTypes = {
	items: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	countView: PropTypes.any.isRequired,
	offset: PropTypes.any.isRequired
};

export default FilterBlock;
