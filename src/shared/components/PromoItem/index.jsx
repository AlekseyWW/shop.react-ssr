import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import HtmlParser from 'react-html-parser';
import { WhatsupIcon } from 'components/Icon';
import qs from 'query-string';
import style from './styles.styl';

const PromoItem = ({ title, customCategory, link, img, name, description, brand, category, sex, size, slug}) => {
	const styles = {
		backgroundImage: `url(${img})`
	};
	let filter = brand || category || sex || size ? {
		brand: brand ? brand.name : '',
		sex: sex ? sex.name : '',
		size: size ? size : ''
	} : null;
	let url = slug ? customCategory ? `/${customCategory.slug}/catalog/${slug}` : `/catalog/${slug}` : customCategory ? `/${customCategory.slug}/catalog` :`/catalog`;
	if (customCategory && customCategory.colors.length === 1) {
		url = `/products/${customCategory.colors[0].product.slug}`
		filter = { color: customCategory.colors[0].name }
	}
	return (
		<div className={style.PromoItem} style={styles} >
			<div className={style.PromoItem__inner}>
				<div className={style.PromoItem__content}>
					<p className={style.PromoItem__title}>{name ? HtmlParser(name) : HtmlParser(title)}</p>
					<p className={style.PromoItem__text}>
						{description ? HtmlParser(description) : HtmlParser('Для быстрого реагирования пишите нам в&nbsp;WhatsApp')}
						{!description &&
							<a href="https://api.whatsapp.com/send?phone=79286206404" target="_blank" className={style.PromoItem__icon}>
								<WhatsupIcon />
							</a>
						}
					</p>
					{!description && <p className={style.PromoItem__text}>{HtmlParser('Для просмотра каталога жмите ниже')}</p>}
					{filter || customCategory ?
						<Link
							className={style.PromoItem__link}
							to={{
								pathname: url,
								search: qs.stringify(filter)
							}} >
						посмотреть
						</Link>
						:
						<p className={style.PromoItem__button} >
							<NavLink to="/catalog" className={style.PromoItem__button__item} activeClassName={style.LogoLine__nav__item_active}>
								Каталог
							</NavLink>
						</p>
					}
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
