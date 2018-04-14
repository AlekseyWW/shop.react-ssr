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

class DistributionForm extends Component {
	componentDidMount() {

	}
	render() {
		const { handleSubmit, openRegisterModal } = this.props;
		
		return (
			<form onSubmit={handleSubmit} className={style.DistributionForm}>
				<div className={style.DistributionForm__promo}>
					<GiftIcon />
					<p className={style.DistributionForm__promo__title}><span>500 рублей в подарок</span> на шоппинг</p>
					<p className={style.DistributionForm__promo__text}>Подпишитесь на наши рассылки и получите 500 рублей в подарок!</p>
				</div>
				<div className={style.DistributionForm__container}>
					<Field
						name="email"
						component={Input}
						type="text"
						className={`${style.DistributionForm__input} ${style.DistributionForm__input_wide}`}
						label="E-mail"
						validate={[email]}
					/>
					<p>или</p>
					<Field
						name="phone"
						component={Input}
						type="text"
						className={`${style.DistributionForm__input} ${style.DistributionForm__input_wide}`}
						label="Телефон"
					/>

					<Button type="submit">
						Получить подарок
					</Button>
				</div>
			</form>
		);
	}
}


DistributionForm = reduxForm({
	// a unique name for the form
	form: 'distribution',
	enableReinitialize: true,
	destroyOnUnmount: false
})(DistributionForm);

export default DistributionForm;

