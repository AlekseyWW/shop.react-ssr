import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as categoryAction from 'actions/category';
import CategoryRow from 'components/CategoryRow';
import { chunk } from 'lodash';

import style from './styles.styl';

class Category extends Component {
	componentDidMount() {
		const { isLoaded, isLoading, items, getCategories } = this.props;
		if (!isLoaded && !isLoading) getCategories();
	}
	render() {
		const { isLoaded, isLoading, items, getCategories } = this.props;
		const categories = chunk(items, 3);
		console.log('====================================');
		console.log(items);
		console.log('====================================');
		return (
			<div className={style.Category}>
				<div className={style.Category__list}>
					{categories[1] && <CategoryRow items={categories[1]}/>}
					{categories[0] && <CategoryRow items={categories[0]} sm/>}
				</div>
			</div>
		);
	}
} 

Category.propTypes = {
	isLoaded: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	getCategories: PropTypes.any.isRequired,
	items: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	const { isLoaded, isLoading, items } = state.category.promoCategories;
	return { isLoaded, isLoading, items };
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getPromoCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
