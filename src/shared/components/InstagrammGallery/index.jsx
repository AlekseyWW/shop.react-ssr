import React from 'react';
import Instafeed from 'components/Instafeed';
import { InstagramIcon } from 'components/Icon';

import style from './styles.styl';

const InstagrammGallery = () => {
	return (
		<div className={style.InstagrammGallery}>
			<div className={style.InstagrammGallery__top}>
				<a
					href="https://www.instagram.com/newstep_rnd/"
					target="_blank"
					className={style.InstagrammGallery__link}
				>
					<InstagramIcon />
					<span>Follow instagram @newstep_rnd</span>
				</a>
			</div>
			<div id="instafeed" className={style.InstagrammGallery__container}>
				<Instafeed
					limit="8"
					userId="7001519386"
					clientId="66b37bccaeff40299c34d431c00f41fe"
					accessToken="7001519386.66b37bc.e34fb9ee21d441bf9f5511cdb6899ce5"
					template={`<a href='{{link}}' target='_blank' class='InstagrammGallery__item'>
							<img class='InstagrammGallery__item__background' src='{{image}}' />
						</a>`}
				/>
			</div>
		</div>
	);
};

export default InstagrammGallery;
