import React from 'react';
import Route from 'react-router-dom/Route';
import Helmet from 'react-helmet';
import Switch from 'react-router-dom/Switch';
import uuid from 'uuid';
// internal
import 'chramework/dist/main.css';
import Layout from 'containers/Layout';
import NotFound from '../NotFound';
import routes from '../../routes';
import '../../styles/style.styl';
function App() {
	return (
		<div>
			<Helmet titleTemplate="NEWSTEP - %s">
				<html lang="en" />
				<title>Магазин</title>
				<meta name="application-name" content="React Universal Boiler" />
				<meta name="description" content="A server rendering React project." />
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="msapplication-TileColor" content="#2b2b2b" />
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2" />
			</Helmet>
			<Layout>
				<Switch>
					{routes.map(route => (
						// pass in the initialData from the server for this specific route
						<Route {...route} key={uuid.v4()} />
					))}
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</div>
	);
}
export default App;
