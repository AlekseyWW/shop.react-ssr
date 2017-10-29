import React from 'react';
import Header from 'containers/Header/';
import Footer from 'containers/Footer/';
import style from './styles.styl';

const Layout = ({children}) => (
	<div className={style.Layout}>
		<div className={style.Layout__wrapper}>
			<div className={style.Layout__header}>
				<Header />
			</div>
			<div className={style.Layout__content}>
				{ children }
			</div>
			<div className={style.Layout__footer}>
				<Footer />
			</div>
		</div>
	</div>
);

export default Layout;
