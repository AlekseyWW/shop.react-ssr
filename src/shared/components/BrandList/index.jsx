import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import Icon from 'components/Icon';
import style from './styles.styl';
import brands from 'components/HeaderInfo/data.json';
function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}
const brandImages = requireAll(
	require.context('components/HeaderInfo/icons', true, /^\.\/.*\.svg$/)
);
const IconsArray = [];
brandImages.map(brand => {
	IconsArray[brand.default.id] = brand;
});
const BrandList = () => {
	return (
		<div className={style.BrandList}>
			<div className={style.BrandList__title}>Бренды</div>
			<div className={style.BrandList__list}>
				<div className={style.BrandList__wrapper}>
					{brands.map(item => (
						<Link
							to="/catalog"
							key={uuid.v4()}
							className={style.BrandList__item}
						>
							<div className={style.BrandList__img}>
								<Icon
									glyph={IconsArray[item.icon].default}
									width={40}
									height={20}
									className={style.HeaderInfo__brands__icon}
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default BrandList;
