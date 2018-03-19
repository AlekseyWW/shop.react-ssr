import React from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import HeaderCart from 'containers/HeaderCart';
import Input from 'components/Input';
import { LogoIcon, VkIcon, InstagramIcon, WhatsupIcon, HurtIcon, TelegrammIcon, GlassIcon, HeartSold } from 'components/Icon';

import style from './styles.styl';

const LogoLine = ({ isFavorite, loginModalOpen, profile }) => {
	const heartClass = classNames(style.LogoLine__action__heart,{
		[style.LogoLine__action__heart_active]: isFavorite
	})
	console.log(profile);
	
	return (
		<div className={style.LogoLine}>
			<div className={style.LogoLine__container}>
				<NavLink to="/">
					<LogoIcon width={210} height={79} className={style.LogoLine__logo} fill="#676766"/>
				</NavLink>
				<div className={style.LogoLine__content}>
					<div className={style.LogoLine__nav}>
						<NavLink to="/catalog" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
							Каталог
						</NavLink>
						{/* <NavLink to="/delivery" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
							Оплата и доставка
						</NavLink>
						<NavLink to="/news" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
							Новости
						</NavLink>
						<NavLink to="/login" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
							Вход/Регистрация
						</NavLink> */}
						{profile && profile.email ?
							<div> 
								<NavLink to="/user">
									{profile.email}
								</NavLink>
								<p> / выход</p>
							</div>:
							<div className={style.LogoLine__nav__item} onClick={loginModalOpen}>
								Вход/Регистрация
							</div>
						}
					</div>
					<div className={style.LogoLine__inner}>
						<div className={style.LogoLine__social}>
							<a href="https://www.instagram.com/newstep_rnd/" target="_blank" className={style.LogoLine__social__item} onClick={() => { yaCounter47068560.reachGoal('ORDER'); return true; }} >
								<InstagramIcon />
							</a>
							<a href="https://vk.com/newstep.store" target="_blank" className={style.LogoLine__social__item}>
								<VkIcon/>
							</a>
							<a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank" className={style.LogoLine__social__item}>
								<WhatsupIcon />
							</a>
							<a href="https://t.me/newstepstorernd" target="_blank" className={style.LogoLine__social__item}>
								<TelegrammIcon />
							</a>
						</div>
						{/* <div className={style.LogoLine__search}>
							<div className={style.LogoLine__search}>
								<Input placeholder="Поиск" Icon={GlassIcon} />
							</div>
						</div> */}
						<div className={style.LogoLine__action}>
							<Link to="/favorites" className={style.LogoLine__action__item}>
								<HurtIcon />
								<HeartSold className={heartClass} />
							</Link>
							<div className={style.LogoLine__action__item}>
								<HeaderCart />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};


export default LogoLine;
