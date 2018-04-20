import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HtmlParser from 'react-html-parser';
import style from './styles.styl';

const CheckBox = ({ input, item, className, index, type, meta, single}) => {
	const styles = classNames({
		[`${style.CheckBox}`]: true,
		[`${style.CheckBox_error}`]: meta && meta.touched && meta.error,
		[`${className}`]: className,
	})
	let onChange = type !== 'option' ? (event) => {
		const newValue = [...input.value];
		if (event.target.checked) {
			newValue.push(item.name ? item.name : item);
		} else {
			newValue.splice(newValue.indexOf(item.name ? item.name : item), 1);
		}
		return input.onChange(newValue);
	} : (event) => {
		return input.onChange(item.id);
	}
	let isChecked = (type !== 'option' && !single) ?
		input.value.indexOf(item.name ? item.name : item) !== -1 :
		input.value === item.id;
	let name = type !== 'option' ? `${input.name}[${index}]` : input.name
	if (single) {
		name = input.name;
		onChange = (event) => {
			const val = !input.value ? true : false;
			return input.onChange(val);
		}
		isChecked = input.value ? true : false;
	}
	return (
		<div className={styles}>
			<input
				className={style.CheckBox__input}
				name={name}
				id={item.name ? item.name : item }
				type="checkbox"
				checked={isChecked}

				value={item.id ? item.id : item }
				onChange={(event) => {
					onChange(event)
				}}
			/>
			<label className={style.CheckBox__label} htmlFor={item.name ? item.name : item}>
				{HtmlParser(item.name ? item.name : item)}
				{item.price && <span>{item.price}</span>}
				{/* {item.id === 'post' && <span className={style.CheckBox__note} >При выборе доставки почты россии, стоимость уточняется у администрации магазина, после оформления заказа</span>} */}
			</label>
		</div>
	);
}

CheckBox.defaultProps = {
	className: '',
	single: false,
};

CheckBox.propTypes = {
	input: PropTypes.object.isRequired,
	className: PropTypes.string,
	single: PropTypes.bool,
	item: PropTypes.any.isRequired
};


export default CheckBox;
