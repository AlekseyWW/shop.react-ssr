import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import CheckBox from 'components/CheckBox';
import Input from 'components/Input';
import Select from 'components/Select';
import { loadCities, getDeliveryCoast } from '../../state/modules/sdek';
import Button from 'components/Button';
import { GiftIcon } from 'components/Icon';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { required, email } from 'utils/validation';

import style from './styles.styl';

class RegisterForm extends Component {
	componentDidMount() {

	}
	render() {
		const { handleSubmit, openRegisterModal } = this.props;
		
		return (
			<form onSubmit={handleSubmit} className={style.RegisterForm}>
				<div className={style.RegisterForm__promo}>
					<div className={style.RegisterForm__promo__content}>
						<GiftIcon />
						<p className={style.RegisterForm__promo__title}><span>500 рублей в подарок</span> на шоппинг</p>
					</div>
					<p className={style.RegisterForm__promo__text}>Зарегистриуйтесь на&nbsp;сайте и&nbsp;получите промокод на&nbsp;скидку!</p>
				</div>
				<div className={style.RegisterForm__container}>
					<Field
						name="email"
						component={Input}
						type="text"
						className={`${style.RegisterForm__input} ${style.RegisterForm__input_wide}`}
						label="E-mail"
						validate={[required, email]}
					/>
					<Field
						name="password"
						component={Input}
						type="password"
						className={`${style.RegisterForm__input} ${style.RegisterForm__input_wide}`}
						label="Введите пароль"
						validate={[required]}
					/>
					<Field
						name="rePassword"
						component={Input}
						type="password"
						className={`${style.RegisterForm__input} ${style.RegisterForm__input_wide}`}
						label="Повторите пароль"
						validate={[required]}
					/>

					<Button type="submit">
						Зарегестрироваться
					</Button>
				</div>
			</form>
		);
	}
}


RegisterForm = reduxForm({
	// a unique name for the form
	form: 'register',
	enableReinitialize: true,
	destroyOnUnmount: false
})(RegisterForm);

export default RegisterForm;

