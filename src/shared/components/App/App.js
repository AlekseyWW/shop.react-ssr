import React from 'react';
import Route from 'react-router-dom/Route';
import Helmet from 'react-helmet';
import Switch from 'react-router-dom/Switch';
import Layout from 'containers/Layout';
import AuthenticatedComponent from 'containers/AuthenticatedComponent';
import uuid from 'uuid';
// internal


import slideMenu from 'components/SlideMenu';
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
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.3/css/swiper.min.css" />
			</Helmet>
			<Layout>
				<Switch>
					{routes.map(route => (
						// pass in the initialData from the server for this specific route
						<Route {...route} component={AuthenticatedComponent(slideMenu(route.component))} key={uuid.v4()} />
					))}
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</div>
	);
}
export default App;
