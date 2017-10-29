import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ items }) => (
	<div className="Breadcrumbs">
		{ items.map(item => <Link key={item.link} to={item.link}>{item.name}</Link>) }
	</div>
);

Breadcrumbs.propTypes = {
	items: PropTypes.array.isRequired
};

export default Breadcrumbs;
