import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './styles.styl';

const Button = ({ text, className, disabled, children, onClick, small, to }) => {
	const buttonStyle = classNames({
		[`${style.Button}`]: true,
		[`${style.Button_disabled}`]: disabled,
		[`${style.Button_small}`]: small,
		[`${className}`]: className
	})
	const RenderEl = to ? Link : 'button';
	return (
		<RenderEl className={buttonStyle} onClick={onClick} to={to}>
			{text && text}
			{children && children}
		</RenderEl>
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
