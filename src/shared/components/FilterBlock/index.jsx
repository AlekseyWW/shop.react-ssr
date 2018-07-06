import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FilterItem from 'components/FilterItem';
import style from './styles.styl';

const FilterBlock = ({ items, handleClick, title, offset, active }) => {
	return (
		<div className={style.FilterBlock__item}>
			<span className={style.FilterBlock__title}>{title}</span>
			{items.map(item => {
				const config = { offset, count: item.name };
				const itemClass = classNames(style.FilterBlock__button, {
					[style.FilterBlock__button_active]: item.name === active,
				});
				return (
					<FilterItem
						key={item.name}
						title={item.title}
						className={itemClass}
						onClick={() => handleClick(config)}
					/>
				);
			})}
		</div>
	);
};

FilterBlock.propTypes = {
	items: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	countView: PropTypes.any.isRequired,
	offset: PropTypes.any.isRequired,
};

export default FilterBlock;
