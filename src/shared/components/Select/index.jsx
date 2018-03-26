import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import style from './styles.styl';

class Input extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	componentDidMount() {
		console.log('value', this.select);
		if (this.props.input.value) {
			
			// this.handleChange(this.props.input.value)
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.input.value && this.props.input.value.length) {
			console.log('props', this.props);

			// this.handleChange(this.props.input.value)
		}
	}
	handleChange = (selectedOption) => {
		
		const selected = selectedOption.map(item => item.value)
		this.props.input.onChange(selected)
	}
	remove = (item) => {
		const valArray = [...this.props.input.value];
		valArray.splice(valArray.indexOf(item), 1)
		this.props.input.onChange(valArray)
	}
	render () {	
		const {
			input,
			type,
			meta,
			className,
			textArea,
			numberFormat,
			label,
			getOptions,
			options,
			fullWidth,
			multi,
			email,
			...rest
		} = this.props;
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
				{getOptions ?
					<VirtualizedSelect
						value={input.value.label}
						className={styleInput}
						async
						ref={el => this.select = el}
						loadOptions={getOptions}
						{...input}
						onBlur={() => input.onBlur(input.value)}
						{...rest}
					/> :
					<div className={style.MultiSelect}>
						{/* <div className={style.MultiSelect__values}>
							{input.value && input.value.map((item,id) => {
								const key = `item${id}`;
								return (
									<div key={key}>
										<span onClick={() => this.remove(item)}>X</span>
										<span>{item}</span>
									</div>
								)
							})}
						</div> */}
						<Select
							options={options}
							multi={multi}
							{...input}
							onChange={this.handleChange}
							onBlur={() => input.onBlur(input.value)}
							{...rest}
						/>
					</div>
				}
			</div>
		);
	}
}

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
