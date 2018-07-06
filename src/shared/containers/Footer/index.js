import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { LogoIcon, VkIcon, InstagramIcon, WhatsupIcon } from 'components/Icon';
import data from 'config/header.json';
import style from './styles.styl';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.fetchDistribution = this.fetchDistribution.bind(this);
	}
	fetchDistribution = () => {
		const url = `${process.env.API_URL}/email-subscription`;
		if (this.input.value) {
			return axios({
				method: 'post',
				url,
				data: { email: this.input.value },
			})
				.then(res => {
					const { data } = res;
					return this.onSuccess();
				})
				.catch(err => {
					console.log(err.message);
				});
		}
	};
	onSuccess() {
		this.input.value = '';
		yaCounter47068560.reachGoal('DISTRIBUTION');
	}
	render() {
		return (
			<div className={style.Footer}>
				<div className={style.Footer__container}>
					<div className={style.Footer__column}>
						<div className={style.Footer__phone}>
							<span className={style.Footer__social__title}>
								<span>Ростовская область</span>
							</span>
							<a href={data.contacts.phone.url}>
								{data.contacts.phone.text}
							</a>
							<span className={style.Footer__social__title}>
								<span>Россия</span>
							</span>
							<a href={data.contacts.phoneRussia.url}>
								{data.contacts.phoneRussia.text}
							</a>
						</div>
						<div className={style.Footer__logo}>
							<LogoIcon
								width={160}
								height={60}
								className={style.Footer__logo__img}
							/>
						</div>
					</div>
					<div className={style.Footer__column}>
						<div className={style.Footer__social}>
							<div className={style.Footer__social__title}>
								социальный сети
							</div>
							<div className={style.Footer__social__icons}>
								<a
									href="https://www.instagram.com/newstep_rnd/"
									target="_blank"
									className={style.Footer__social__icon}
									onClick={() => {
										yaCounter47068560.reachGoal('ORDER');
										return true;
									}}
								>
									<InstagramIcon />
								</a>
								<a
									href="https://vk.com/newstep.store"
									target="_blank"
									className={style.Footer__social__icon}
								>
									<VkIcon />
								</a>
								<a
									href="https://api.whatsapp.com/send?phone=79286206404"
									target="_blank"
									className={style.Footer__social__icon}
								>
									<WhatsupIcon />
								</a>
							</div>
						</div>
						<div className={style.Footer__buyer}>
							<div className={style.Footer__buyer__title}>
								Покупателю
							</div>
							<div className={style.Footer__links}>
								<div className={style.Footer__links__column}>
									<NavLink
										to="/catalog"
										className={style.Footer__link}
										activeClassName={
											style.Footer__link_active
										}
									>
										Магазин
									</NavLink>

									<NavLink
										to="/info"
										className={style.Footer__link}
										activeClassName={
											style.Footer__link_active
										}
									>
										Оплата и доставка
									</NavLink>
								</div>
								<div className={style.Footer__links__column}>
									<NavLink
										to="/agreement"
										className={style.Footer__link}
										activeClassName={
											style.Footer__link_active
										}
									>
										Конфиденциальность
									</NavLink>
									<NavLink
										to="/return"
										className={style.Footer__link}
										activeClassName={
											style.Footer__link_active
										}
									>
										Обмен и возврат
									</NavLink>
								</div>
							</div>
						</div>
					</div>
					<div className={style.Footer__column}>
						<div className={style.Footer__feedback}>
							<div className={style.Footer__social__title}>
								рассылка
							</div>
							<div className={style.Footer__feedback__input}>
								<input
									className={style.Footer__feedback__field}
									placeholder="Твой e-mail"
									ref={this.input}
								/>
								<button
									className={style.Footer__feedback__button}
									onClick={this.fetchDistribution}
								>
									ок
								</button>
							</div>
							<div className={style.Footer__feedback__text}>
								Подписываясь на рассылку, вы соглашаетесь
								с&nbsp;условиями оферты и&nbsp;политики
								конфиденциальности
							</div>
							<div className={style.Footer__feedback__note}>
								магазин женских и&nbsp;мужских кроссовок
							</div>
						</div>

						<div className={style.Footer__payimg}>
							<img src="/mastercard.png" alt="" />
							<img src="/visa.png" alt="" />
							<img src="/mir.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
