import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import _ from 'lodash';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import { withRouter } from 'react-router'
import style from './styles.styl';
import { DownArrow } from 'components/Icon';
import qs from 'query-string';

class BarFilter extends Component {
	constructor(props) {
		super(props);
		this.toogleBrands = this.toogleBrands.bind(this)
	}
	state = {
		isBrandOpen: false
	}
	toogleBrands() {
		this.setState({
			isBrandOpen : !this.state.isBrandOpen
		})
	}
	render() {
		const { handleSubmit, brands, sizes, selectedBrands, selectedSizes, sm } = this.props;
		const genderSize = _.groupBy(sizes, 'sex');
		const gender = Object.keys(genderSize);
		const dropdownCLass = classNames({
			[`${style.BarFilter__dropdown}`]: true,
			[`${style.BarFilter__dropdown_active}`]: this.state.isBrandOpen
		})
		const toogleStyle = classNames({
			[`${style.BarFilter__brand}`]: true,
			[`${style.BarFilter__brand_active}`]: this.state.isBrandOpen,
		})
		return (
			<form onSubmit={handleSubmit} className={style.BarFilter}>
				<div className={style.BarFilter__item}>
					<Dropdown
						title="Бренды"
						onClose={this.props.handleSubmit}
						count={selectedBrands && selectedBrands.length > 0 && selectedBrands.length}
						inner={
							<div>
								{brands.map((brand, id) => (<Field
									name="brand"
									component={CheckBox}
									options={brands}
									index={id}
									item={brand}
									key={brand.id}
									type="checkbox"
									className={sm ? style.BarFilter__itemSm : ''}
								/>))}
							</div>
						}
					/>
				</div>
				<div className={style.BarFilter__item}>
					<Dropdown
						title="Размеры"
						onClose={this.props.handleSubmit}
						count={selectedSizes && selectedSizes.length > 0 && selectedSizes.length}
						inner={
							<div>
								{sizes.map((size, id) => (<Field
									name="size"
									component={CheckBox}
									item={size}
									key={size.id}
									index={id}
									type="checkbox"
									className={sm ? style.BarFilter__itemSm : ''}
								/>))}
							</div>
						}
					/>
				</div>
				<Button text="сбросить" className={style.SideBar__button} onClick={this.props.resetForm} />
			</form>
		)
	}
};
BarFilter.defaultProps = {
	sm: false
}
BarFilter.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	sm: PropTypes.bool,
	brands: PropTypes.array.isRequired,
	sex: PropTypes.array.isRequired,
	sizes: PropTypes.array.isRequired
};

BarFilter = reduxForm({
	// a unique name for the form
	form: 'filter',
	enableReinitialize: true,
	destroyOnUnmount: false
})(BarFilter);

const selector = formValueSelector('filter');
const mapStateToProps = (state, ownProps) => {
	let { brand, size, sex } = qs.parse(ownProps.location.search);
	brand = brand ? brand.split(',') : [];
	size = size ? size.split(',') : [];
	sex = sex ? sex.split(',') : [];
	const selectedBrands = selector(state, 'brand');
	const selectedSizes = selector(state, 'size');
	return {
		initialValues: { brand, size, sex },
		selectedSizes,
		selectedBrands,
		sex
	}
};

export default withRouter(connect(mapStateToProps)(BarFilter));

