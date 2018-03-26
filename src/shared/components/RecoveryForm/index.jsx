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

class RecoveryForm extends Component {
	componentDidMount() {

	}
	render() {
		const { handleSubmit, openRegisterModal } = this.props;
		return (
			<form onSubmit={handleSubmit} className={style.RecoveryForm}>
				<div className={style.RecoveryForm__container}>
					<Field
						name="oldPassword"
						component={Input}
						type="password"
						className={`${style.RecoveryForm__input} ${style.RecoveryForm__input_wide}`}
						label="Текущий пароль"
						validate={[required]}
					/>
					<Field
						name="password"
						component={Input}
						type="password"
						className={`${style.RecoveryForm__input} ${style.RecoveryForm__input_wide}`}
						label="Новый пароль"
						validate={[required]}
					/>
					<Field
						name="rePassword"
						component={Input}
						type="password"
						className={`${style.RecoveryForm__input} ${style.RecoveryForm__input_wide}`}
						label="Подтвердите пароль"
						validate={[required]}
					/>
					<Button type="submit">
					Сохранить
					</Button>
				</div>
			</form>
		);
	}
}


RecoveryForm = reduxForm({
	// a unique name for the form
	form: 'recovery',
	enableReinitialize: true,
	destroyOnUnmount: false
})(RecoveryForm);

export default RecoveryForm;

