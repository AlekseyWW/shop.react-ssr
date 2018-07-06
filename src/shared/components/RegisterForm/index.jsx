import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';
import Button from 'components/Button';
import { required, email } from 'utils/validation';

import style from './styles.styl';

class RegisterForm extends Component {
	componentDidMount() {}
	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit} className={style.RegisterForm}>
				<div className={style.RegisterForm__container}>
					<Field
						name="email"
						component={Input}
						type="text"
						className={`${style.RegisterForm__input} ${
							style.RegisterForm__input_wide
						}`}
						label="E-mail"
						validate={[required, email]}
					/>
					<Field
						name="password"
						component={Input}
						type="password"
						className={`${style.RegisterForm__input} ${
							style.RegisterForm__input_wide
						}`}
						label="Введите пароль"
						validate={[required]}
					/>
					<Field
						name="rePassword"
						component={Input}
						type="password"
						className={`${style.RegisterForm__input} ${
							style.RegisterForm__input_wide
						}`}
						label="Повторите пароль"
						validate={[required]}
					/>

					<Button type="submit">Зарегестрироваться</Button>
				</div>
			</form>
		);
	}
}

RegisterForm = reduxForm({
	// a unique name for the form
	form: 'register',
	enableReinitialize: true,
	destroyOnUnmount: false,
})(RegisterForm);

export default RegisterForm;
