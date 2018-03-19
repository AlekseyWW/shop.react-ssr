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

class LoginForm extends Component {
	componentDidMount() {

	}
	render() {
		const { handleSubmit, openRegisterModal } = this.props;
		return (
			<form onSubmit={handleSubmit} className={style.LoginForm}>
				<div className={style.LoginForm__container}>
					<Field
						name="email"
						component={Input}
						type="text"
						className={`${style.LoginForm__input} ${style.LoginForm__input_wide}`}
						label="E-mail"
						validate={[required, email]}
					/>
					<Field
						name="password"
						component={Input}
						type="password"
						className={`${style.LoginForm__input} ${style.LoginForm__input_wide}`}
						label="Введите пароль"
						validate={[required]}
					/>
					<Button type="submit">
					Воити
					</Button>
				</div>
			</form>
		);
	}
}


LoginForm = reduxForm({
	// a unique name for the form
	form: 'login',
	enableReinitialize: true,
	destroyOnUnmount: false
})(LoginForm);

export default LoginForm;

