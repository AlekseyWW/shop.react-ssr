import React from 'react';
import ClassNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import HeaderCart from 'containers/HeaderCart';
import Input from 'components/Input';
import { LogoIcon, VkIcon, InstagramIcon, WhatsupIcon, HurtIcon, GlassIcon } from 'components/Icon';

import style from './styles.styl';

const LogoLine = () => {

	return (
		<div className={style.LogoLine}>
			<div className={style.LogoLine__container}>
				<div className={style.LogoLine__nav}>
					<LogoIcon width={210} height={79} className={style.LogoLine__logo} fill="#676766"/>
					<NavLink to="/catalog" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
						Магазин
					</NavLink>
					<NavLink to="/delivery" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
						Оплата и доставка
					</NavLink>
					<NavLink to="/news" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
						Новости
					</NavLink>
					<NavLink to="/login" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
						Вход/Регистрация
					</NavLink>
				</div>
				<div className={style.LogoLine__inner}>
					<div className={style.LogoLine__social}>
						<div className={style.LogoLine__social__item}>
							<InstagramIcon />
						</div>
						<div className={style.LogoLine__social__item}>
							<VkIcon/>
						</div>
						<div className={style.LogoLine__social__item}>
							<WhatsupIcon />
						</div>
					</div>
					<div className={style.LogoLine__search}>
						<div className={style.Menu__search}>
							<Input placeholder="Поиск" Icon={GlassIcon} />
						</div>
					</div>
					<div className={style.LogoLine__action}>
						<div className={style.LogoLine__action__item}>
							<HurtIcon />
						</div>
						<div className={style.LogoLine__action__item}>
							<HeaderCart />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};


export default LogoLine;
