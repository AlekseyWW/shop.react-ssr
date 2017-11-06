import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './styles.styl';

const Button = ({ text, className, disabled, children, onClick, small }) => {
	const buttonStyle = classNames({
		[`${style.Button}`]: true,
		[`${style.Button_disabled}`]: disabled,
		[`${style.Button_small}`]: small,
		[`${className}`]: className
	})
	return (
		<button className={buttonStyle} onClick={onClick}>
			{text && text}
			{children && children}
		</button>
	)
}

Button.defaultProps = {
	text: '',
	classnames: '',
	onClick: () => {},
	disabled: false,
	small: false
}
Button.propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	small: PropTypes.bool
};

export default Button;
