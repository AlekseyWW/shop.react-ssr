/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
// import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { Router } from 'react-router'

// internal
import configureStore from '../shared/state/store';
import App from '../shared/components/App';
import ReactHotLoader from './ReactHotLoader';

const history = createHistory();
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState, history);

let prevLocation = {};
history.listen(location => {
	const pathChanged = prevLocation.pathname !== location.pathname;
	const hashChanged = prevLocation.hash !== location.hash;
	if (pathChanged || hashChanged) window.scrollTo(0, 0);
	prevLocation = location;
});


const renderApp = App => {
	const MOUNT_POINT = document.getElementById('app');
	// in React 16 ReactDOM.render becomes ReactDOM.hydrate
	// when used for SSR.
	console.log({ReactDOM});
	ReactDOM.hydrate(
		<ReactHotLoader>
			<Provider store={store}>
				<Router history={history}>
					<App />
				</Router>
			</Provider>
		</ReactHotLoader>,
		MOUNT_POINT,
	);
};

renderApp(App);

if (module.hot && process.env.NODE_ENV === 'development') {
	module.hot.accept('../shared/components/App', () => {
		const App = require('../shared/components/App').default;
		renderApp(App);
	});
}
