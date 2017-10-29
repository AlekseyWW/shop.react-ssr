import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.styl';

const Content = props => {
	return <div className={style.Content}>{props.children}</div>;
};

Content.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Content;
