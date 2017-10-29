import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Layout from 'containers/Layout';

export default function Root({ history }) {
	return (
		<ConnectedRouter history={history}>
			<Route path="/" component={Layout} />
		</ConnectedRouter>
	);
}

Root.propTypes = {
	history: PropTypes.object.isRequired
};
