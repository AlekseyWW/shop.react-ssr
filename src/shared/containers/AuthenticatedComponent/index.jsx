import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import * as authActions from '../../state/actions/user';
import * as cartActions from '../../state/actions/cart';
import * as favoritesActions from '../../state/actions/favorites';

export default function requireAuthentication(ComposedComponent) {

	const mapStateToProps = state => {

		const { accessToken, profileIsLoaded, profileIsLoading, profile } = state.user;

		return {
			accessToken,
			profileIsLoaded,
			profileIsLoading,
			profile
		};
	}

	const mapDispatchToProps = dispatch => ({
		// redirectToLogin: () => dispatch(replace('/login')),
		getProfile: (accessToken) => dispatch(authActions.getProfile(accessToken)),
		clearCart: () => dispatch(cartActions.setCart([])),
		clearFavorites: () => dispatch(favoritesActions.setFavorites([]))
	});

	class AuthenticatedComponent extends Component {

		componentWillMount() {
			// this.checkAuth(this.props.accessToken);
		}

		componentDidMount() {
			const { accessToken, profileIsLoaded, profileIsLoading, getProfile } = this.props;
			
			if (accessToken && !profileIsLoaded && !profileIsLoading) getProfile(accessToken);
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.accessToken);
		}

		checkAuth(accessToken) {
			if (!accessToken) {
				this.props.clearCart();
				this.props.clearFavorites();
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	AuthenticatedComponent.propTypes = {
		accessToken: PropTypes.string,
		profileIsLoaded: PropTypes.bool.isRequired,
		profile: PropTypes.object,
		// redirectToLogin: PropTypes.func.isRequired,
		getProfile: PropTypes.func.isRequired
	}

	return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}