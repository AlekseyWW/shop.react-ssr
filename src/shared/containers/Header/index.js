import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderInfo from 'components/HeaderInfo';
import { connect } from 'react-redux';
import Menu from 'containers/Menu';
import LogoLine from 'components/LogoLine';
import headerData from 'config/header';
import * as categoryAction from 'actions/category';
import style from './styles.styl';

class Header extends Component { 
	componentDidMount() {
		const { isLoaded, isLoading, getCategories } = this.props;
		if (!isLoaded && !isLoading) getCategories();
	}
	render() {
		const { items } = this.props;
		return (
			<div className={style.Header}>
				<HeaderInfo data={headerData} />
				<LogoLine />
			</div>
		);
	}
}

Header.propTypes = {
	items: PropTypes.array.isRequired,
	getCategories: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
	const { isLoaded, isLoading, items } = state.category.categories;
	return { isLoaded, isLoading, items };
};

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(categoryAction.getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
