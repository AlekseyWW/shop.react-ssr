import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import CheckBox from 'components/CheckBox';
import style from './styles.styl';

let BarFilter = (props) => {
	const { handleSubmit, brands, sm } = props;
	console.log('====================================');
	console.log(style.BarFilter__itemSm);
	console.log('====================================');
	return (
		<form onSubmit={handleSubmit} className={style.BarFilter}>
			<div className={style.BarFilter__list}>
				{brands.map(brand => (<Field
					name="brand"
					component={CheckBox}
					item={brand}
					key={brand.id}
					type="checkbox"
					className={sm ? style.BarFilter__itemSm : ''}
				/>))}
			</div>
		</form>
	);
};
BarFilter.defaultProps = {
	sm: false
}
BarFilter.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	sm: PropTypes.bool,
	brands: PropTypes.array.isRequired
};

export default BarFilter = reduxForm({
	// a unique name for the form
	form: 'filter'
})(BarFilter);

