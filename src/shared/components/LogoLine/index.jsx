import React, { Component } from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import HeaderCart from 'containers/HeaderCart';
import Input from 'components/Input';
import { LogoIcon, LogoutIcon, VkIcon, InstagramIcon, DownArrow, WhatsupIcon, HurtIcon, TelegrammIcon, GlassIcon, HeartSold } from 'components/Icon';

import style from './styles.styl';

class LogoLine extends Component {
	state ={
		menuOpened: false,
		searchOpened: false
	}
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.searchProducts = this.searchProducts.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
	}
	toggleMenu () {
		this.setState({
			menuOpened: !this.state.menuOpened
		})
	}
	toggleSearch () {
		if(window &&window.innerWidth < 768) {
			this.setState({
				searchOpened: !this.state.searchOpened
			})
		}
	}
	searchProducts() {
		const val = this.searchInput.value
		if (val) {
			this.props.searchProducts(null, val)
		}
		this.setState({
			searchOpened: false,
			menuOpened: false
		})
	}
	render() {
		const { isFavorite, loginModalOpen, profile, logout, searchProducts, isFetching} = this.props;
		const heartClass = classNames(style.LogoLine__action__heart,{
			[style.LogoLine__action__heart_active]: isFavorite
		})
		
		const navClass = classNames(style.LogoLine__nav,{
			[style.LogoLine__nav_login]: profile
		})
		const mobMenuClass = classNames(style.LogoLine__mobNav__container,{
			[style.LogoLine__mobNav__container_active]: this.state.menuOpened
		})
		const mobTitleClass = classNames(style.LogoLine__mobNav__title,{
			[style.LogoLine__mobNav__title_active]: this.state.menuOpened
		})
		const mobileSearch = classNames(style.LogoLine__mobileSearch,{
			[style.LogoLine__mobileSearch_active]: this.state.searchOpened
		})
		return (
			<div className={style.LogoLine}>
				<div className={style.LogoLine__container}>
					<NavLink to="/" className={style.LogoLine__logo}>
						<LogoIcon width={210} height={79}  fill="#676766"/>
					</NavLink>
					<div className={style.LogoLine__mobNav} onClick={this.toggleMenu}>
						<div className={mobTitleClass} >
							<span>Меню</span>
							<DownArrow />
						</div>
						<div className={mobMenuClass}>
							<NavLink to="/catalog" className={style.LogoLine__mobNav__item} activeClassName={style.LogoLine____mobNav__item_active}>
								Магазин
								</NavLink>
							<NavLink to="/info" className={style.LogoLine__mobNav__item} activeClassName={style.LogoLine____mobNav__item_active}>
								Оплата и доставка
								</NavLink>
							<NavLink to="/return" className={style.LogoLine__mobNav__item} activeClassName={style.LogoLine____mobNav__item_active}>
								Возврат
							</NavLink>
						</div>
					</div>
					<div className={style.LogoLine__content}>
						<div className={navClass}>
							<NavLink to="/catalog" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
								Магазин
							</NavLink>
							<NavLink to="/info" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
								Оплата и доставка
							</NavLink>
							<NavLink to="/return" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
								Возврат
							</NavLink>
							{!profile && !isFetching &&
								<div className={style.LogoLine__nav__item} onClick={loginModalOpen}>
									Вход/Регистрация
								</div>
							}
							{/* 
							<NavLink to="/news" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
								Новости
							</NavLink>
							<NavLink to="/login" className={style.LogoLine__nav__item} activeClassName={style.LogoLine__nav__item_active}>
								Вход/Регистрация
							</NavLink> */}
							
						</div>
						<div className={style.LogoLine__inner}>
							{/* <div className={style.LogoLine__social}>
								<a href="https://www.instagram.com/newstep_rnd/" target="_blank" className={style.LogoLine__social__item} onClick={() => { yaCounter47068560.reachGoal('ORDER'); return true; }} >
									<InstagramIcon />
								</a>
								<a href="https://vk.com/newstep.store" target="_blank" className={style.LogoLine__social__item}>
									<VkIcon/>
								</a>
								<a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank" className={style.LogoLine__social__item}>
									<WhatsupIcon />
								</a>
								<a href="https://t.me/Kross_zakazbot" target="_blank" className={style.LogoLine__social__item}>
									<TelegrammIcon />
								</a>
							</div> */}
							{profile && profile.id &&
								<div className={style.LogoLine__login}>
									<img src="/login.png" alt="" />
									<NavLink to="/user">
										{profile.email}
									</NavLink>
									<LogoutIcon onClick={logout} width={20} height={20} />
								</div>
							}
							<div className={style.LogoLine__block}>
	
								<div className={style.LogoLine__search}>
									<GlassIcon onClick={this.toggleSearch}/>
									<input placeholder="Поиск" onChange={searchProducts}/>
								</div>
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
					<div className={mobileSearch}>
						<input placeholder="Поиск" onBlur={searchProducts} ref={el => this.searchInput = el}/>
						<GlassIcon onClick={this.searchProducts} />
						<div onClick={() =>this.setState({ searchOpened: false})}></div>
					</div>
				</div>
			</div>
		)
	}
}


export default LogoLine;
