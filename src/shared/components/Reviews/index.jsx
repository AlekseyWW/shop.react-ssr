import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './styles.styl';

class Reviews extends Component {
	componentDidMount() {
		VK.Widgets.Comments("vk_comments", { limit: 10, attach: "*" });

	}
	render() {
		return (
			<div className={style.Reviews}>
				<div id="vk_comments"></div>
			</div>
		)
	}
}

export default Reviews;