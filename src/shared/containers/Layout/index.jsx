import React, { Component } from 'react';
import Header from 'containers/Header/';
import Footer from 'containers/Footer/';
import ModalContainer from 'containers/ModalContainer/';
import style from './styles.styl';

class Layout extends Component {
	componentDidMount() {
		(function (d, w, c) {
			(w[c] = w[c] || []).push(function () {
				try {
					w.yaCounter47068560 = new Ya.Metrika({
						id: 47068560,
						clickmap: true,
						trackLinks: true,
						accurateTrackBounce: true
					});
				} catch (e) { }
			});
			var n = d.getElementsByTagName("script")[0],
				s = d.createElement("script"),
				f = function () { n.parentNode.insertBefore(s, n); };
			s.type = "text/javascript";
			s.async = true;
			s.src = "https://mc.yandex.ru/metrika/watch.js";

			if (w.opera == "[object Opera]") {
				d.addEventListener("DOMContentLoaded", f, false);
			} else { f(); }
		})(document, window, "yandex_metrika_callbacks");
	}
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
