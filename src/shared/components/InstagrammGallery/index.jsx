import React from 'react';
import Instafeed from 'components/Instafeed';
import { InstagramIcon } from 'components/Icon';

import style from './styles.styl';

const InstagrammGallery = () => {
	return (
		<div className={style.InstagrammGallery}>
			<div className={style.InstagrammGallery__top}>
				<a href="http://instagram.com/sneaker_topcheg" target="_blank" className={style.InstagrammGallery__link}>
					<InstagramIcon />
					<span>Follow instagram @newstep_store</span>
				</a>
			</div>
			<div id='instafeed'className={style.InstagrammGallery__container}>
				<Instafeed
					limit='8'
					userId='2108455117'
					clientId='5cc12975ce224c448b17f20b3699d36d'
					accessToken='2108455117.5cc1297.889a7d8bc09d4e27beb824af9c74a2cd'
					template={
						`<a href='{{link}}' target='_blank' class='InstagrammGallery__item'>
							<img class='InstagrammGallery__item__background' src='{{image}}' />
						</a>`
					}
				/>
			</div>
		</div>
	)
}

export default InstagrammGallery;
