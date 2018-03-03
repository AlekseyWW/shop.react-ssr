import React from 'react';
import Input from 'components/Input';
import { LogoIcon, VkIcon, InstagramIcon, WhatsupIcon } from 'components/Icon';
import data from 'config/header.json';
import style from './styles.styl';

const Footer = () => (
	<div className={style.Footer}>
		<div className={style.Footer__container}>
			<div className={style.Footer__column}>
				<div className={style.Footer__logo}>
					<LogoIcon width={160} height={60} className={style.Footer__logo__img} />
				</div>
			</div>
			<div className={style.Footer__column}>
				<div className={style.Footer__phone}>
					{/* <div>телефон</div> */}
					<span className={style.Footer__phone__num}>
						<span>звонок по&nbsp;россии бесплатный </span>
						<a href={data.contacts.phone.url}>{data.contacts.phone.text}</a>
					</span>
					<a href={data.contacts.location.url} target="_blank">{data.contacts.location.text}</a>
				</div>
				{/* <div className={style.Footer__address}>
				</div> */}
			</div>
			<div className={style.Footer__column}>
				<div className={style.Footer__social}>
					{/* <div className={style.Footer__social__title}>
						социальный сети
					</div> */}
					<div className={style.Footer__social__icons}>
						<a href="https://www.instagram.com/newstep_rnd/" target="_blank" className={style.Footer__social__icon} onClick={() => { yaCounter47068560.reachGoal('ORDER'); return true; }}>
							<InstagramIcon />
						</a>
						<a href="https://vk.com/newstep.store" target="_blank" className={style.Footer__social__icon}>
							<VkIcon/>
						</a>
						<a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank" className={style.Footer__social__icon}>
							<WhatsupIcon />
						</a>
					</div>
				</div>
				{/* <div className={style.Footer__buyer}>
					<div className={style.Footer__buyer__title}>
						Покупателю
					</div>
					<div className={style.Footer__links}>
						<div className={style.Footer__links__column}>
							<div className={style.Footer__link}>
							Магазин
							</div>
							<div className={style.Footer__link}>
							Новости
							</div>
							<div className={style.Footer__link}>
							Контакты
							</div>
							<div className={style.Footer__link}>
							Оплата и доставка
							</div>
							<div className={style.Footer__link}>
							Обмен и возврат
							</div>
						</div>
						<div className={style.Footer__links__column}>
							<div className={style.Footer__link}>
							Программа лояльности
							</div>
							<div className={style.Footer__link}>
							Конфиденциальность
							</div>
							<div className={style.Footer__link}>
							Вакансии
							</div>
							<div className={style.Footer__link}>
							Сотрудничество
							</div>
						</div>
					</div>
					
				</div> */}
			</div>
			{/* <div className={style.Footer__column}>
				<div className={style.Footer__feedback}>
					<div className={style.Footer__feedback__title}>
					рассылка
					</div>
					<div className={style.Footer__feedback__input}>
						<Input className={style.Footer__feedback__field} placeholder="Твой e-mail" />
						<button className={style.Footer__feedback__button}>ок</button>
					</div>
					<div className={style.Footer__feedback__text}>
					Подписываясь на рассылку, вы соглашаетесь с&nbsp;условиями оферты и&nbsp;политики конфиденциальности
					</div>
					<div className={style.Footer__feedback__note}>
					магазин женских и&nbsp;мужских кроссовок  2017
					</div>
				</div>
			</div> */}
		</div>
	</div>
);

export default Footer;

