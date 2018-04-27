import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.styl';
import { LogoIcon, InstagramIcon, VkIcon, WhatsupIcon, TelegrammIcon } from "components/Icon";
import data from 'config/header.json';

const ContactBlock = () => {
	return (
		<div className={style.ContactBlock}>
			<LogoIcon className={style.ContactBlock__logo} />
			<div className={style.ContactBlock__social}>
				<a href="https://www.instagram.com/newstep_rnd/" target="_blank" className={style.ContactBlock__social__item} onClick={() => { yaCounter47068560.reachGoal('ORDER'); return true; }} >
					<InstagramIcon />
				</a>
				<a href="https://vk.com/newstep.store" target="_blank" className={style.ContactBlock__social__item}>
					<VkIcon />
				</a>
				<a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank" className={style.ContactBlock__social__item}>
					<WhatsupIcon />
				</a>
				{/* <a href="https://t.me/Kross_zakazbot" target="_blank" className={style.ContactBlock__social__item}>
					<TelegrammIcon />
				</a> */}
			</div>
			<div className={style.ContactBlock__phone}>
				<span className={style.ContactBlock__phone__label}>Телофоны:</span>
			
				<a href={data.contacts.phone.url} className={style.ContactBlock__phone__item}>
					<span className={style.ContactBlock__phone__title}>Ростовская обл.:</span>
					<span className={style.ContactBlock__phone__value}>
							{data.contacts.phone.text}
					</span>

				</a>
				<a href={data.contacts.phoneRussia.url} className={style.ContactBlock__phone__item}>
					<span className={style.ContactBlock__phone__title}>Россия:</span>
					<span className={style.ContactBlock__phone__value}>
						{data.contacts.phoneRussia.text}
					</span>
				</a>
				<a href="mailto:newstep.adm@gmail.com">
					<span className={style.ContactBlock__phone__title}>Email:</span>
					<span className={style.ContactBlock__phone__value}>
						newstep.adm@gmail.com
					</span>
					</a>
			</div>
		</div>
	);
};


export default ContactBlock;
