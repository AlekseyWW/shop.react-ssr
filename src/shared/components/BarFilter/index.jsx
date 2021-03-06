import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import { withRouter } from 'react-router';
import style from './styles.styl';
import qs from 'query-string';

class BarFilter extends Component {
	constructor(props) {
		super(props);
		this.toogleBrands = this.toogleBrands.bind(this);
	}
	state = {
		isBrandOpen: false,
	};
	toogleBrands() {
		this.setState({
			isBrandOpen: !this.state.isBrandOpen,
		});
	}
	render() {
		const {
			handleSubmit,
			brands,
			sizes,
			selectedBrands,
			selectedSizes,
			sm,
		} = this.props;

		return (
			<form onSubmit={handleSubmit} className={style.BarFilter}>
				<div className={style.BarFilter__item}>
					<Dropdown
						title="Бренды"
						onClose={this.props.handleSubmit}
						buttons={[
							{
								onClick: () => this.props.resetForm('brand'),
								text: 'Сбросить',
							},
							{
								onClick: this.props.handleSubmit,
								text: 'Применить',
							},
						]}
						count={
							selectedBrands &&
							selectedBrands.length > 0 &&
							selectedBrands.length
						}
						inner={
							<div className="Dropdown__inner">
								<div className="Dropdown__head">
									<p>Выберите брэнды:</p>
								</div>
								{brands.map((brand, id) => (
									<Field
										name="brand"
										component={CheckBox}
										options={brands}
										index={id}
										item={brand}
										key={brand.id}
										type="checkbox"
										className={
											sm ? style.BarFilter__itemSm : ''
										}
									/>
								))}
							</div>
						}
					/>
				</div>
				<div className={style.BarFilter__item}>
					<Dropdown
						title="Размеры"
						onClose={this.props.handleSubmit}
						buttons={[
							{
								onClick: e => this.props.resetForm('size', e),
								text: 'Сбросить',
							},
							{
								onClick: this.props.handleSubmit,
								text: 'Применить',
							},
						]}
						count={
							selectedSizes &&
							selectedSizes.length > 0 &&
							selectedSizes.length
						}
						inner={
							<div className="Dropdown__inner">
								<div className="Dropdown__head">
									<p>Выберите размеры:</p>
								</div>
								{sizes.map((size, id) => (
									<Field
										name="size"
										component={CheckBox}
										item={size}
										key={size.id}
										index={id}
										type="checkbox"
										className={
											sm ? style.BarFilter__itemSm : ''
										}
									/>
								))}
							</div>
						}
					/>
				</div>
				<Button
					text="сбросить"
					className={style.SideBar__button}
					onClick={this.props.resetForm}
				/>
			</form>
		);
	}
}
BarFilter.defaultProps = {
	sm: false,
	sizes: [],
};
BarFilter.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	sm: PropTypes.bool,
	brands: PropTypes.array.isRequired,
	sex: PropTypes.array.isRequired,
	sizes: PropTypes.array,
};

BarFilter = reduxForm({
	form: 'filter',
	enableReinitialize: true,
	destroyOnUnmount: false,
})(BarFilter);

const selector = formValueSelector('filter');

const mapStateToProps = (state, ownProps) => {
	const selectedBrands = selector(state, 'brand');
	const selectedSizes = selector(state, 'size');
	let { brand, size, sex } = qs.parse(ownProps.location.search);
	brand = brand ? brand.split(',') : [];
	size = size ? size.split(',') : [];
	sex = sex ? sex.split(',') : [];
	return {
		initialValues: { brand, size, sex },
		selectedSizes,
		selectedBrands,
		sex,
	};
};

export default withRouter(connect(mapStateToProps)(BarFilter));
