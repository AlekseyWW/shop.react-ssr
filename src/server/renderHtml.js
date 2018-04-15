import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Generates a full HTML page containing the render output of the given react element.
 *
 * @param config {Object} Configuration.
 * @param config.preloadedState {Object} [{}] The initial state for the redux store which will be used by the
 *   client to mount the redux store into the desired state.
 * @param config.markup {string} The rendered application markup
 * @param config.styles {string} [""] Styles to inject into the page.
 * @param config.scripts {string} [""] Scripts to inject into the page.
 * @param config.styleTags {string} StyledComponents style tags
 * @returns The full HTML page in the form of a React element.
 */

export default function renderHtml({ preloadedState, markup, styleTags, styles, scripts}) {
	if (typeof preloadedState !== 'object') {
		throw new Error('Rendering requires a preloaded state object!');
	}

	if (typeof markup !== 'string' || markup.length === 0) {
		throw new Error('Rendering requires your application as a string');
	}

	if (typeof styles !== 'string' || styles.length === 0) {
		throw new Error('Rendering requires stylesheet assets string');
	}

	if (typeof scripts !== 'string' || scripts.length === 0) {
		throw new Error('Rendering requires javascript assets string');
	}
	// render Helmet meta tags to static
	// prevents memory leak
	const helmet = Helmet.renderStatic();
	// include our DLL bundle
	const dllString = `<script type="text/javascript" src="/assets/__vendor_dlls__.js"></script>`;
	const empty = '<span></span>';
	const isDev = process.env.NODE_ENV === 'development';
	return `
	<!doctype html>
	<html ${helmet.htmlAttributes.toString()}>
		<head>
		${helmet.title.toString()}
		${helmet.meta.toString()}
		${helmet.link.toString()}
		${styleTags}
		${styles}
		<!-- Put this script tag to the <head> of your page -->
		<script type="text/javascript" src="//vk.com/js/api/openapi.js?152"></script>

		<script type="text/javascript">
		VK.init({apiId: 6416838, onlyWidgets: true});
		</script>

		<!-- Put this div tag to the place, where the Comments block will be -->

		</head>
		<body ${helmet.bodyAttributes.toString()}>
		
		<!-- Yandex.Metrika counter -->
		<script type="text/javascript" >
			(function (d, w, c) {
				(w[c] = w[c] || []).push(function() {
					try {
						w.yaCounter47068560 = new Ya.Metrika({
							id:47068560,
							clickmap:true,
							trackLinks:true,
							accurateTrackBounce:true,
							webvisor:true,
							trackHash:true
						});
					} catch(e) { }
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
		</script>
		<noscript><div><img src="https://mc.yandex.ru/watch/47068560" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<!-- /Yandex.Metrika counter -->
		<div id="app">${markup}</div>
		<script type="text/javascript">
			window.__PRELOADED_STATE__=${serialize(preloadedState, { json: true })}
		</script>
		${isDev ? dllString : empty}
		${scripts}
		${helmet.script.toString()}
		<link rel="stylesheet" href="https://cdn.callbackkiller.com/widget/cbk.css">
		<script type="text/javascript" src="https://cdn.callbackkiller.com/widget/cbk.js?cbk_code=1b5ec5fdc525a0d65e4fe107c9022bef" charset="UTF-8" async></script>
		<script type="text/javascript" src="//cdn.callbackhunter.com/cbh.js?hunter_code=ff62d257709043693a0f6345ef64f77b" charset="UTF-8"></script>
		</body>
	</html>`;
}
