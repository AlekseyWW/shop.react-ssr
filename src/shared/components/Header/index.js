import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from 'chramework';
import Navigation from 'components/Navigation';
import Humburger from 'components/Humburger';
import style from './styles.styl';

export const Header = ({ toogleMenu, isMenuOpen }) => {
	return (
		<header className={style.Header}>
			<div className={style.Header__inner}>
				<div className={style.Header__logo}>
					<Logo url="http://chulakov.ru" external />
				</div>
				<div className={style.Header__content}>
					<Navigation />
				</div>
				<Humburger isMenuOpen={isMenuOpen} onClick={toogleMenu} />
			</div>
		</header>
	);
};

Header.propTypes = {
	toogleMenu: PropTypes.func.isRequired,
	isMenuOpen: PropTypes.bool.isRequired,
};

export default Header;
