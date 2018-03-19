import React from 'react';
import PropTypes from 'prop-types';
import marker from './marker.svg';
import clock from './clock.svg';
import phone from './phone.svg';
import logo from './logo.svg';
import vk from './vk.svg';
import instagram from './instagram.svg';
import whatsup from './whatsup.svg';
import telegramm from './telegramm.svg';
import cart from './cart.svg';
import hurt from './hurt.svg';
import glass from './glass.svg';
import shadow from './shadow.svg';
import basket from './basket.svg';
import downArrow from './down-arrow.svg';
import heartSold from './heart-sold.svg';
import key from './key.svg';
import lock from './lock.svg';
import present from './present.svg';
import card from './card.svg';
import adress from './adress.svg';
// import fbIcon from './facebook.svg';
// import notesLogo from './chulakov-logo.svg';
// import lab from './chula-lab.svg';
// import targetBlanc from './target-blanc.svg';

const Icon = ({ className, glyph, width, height, ...rest }) => {
	const viewBox = glyph.viewBox.split(' ');
	const sizes = {
		width: width > 0 ? width : Number(viewBox[2]),
		height: height > 0 ? height : Number(viewBox[3]),
	};
	return (
		<svg
			className={`Icon ${className}`}
			viewBox={glyph.viewBox}
			{...sizes}
			{...rest}>
			<use xlinkHref={`#${glyph.id}`} />
		</svg>
	);
}

Icon.defaultProps = {
	className: '',
	width: undefined,
	height: undefined,
};

Icon.propTypes = {
	className: PropTypes.string,
	glyph: PropTypes.object.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

// export const LabIcon = props => <Icon glyph={lab} width={100} height={17} {...props} />;

export const MapMarker = props => <Icon glyph={marker} width={10.17} height={14.52} {...props} />;
export const ClockIcon = props => <Icon glyph={clock} width={10.17} height={14.52} {...props} />;
export const PhoneIcon = props => <Icon glyph={phone} width={10.17} height={14.52} {...props} />;
export const LogoIcon = props => <Icon glyph={logo} width={10.17} height={14.52} {...props} />;
export const WhatsupIcon = props => <Icon glyph={whatsup} width={24} height={24} {...props} />;
export const TelegrammIcon = props => <Icon glyph={telegramm} width={24} height={24} {...props} />;
export const InstagramIcon = props => <Icon glyph={instagram} width={24} height={24} {...props} />;
export const VkIcon = props => <Icon glyph={vk} width={24} height={24} {...props} />;
export const CartIcon = props => <Icon glyph={cart} width={24} height={24} {...props} />;
export const HurtIcon = props => <Icon glyph={hurt} width={27} height={23} {...props} />;
export const HeartSold = props => <Icon glyph={heartSold} width={27} height={23} {...props} />;
export const GlassIcon = props => <Icon glyph={glass} width={13} height={13} {...props} />;
export const ShadowIcon = props => <Icon glyph={shadow} width={1420} height={328} {...props} />;
export const BasketIcon = props => <Icon glyph={basket} width={25} height={30} {...props} />;
export const DownArrow = props => <Icon glyph={downArrow} width={12} height={8} {...props} />;
export const AdressIcon = props => <Icon glyph={adress} {...props} />;
export const CardIcon = props => <Icon glyph={card} {...props} />;
export const KeyIcon = props => <Icon glyph={key} {...props} />;
export const LockIcon = props => <Icon glyph={lock} {...props} />;
export const PresentIcon = props => <Icon glyph={present} {...props} />;

// export const FbIcon = props => <Icon glyph={fbIcon} width={24} height={24} {...props} />;

// export const NotesIcon = props => <Icon glyph={notesLogo} width={24} height={24} {...props} />;

// export const TargetBlanc = props => <Icon glyph={targetBlanc} width={10} height={10} {...props} />;

export default Icon;
