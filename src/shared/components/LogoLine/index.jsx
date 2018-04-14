import React from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import HeaderCart from 'containers/HeaderCart';
import Input from 'components/Input';
import { LogoIcon, LogoutIcon, VkIcon, InstagramIcon, WhatsupIcon, HurtIcon, TelegrammIcon, GlassIcon, HeartSold } from 'components/Icon';

import style from './styles.styl';

const LogoLine = ({ isFavorite, loginModalOpen, profile, logout, searchProducts }) => {
	const heartClass = classNames(style.LogoLine__action__heart,{
		[style.LogoLine__action__heart_active]: isFavorite
	})
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
								<input placeholder="Поиск" onChange={searchProducts}/>
							</div>
						</div> */}
						{/* {profile && profile.id ?
							<div className={style.LogoLine__login}>
								<NavLink to="/user">
									{profile.email}
								</NavLink>
								<LogoutIcon onClick={logout} width={20} height={20} />
							</div> :
							<div className={style.LogoLine__login} onClick={loginModalOpen}>
								<a>Войти</a>
							</div>
						} */}
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
