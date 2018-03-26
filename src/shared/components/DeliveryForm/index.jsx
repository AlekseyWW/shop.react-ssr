import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import Select from 'components/Select';
import { loadCities, getDeliveryCoast } from '../../state/modules/sdek';
import Button from 'components/Button';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { required, email } from 'utils/validation';

import style from './styles.styl';

class DeliveryForm extends Component {

	state = {
		options: null
	}
	componentDidMount() {
		// this.props.change('city', this.props.initialValues.city[0])
		console.log(this.props.initialValues.city);

		
	}
	getOptions(input, callback) {
		const url = 'http://test-api-shop.abo-soft.com/sdek/cities';
		axios({
			method: 'get',
			url,
			params: { name: input },
		})
			.then(res => {
				const { data } = res;
				callback(null, {
					options: data.map(option => ({ label: option.name, value: option.id }))
				})
			})
			.catch(err => {
				console.log(err.message);
			});
	}
	render() {
		const { handleSubmit, openRegisterModal } = this.props;
		
		return (
			<form onSubmit={handleSubmit} className={style.DeliveryForm}>
				<div className={style.DeliveryForm__container}>
					<div className={style.DeliveryForm__row}>
						<Field
							name="firstName"
							component={Input}
							type="text"
							className={`${style.DeliveryForm__input} ${style.DeliveryForm__input_wide}`}
							label="Имя"
						/>
						<Field
							name="lastName"
							component={Input}
							type="text"
							className={`${style.DeliveryForm__input} ${style.DeliveryForm__input_wide}`}
							label="Фамилия"
						/>
					</div>
					<div className={style.DeliveryForm__row}>
						<Field
							name="city"
							component={Select}
							options={this.props.cities}
							type="text"
							getOptions={this.getOptions}
							className={`${style.DeliveryForm__input} ${style.DeliveryForm__input_wide}`}
							label="Город, населенный пункт*"
						/>
						<Field
							name="postIndex"
							component={Input}
							type="text"
							className={`${style.DeliveryForm__input} ${style.DeliveryForm__input_wide}`}
							label="Почтовый индекс"
						/>
					</div>
					<div className={style.DeliveryForm__row}>
						<Field
							name="address"
							component={Input}
							type="text"
							className={`${style.DeliveryForm__input} ${style.DeliveryForm__input_wide}`}
							label="Адрес (улица, дом, строение, квартира)"
						/>
					</div>
					<div className={style.DeliveryForm__row}>
						<div className={style.DeliveryForm__button}>
							<Button type="submit">
								Сохранить
							</Button>
						</div>
					</div>
				</div>
			</form>
		);
	}
}


DeliveryForm = reduxForm({
	// a unique name for the form
	form: 'delivery',
	enableReinitialize: true,
	destroyOnUnmount: false
})(DeliveryForm);

export default DeliveryForm;

