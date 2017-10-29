import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './styles.styl';

class Input extends Component {
	static propTypes = {
		placeholder: PropTypes.string,
		Icon: PropTypes.any,
	}
	static defaultProps = {
		placeholder: 'Введите текст',
		Icon: null,
	};
	state = {
		value: '',
		isFocused: false
	}
	render() {
		const { placeholder, Icon, className } = this.props;
		const inputClass = classNames({
			[`${style.Input}`]: true,
			[`${style.Input_focused}`]: this.state.isFocused,
			[`${style.Input_value}`]: this.state.value,
			[`${className}`]: className
		});
		return (
			<div className={inputClass}>
				<input
					value={this.state.value}
					onChange={
						e => this.setState({ value: e.target.value })
					}
					onFocus={() => this.setState({ isFocused: true })}
					onBlur={() => this.setState({ isFocused: false })}
					className={style.Input__input}
					type="text"
					name="search"
				/>
				<span className={style.Input__placeholder}>
					{ Icon && <Icon className={style.Input__icon} /> }
					{ placeholder }
				</span>
			</div>
		);
	}
}

Input.defaultProps = {
	placeholder: 'Введите текст',
	className: '',
};

Input.propTypes = {
	placeholder: PropTypes.string,
	className: PropTypes.string,
};

export default Input;
