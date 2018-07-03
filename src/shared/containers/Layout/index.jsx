import React, { Component } from 'react';
import Header from 'containers/Header/';
import Footer from 'containers/Footer/';
import ModalContainer from 'containers/ModalContainer/';
import style from './styles.styl';


class Layout extends Component {

	render() {
		const { children } = this.props;
		return (
			<div className={style.Layout}>
				<div className={style.Layout__wrapper}>
					<div className={style.Layout__header}>
						<Header />
					</div>
					<div className={style.Layout__content}>
						{children}
					</div>
					<div className={style.Layout__footer}>
						<Footer />
					</div>
				</div>
				<ModalContainer />
			</div>
		)
	}
};

export default Layout;
