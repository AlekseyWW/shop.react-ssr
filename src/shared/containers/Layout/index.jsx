import React, { Component } from 'react';
import Header from 'containers/Header/';
import Footer from 'containers/Footer/';
import ModalContainer from 'containers/ModalContainer/';
import { withRouter } from 'react-router-dom';
import style from './styles.styl';
import qs from 'query-string';


class Layout extends Component {
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			fbq('track', 'PageView');
			!function (f, b, e, v, n, t, s) {
				if (f.fbq) return; n = f.fbq = function () {
					n.callMethod ?
						n.callMethod.apply(n, arguments) : n.queue.push(arguments)
				};
				if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
				n.queue = []; t = b.createElement(e); t.async = !0;
				t.src = v; s = b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t, s)
			}(window, document, 'script',
				'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '947817732034649');
			fbq('track', 'PageView');
			fbq('init', '210347599540942');
		}
	}
	componentDidMount() {
		!function (f, b, e, v, n, t, s) {
			if (f.fbq) return; n = f.fbq = function () {
				n.callMethod ?
				n.callMethod.apply(n, arguments) : n.queue.push(arguments)
			};
			if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
			n.queue = []; t = b.createElement(e); t.async = !0;
			t.src = v; s = b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t, s)
		}(window, document, 'script',
			'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '947817732034649');
		fbq('init', '210347599540942');
		fbq('track', 'PageView');
		(function (d, w, c) {
			(w[c] = w[c] || []).push(function () {
				try {
					w.yaCounter47068560 = new Ya.Metrika({
						id: 47068560,
						clickmap: true,
						trackLinks: true,
						accurateTrackBounce: true,
						webvisor: true,
						trackHash: true
					});
				} catch (e) { }
			});

			var n = d.getElementsByTagName("script")[0],
			s = d.createElement("script"),
			f = function () {n.parentNode.insertBefore(s, n); };
			s.type = "text/javascript";
			s.async = true;
			s.src = "https://mc.yandex.ru/metrika/watch.js";

			if (w.opera == "[object Opera]") {
						d.addEventListener("DOMContentLoaded", f, false);
					} else {f(); }
		})(document, window, "yandex_metrika_callbacks");

		const ScrollMagic = require('scrollmagic');
		window.controller = new ScrollMagic.Controller();
		const parsedQuery = qs.parse(this.props.location.search);
		if (parsedQuery['utm_campaign']) {
			window.utm = {
				utm_campaign: parsedQuery['utm_campaign'],
				utm_medium: parsedQuery['utm_medium'],
				utm_source: parsedQuery['utm_source'],
				utm_term: parsedQuery['utm_term']
			}
		}
		
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

export default withRouter(Layout);
