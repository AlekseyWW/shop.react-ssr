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
		</head>
		<body ${helmet.bodyAttributes.toString()}>
	
		<noscript><div><img src="https://mc.yandex.ru/watch/47068560" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<div id="app">${markup}</div>
		<script type="text/javascript">
			window.__PRELOADED_STATE__=${serialize(preloadedState, { json: true })}
		</script>
		${isDev ? dllString : empty}
		${scripts}
		${helmet.script.toString()}
		</body>
	</html>`;
}
