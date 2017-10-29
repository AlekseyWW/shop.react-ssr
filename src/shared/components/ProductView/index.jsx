import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';

const ProductView = ({ img }) => (
	<div className="ProductView">
		<div className="ProductView__img">
			<img src={img} alt="img" />
		</div>
	</div>
);

ProductView.defaultProps = {
	img: ''
};

ProductView.propTypes = {
	img: PropTypes.string.isRequired
};

export default ProductView;
