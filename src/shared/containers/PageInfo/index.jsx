import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from 'components/Breadcrumbs/';
import './styles.styl';

const PageInfo = ({ title }) => (
	<div className="PageInfo">
		<div className="PageInfo__container">
			<div className="PageInfo__name">
				<p>{ title }</p>
			</div>
			<Breadcrumbs items={[{ link: '', name: 'Главная' }]} />
		</div>
	</div>
);

PageInfo.propTypes = {
	title: PropTypes.string.isRequired
};


export default PageInfo;
