import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header/';
import ModalContainer from 'components/ModalContainer/';

class Layout extends Component {
	state = {
		isMenuOpen: false,
	};
	toogleMenu() {
		this.setState({
			isMenuOpen: !this.state.isMenuOpen,
		});
	}
	render() {
		const { children } = this.props;
		return (
			<div>
				<Header toogleMenu={() => this.toogleMenu()} isMenuOpen={this.state.isMenuOpen} />
				<main className="container">{children}</main>
				<ModalContainer />
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
