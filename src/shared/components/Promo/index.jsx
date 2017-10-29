import React from 'react';
import PropTypes from 'prop-types';
import PromoItem from 'components/PromoItem/';

import style from './styles.styl';

const Promo = ({ content }) => (
	<div className={style.Promo}>
		<div className={style.Promo__wrapper}>
			{ content.map(item => <PromoItem key={item.id} {...item} title={item.title} />)}
		</div>
	</div>
);


Promo.propTypes = {
	content: PropTypes.array.isRequired
};
export default Promo;
