import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.styl';
import {
	LogoIcon,
	InstagramIcon,
	VkIcon,
	WhatsupIcon,
	TelegrammIcon,
} from 'components/Icon';
import data from 'config/header.json';
import { NavLink } from 'react-router-dom';

const SideNavContent = () => {
	return (
		<div className={style.SideNavContent}>
			<div className={style.SideNavContent__inner}>
				<NavLink
					to="/info"
					className={style.SideNavContent__item}
					activeClassName={style.SideNavContent__item_active}
				>
					Оплата и доставка
				</NavLink>
				<NavLink
					to="/return"
					className={style.SideNavContent__item}
					activeClassName={style.SideNavContent__item_active}
				>
					Обмен и возврат
				</NavLink>
				<NavLink
					to="/agreement"
					className={style.SideNavContent__item}
					activeClassName={style.SideNavContent__item_active}
				>
					Конфиденциальность
				</NavLink>
			</div>
		</div>
	);
};

export default SideNavContent;
