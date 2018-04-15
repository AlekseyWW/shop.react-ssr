import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import uuid from 'uuid';
import Icon, { MapMarker, ClockIcon, PhoneIcon } from 'components/Icon';
import style from './styles.styl';
import brands from './data.json';
function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}
const brandImages = requireAll(require.context('./icons', true, /^\.\/.*\.svg$/));
const IconsArray = [];
brandImages.map(brand => {IconsArray[brand.default.id] = brand});
const HeaderInfo = ({ data }) => {
	const textStyle = className({
		[`${style.HeaderInfo__contacts__item}`]: true,
		[`${style.HeaderInfo_text}`]: true
	})
	const workTimeStyle = className({
		[`${style.HeaderInfo__contacts__item}`]: true,
		[`${style.HeaderInfo__worktime}`]: true
	})
	return (
		<div className={style.HeaderInfo__container}>
			<div className={style.HeaderInfo__contacts}>
				{/* <a href={data.contacts.location.url} className={textStyle} target="_blank">
					<MapMarker className={style.HeaderInfo__icon} />
					{data.contacts.location.text}
				</a> */}
				<p className={workTimeStyle}>
					<ClockIcon className={style.HeaderInfo__icon} />
					<span className={style.HeaderInfo__worktime__start}>{ data.contacts.workTime.start }</span>
					<span>{ data.contacts.workTime.end }</span>
				</p>
			</div>
			{/* <div className={style.HeaderInfo__brands}>
				{brands.map(item => {
					const viewBox = IconsArray[item.icon].default.viewBox.split(' ');
					const width = Number(viewBox[2]);
					const height = Number(viewBox[3]);
					return (
						<div key={uuid.v4()} className={style.HeaderInfo__brands__item}>
							<Icon glyph={IconsArray[item.icon].default} width={40} height={20} className={style.HeaderInfo__brands__icon} />
						</div>
					);
				})}
				<div className={style.HeaderInfo__brands__item}>
					<span>{'& more'}</span>
				</div>
			</div> */}
			<div className={style.HeaderInfo__nav}>
				<a href={data.contacts.phone.url} className={textStyle}>
					<span>Ростовская обл.:</span>
					<span>
						<PhoneIcon className={style.HeaderInfo__icon} />
						<span>
							{data.contacts.phone.text}
						</span>
					</span>
					
				</a>
				<a href={data.contacts.phoneRussia.url} className={textStyle}>
					<span>Россия:</span>
					<span>
						<PhoneIcon className={style.HeaderInfo__icon} />
						<span>
							{data.contacts.phoneRussia.text}
						</span>
					</span>
					
				</a>
				{/* <p className={textStyle}>
					<span>
						{ data.help.name}
					</span>
				</p> */}
			</div>
		</div>
	)
};

HeaderInfo.propTypes = {
	data: PropTypes.object.isRequired
};

export default HeaderInfo;
