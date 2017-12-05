import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './styles.styl';

const CheckBox = ({ input, item, className, index }) => {
	const styles = classNames({
		[`${style.CheckBox}`]: true,
		[`${className}`]: className,
	})
	return (
		<div className={styles}>
			<input
				className={style.CheckBox__input}
				name={`${input.name}[${index}]`}
				id={item.name ? item.name : item }
				type="checkbox"
				checked={input.value.indexOf(item.name ? item.name : item) !== -1}
				value={item.id ? item.id : item }
				onChange={(event) => {
					const newValue = [...input.value];
					if (event.target.checked) {
						newValue.push(item.name ? item.name : item);
					} else {
						newValue.splice(newValue.indexOf(item.name ? item.name : item), 1);
					}

					return input.onChange(newValue);
				}}
			/>
			<label className={style.CheckBox__label} htmlFor={item.name ? item.name : item}>{item.name ? item.name : item}</label>
		</div>
	);
}

CheckBox.propTypes = {
	input: PropTypes.object.isRequired,
	className: PropTypes.string.isRequired,
	item: PropTypes.any.isRequired
};


export default CheckBox;
