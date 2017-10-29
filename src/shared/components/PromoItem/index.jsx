import React from 'react';
import PropTypes from 'prop-types';
import HtmlParser from 'react-html-parser';
import style from './styles.styl';

const PromoItem = ({ title, text, note, link, img }) => {
	const styles = {
		backgroundImage: `url(${img})`
	};
	return (
		<div className={style.PromoItem} style={styles} >
			<div className={style.PromoItem__inner}>
				<div className={style.PromoItem__content}>
					<p className={style.PromoItem__title}>{HtmlParser(title)}</p>
					<p className={style.PromoItem__text}>{HtmlParser(text)}</p>
					<p className={style.PromoItem__note} >{HtmlParser(note)}</p>
				</div>
			</div>
		</div>
	);
};

PromoItem.defaultProps = {
	title: '',
	note: '',
	text: '',
	link: '',
	img: ''
};

PromoItem.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	note: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired
};

export default PromoItem;
