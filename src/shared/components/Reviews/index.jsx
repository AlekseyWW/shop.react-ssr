import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './styles.styl';

class Reviews extends Component {
	componentDidMount() {
		console.log('mount', this.props.pageId);
		
		VK.Widgets.Comments("vk_comments", { limit: 10, attach: "*", pageUrl: 'http://newstep.store' }, this.props.pageId ? this.props.pageId : null);

	}
	componentDidUpdate(prevProps, prevState) {
		console.log('update');
		
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