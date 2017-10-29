import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './styles.styl';

const CheckBox = ({ input, item, className }) => {
	const styles = classNames({
		[`${style.CheckBox}`]: true,
		[`${className}`]: className,
	})
	return (
		<div className={styles}>
			<input
				className={style.CheckBox__input}
				name={input.name}
				id={item.title}
				type="checkbox"
				checked={input.value.indexOf(item.id) !== -1}
				value={item.id}
				onChange={(event) => {
					const newValue = [...input.value];
					if (event.target.checked) {
						newValue.push(item.id);
					} else {
						newValue.splice(newValue.indexOf(item.id), 1);
					}

					return input.onChange(newValue);
				}}
			/>
			<label className={style.CheckBox__label} htmlFor={item.title}>{item.name}</label>
		</div>
	);
}

CheckBox.propTypes = {
	input: PropTypes.object.isRequired,
	className: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired
};


export default CheckBox;
