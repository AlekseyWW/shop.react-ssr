import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { unlockScroll } from "../../libs/scrollLock.js";

import { actions } from '../../state/modules/modal.js';

import './style.css';
let unlockScroll = null;
let lockScroll = null;
class ModalContainer extends Component {
	closeModal = () => {
		const { closeModal, onClose = () => { } } = this.props;
		closeModal();
		onClose();
	};
	componentDidMount() {
		require.ensure([], function () {
			unlockScroll = require('../../libs/scrollLock.js').unlockScroll
			lockScroll = require('../../libs/scrollLock.js').lockScroll
		})
	}
	render() {
		const { modalType, modalProps: { hasClose = true }, status } = this.props;

		const SpecificModal = modalType;
		return (
			<TransitionGroup>
				{modalType && (
					<CSSTransition classNames="ModalContainer" timeout={150} onExited={unlockScroll} onEntered={lockScroll}>
						<div className="ModalContainer">
							<div
								className="ModalContainer__overlay"
								onClick={this.closeModal}
							/>
							<div className="ModalContainer__content">
								{hasClose && (
									<button
										className="ModalContainer__close"
										onClick={this.closeModal}
									>
										×
									</button>
								)}
								<div className="ModalContainer__inner">
									<SpecificModal {...this.props} status={status} />
								</div>
							</div>
						</div>
					</CSSTransition>
				)}
			</TransitionGroup>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({ ...state.modal });
const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(actions.closeModal())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
