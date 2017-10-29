import React from 'react';
import PropTypes from 'prop-types';

const FilterItem = ({ title, onClick, className }) => (
	<button className={className} onClick={onClick}>
		{title}
	</button>
);

FilterItem.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired
};

export default FilterItem;
