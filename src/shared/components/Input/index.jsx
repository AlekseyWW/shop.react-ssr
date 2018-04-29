import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import Textarea from 'react-textarea-autosize';
import style from './styles.styl';

const Input = ({
	input,
	type,
	meta,
	className,
	textArea,
	numberFormat,
	label,
	fullWidth,
	email,
	...rest
}) => {
	const styleWrapper = classNames({
		Input: true,
		[style.Input_focused]: meta && meta.active,
		[style.Input_value]: input && input.value,
		[style.Input_error]: meta && meta.touched && meta.error,
		[style.Input_valid]: meta && meta.touched && meta.valid,
		[style.Input_fullWidth]: fullWidth,
		[style.Input_textarea]: textArea,
		[`${className}`]: className,
	});
	const styleInput = classNames({
		[style.Input__field]: true,
	});
	return (
		<div className={styleWrapper}>
			<label htmlFor={input.name} className="Input__label">
				{label}
			</label>
			{meta.touched &&
				((meta.error && <span className={style.Input__error}>{meta.error}</span>) ||
					(meta.warning && <span className={style.Input__error}>{meta.warning}</span>))}
			{textArea || numberFormat || email ? (
				(textArea && <Textarea {...input} {...rest} />) ||
				(numberFormat && (
					<InputElement
						mask="+9 999 999-99-99"
						type={type || 'text'}
						className={styleInput}
						{...input}
						{...rest}
					/>
				)) ||
				(email && (
					<InputElement
						type={type || 'text'}
						className={styleInput}
						{...input}
						{...rest}
					/>
				))
			) : (
					<InputElement type={type || 'text'} className={styleInput} {...input} {...rest} />
				)}
			
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
