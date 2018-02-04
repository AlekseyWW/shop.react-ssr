import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import style from './styles.styl';

const Input = ({
	input,
	type,
	meta,
	className,
	textArea,
	numberFormat,
	label,
	getOptions,
	fullWidth,
	email,
	...rest
}) => {
	const styleWrapper = classNames({
		SelectField: true,
		[style.SelectField_focused]: meta && meta.active,
		[style.SelectField_value]: input && input.value,
		[style.SelectField_error]: meta && meta.touched && meta.error,
		[style.SelectField_valid]: meta && meta.touched && meta.valid,
		[style.SelectField_fullWidth]: fullWidth,
		[style.SelectField_textarea]: textArea,
		[`${className}`]: className,
	});
	const styleInput = classNames({
		[style.SelectField__field]: true,
	});
	return (
		<div className={styleWrapper}>
			<label htmlFor={input.name} className="SelectField__label">
				{label}
			</label>
			<VirtualizedSelect
				value={input.value.label}
				className={styleInput}
				async
				loadOptions={getOptions}
				{...input}
				onBlur={() => input.onBlur(input.value)}
				{...rest}
			/>
		</div>
	);
};

Input.propTypes = {
	input: PropTypes.any,
	type: PropTypes.any,
	meta: PropTypes.any,
	label: PropTypes.any,
	numberFormat: PropTypes.bool,
	className: PropTypes.any,
	fullWidth: PropTypes.bool,
	textArea: PropTypes.bool,
	email: PropTypes.bool,
};

export default Input;
