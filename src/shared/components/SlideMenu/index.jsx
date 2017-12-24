import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import SideBar from 'components/SideBar';
import './style.css';

export default function includeMenu(ComposedComponent) {

	class SlideMenu extends Component {

		componentWillReceiveProps(nextProps) {
			var routeChanged = nextProps.location !== this.props.location
			window.previousLocation = this.props.location
		}
		render() {
			return (
				<div>
					<Menu right>
						<SideBar />
					</Menu>
					<ComposedComponent {...this.props} />
				</div>
			)
		}
	}
	return SlideMenu;
}


