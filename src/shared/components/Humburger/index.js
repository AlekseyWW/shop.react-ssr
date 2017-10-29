import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './styles.styl';

const Humburger = ({ isMenuOpen, onClick }) => {
	const blockClass = classNames([style.Humburger, isMenuOpen ? style.Humburger_open : 'sss']);
	console.log('------------------------------------');
	console.log(isMenuOpen);
	console.log('------------------------------------');
	return (
		<div className={blockClass} onClick={onClick}>
			<span className={style.Humburger__line} />
			<span className={style.Humburger__line} />
			<span className={style.Humburger__line} />
		</div>
	);
};

Humburger.propTypes = {
	isMenuOpen: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Humburger;
