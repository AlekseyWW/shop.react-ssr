import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';
import Button from 'components/Button';
import { required, email } from 'utils/validation';

import style from './styles.styl';

class LoginForm extends Component {
	componentDidMount() {}
	render() {
		const { handleSubmit, openRegisterModal } = this.props;
		return (
			<form onSubmit={handleSubmit} className={style.LoginForm}>
				<div className={style.LoginForm__container}>
					<Field
						name="email"
						component={Input}
						type="text"
						className={`${style.LoginForm__input} ${
							style.LoginForm__input_wide
						}`}
						label="E-mail"
						validate={[required, email]}
					/>
					<Field
						name="password"
						component={Input}
						type="password"
						className={`${style.LoginForm__input} ${
							style.LoginForm__input_wide
						}`}
						label="Введите пароль"
						validate={[required]}
					/>
					<Button type="submit">Воити</Button>
				</div>
			</form>
		);
	}
}

LoginForm = reduxForm({
	// a unique name for the form
	form: 'login',
	enableReinitialize: true,
	destroyOnUnmount: false,
})(LoginForm);

export default LoginForm;
