import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Button from 'components/Button';
import { withRouter } from 'react-router'
import style from './styles.styl';
import qs from 'query-string';

let BarFilter = (props) => {
	const { handleSubmit, brands, sizes, sm } = props;
	return (
		<form onSubmit={handleSubmit} className={style.BarFilter}>
			<div className={style.BarFilter__item}>
				<div className={style.BarFilter__label}>
					Бренд
				</div>
				<div className={style.BarFilter__list}>
					{brands.map((brand, id) => (<Field
						name="brand"
						component={CheckBox}
						item={brand}
						index={id}
						key={brand.id}
						type="checkbox"
						className={sm ? style.BarFilter__itemSm : ''}
					/>))}
				</div>
			</div>
			<div className={style.BarFilter__item}>
				<div className={style.BarFilter__label}>
					Размеры
				</div>
				<div className={style.BarFilter__list}>
					{sizes.map((size, id) => (<Field
						name="size"
						component={CheckBox}
						item={size}
						key={size}
						index={id}
						type="checkbox"
						className={sm ? style.BarFilter__itemSm : ''}
					/>))}
				</div>
			</div>
			<Button text="применить" className={style.SideBar__button} type="submit" />
		</form>
	);
};
BarFilter.defaultProps = {
	sm: false
}
BarFilter.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	sm: PropTypes.bool,
	brands: PropTypes.array.isRequired,
	sizes: PropTypes.array.isRequired
};

BarFilter = reduxForm({
	// a unique name for the form
	form: 'filter',
	destroyOnUnmount: false
})(BarFilter);

const mapStateToProps = (state, ownProps) => {
	let { brand, size } = qs.parse(ownProps.location.search);
	brand = brand ? brand.split(',') : [];
	size = size ? size.split(',') : [];
	return {
		initialValues: { brand, size }
	}
};

export default withRouter(connect(mapStateToProps)(BarFilter));

