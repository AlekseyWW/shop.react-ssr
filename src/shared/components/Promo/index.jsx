import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PromoItem from 'components/PromoItem/';
import Preloader from 'components/Preloader/';
import _ from 'lodash';
import Swiper from 'react-id-swiper';

import style from './styles.styl';

class Promo extends Component {
	componentWillReceiveProps(nextProps) {
		// this.swiper.swiper.update()
	}
	getSlug = (name) => {
		const category = _.find(this.props.categories, b => b.slug === name || typeof _.find(b.items, b => b.slug === name) !== 'undefined');
		const slug = category ? category.slug === name ? `${category.slug}` : `${category.slug}/${_.find(category.items, b => b.slug === name).slug}` : '';
		return slug;
	}
	render() {
		const { categories, slides } = this.props;
		const params = {
			containerClass: style.Promo__container,
			wrapperClass: style.Promo__wrapper,
			slidesPerView: 1,
			autoplay: {
				delay: 5000,
			},
			loop: true,
			centeredSlides: true,
			grabCursor: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			}
		}
		return (
			<div className={style.Promo}>
				{slides.length > 0 ? 
					<Swiper className={style.Promo__container} {...params} ref={el => { this.swiper = el }}>
						{slides.map((item, id) => {
							const key = `item-${id}`;
							const slug = item.category ? this.getSlug(item.category.slug) : '';
							return (
								<div className={style.Promo__slide} key={key}> <PromoItem {...item} slug={slug} title={item.title} /></div>
							)}
						)}
					</Swiper> : 
					<Preloader />
				}
			</div>
		)
	}
};


Promo.propTypes = {
	slides: PropTypes.array.isRequired
};
export default Promo;
