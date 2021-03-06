import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

const Html = props => {
	const { styles, cssHash, js, component, state, styleTags, nonce } = props;
	const head = Helmet.renderStatic();
	const htmlAttrs = head.htmlAttributes.toComponent();

	return (
		<html lang="en" {...htmlAttrs}>
			<head>
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
				{styles.map(name => (
					<link
						rel="stylesheet"
						href={`${__PUB_PATH__}${name}`}
						key={name}
					/>
				))}

				{styleTags}
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{ __html: component }} />

				<script
					type="text/javascript"
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.__PRELOADED_STATE__=${serialize(state, {
							json: true,
						})};`,
					}}
					charSet="UTF-8"
				/>
				<script
					type="text/javascript"
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.__CSS_CHUNKS__=${serialize(cssHash)};`,
					}}
					charSet="UTF-8"
				/>
				{__DEV__ ? (
					<script
						type="text/javascript"
						charSet="UTF-8"
						src="/assets/vendor.js"
					/>
				) : (
					<span />
				)}
				{js.map(name => (
					<script
						type="text/javascript"
						src={`${__PUB_PATH__}${name}`}
						key={name}
						charSet="UTF-8"
					/>
				))}
			</body>
		</html>
	);
};

Html.propTypes = {
	styles: PropTypes.array,
	cssHash: PropTypes.object,
	js: PropTypes.array,
	component: PropTypes.node,
	state: PropTypes.object,
	styleTags: PropTypes.array,
	nonce: PropTypes.string,
};

export default Html;
