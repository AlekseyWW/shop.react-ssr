import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryRow from 'components/CategoryRow';
import { chunk } from 'lodash';

import style from './styles.styl';

class Category extends Component {
	render() {
		const { items, categories } = this.props;
		const currentCategories = chunk(items, 3);
		return (
			<div className={style.Category}>
				<div className={style.Category__list}>
					{currentCategories[1] && <CategoryRow categories={categories} items={currentCategories[1]}/>}
					{currentCategories[0] && <CategoryRow categories={categories} items={currentCategories[0]} sm/>}
				</div>
			</div>
		);
	}
} 

Category.propTypes = {
	items: PropTypes.array.isRequired
};


export default Category;
