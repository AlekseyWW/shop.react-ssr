import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import htmlParser from 'react-html-parser';
import { InstagramIcon } from 'components/Icon';
import deliver from './deliver.jpg';
import './style.css';

class SuccessPage extends Component {
	componentDidMount() {
		
	}
	render() {
		return (
			<div className="SuccessPage">
				<div className="SuccessPage__photo">
					<img src={deliver} className="SuccessPage__image" />
				</div>
				<div className="SuccessPage__inner">
					<div className="SuccessPage__header">
						<h1 className="SuccessPage__title" level={4}>
							{htmlParser('Ваша заявка принята.')}
						</h1>
						<h2 className="SuccessPage__subTitle" level={4}>
							{htmlParser('Ожидайте звонок личного консультанта! А&nbsp;пока загляните к&nbsp;нам в&nbsp;инстаграмм')}
						</h2>
					</div>
					<div className="SuccessPage__body">
						<div className="SuccessPage__text">
							<a href="https://www.instagram.com/newstep_rnd/" target="_blank" className="SuccessPage__instagramm">
								<InstagramIcon />
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// ProductPage.defaultProps = {
// 	isLoaded: false,
// 	isLoading: false,
// 	product: {}
// };

// ProductPage.propTypes = {
// 	isLoaded: PropTypes.bool.isRequired,
// 	isLoading: PropTypes.bool.isRequired,
// 	getProductInfo: PropTypes.func.isRequired,
// 	addToCart: PropTypes.func.isRequired,
// 	product: PropTypes.object.isRequired
// };

export default SuccessPage;
