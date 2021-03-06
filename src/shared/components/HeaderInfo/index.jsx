import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import uuid from 'uuid';
import Icon, {
	MapMarker,
	ClockIcon,
	PhoneIcon,
	LoginIcon,
	LoguotIcon,
} from 'components/Icon';
import style from './styles.styl';
import brands from './data.json';
import { LogoutIcon } from '../Icon';
function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}
const brandImages = requireAll(
	require.context('./icons', true, /^\.\/.*\.svg$/)
);
const IconsArray = [];
brandImages.map(brand => {
	IconsArray[brand.default.id] = brand;
});
const HeaderInfo = ({ data, loginModalOpen, logout }) => {
	const textStyle = className({
		[`${style.HeaderInfo__contacts__item}`]: true,
		[`${style.HeaderInfo_text}`]: true,
	});
	const workTimeStyle = className({
		[`${style.HeaderInfo__contacts__item}`]: true,
		[`${style.HeaderInfo__worktime}`]: true,
	});
	return (
		<div className={style.HeaderInfo__container}>
			<div className={style.HeaderInfo__brands}>
				{brands.map(item => {
					const viewBox = IconsArray[item.icon].default.viewBox.split(
						' '
					);
					return (
						<div
							key={uuid.v4()}
							className={style.HeaderInfo__brands__item}
						>
							<Icon
								glyph={IconsArray[item.icon].default}
								width={40}
								height={20}
								className={style.HeaderInfo__brands__icon}
							/>
						</div>
					);
				})}
				<div className={style.HeaderInfo__brands__item}>
					<span>{'& more'}</span>
				</div>
			</div>
			<div className={style.HeaderInfo__nav}>
				<a href={data.contacts.phone.url} className={textStyle}>
					<span>Ростовская обл.:</span>
					<span>
						<PhoneIcon className={style.HeaderInfo__icon} />
						<span>{data.contacts.phone.text}</span>
					</span>
				</a>
				<a href={data.contacts.phoneRussia.url} className={textStyle}>
					<span>Россия:</span>
					<span>
						<PhoneIcon className={style.HeaderInfo__icon} />
						<span>{data.contacts.phoneRussia.text}</span>
					</span>
				</a>
				<div className={style.HeaderInfo__login}>
					<LoginIcon onClick={loginModalOpen} />
					{logout && <LogoutIcon onClick={logout} />}
				</div>
			</div>
		</div>
	);
};

HeaderInfo.propTypes = {
	data: PropTypes.object.isRequired,
};

export default HeaderInfo;
