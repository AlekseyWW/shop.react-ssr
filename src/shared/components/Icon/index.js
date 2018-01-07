import React from 'react';
import PropTypes from 'prop-types';
import marker from './marker.svg';
import clock from './clock.svg';
import phone from './phone.svg';
import logo from './logo.svg';
import vk from './vk.svg';
import instagram from './instagram.svg';
import whatsup from './whatsup.svg';
import cart from './cart.svg';
import hurt from './hurt.svg';
import glass from './glass.svg';
import shadow from './shadow.svg';
import basket from './basket.svg';
// import fbIcon from './facebook.svg';
// import notesLogo from './chulakov-logo.svg';
// import lab from './chula-lab.svg';
// import targetBlanc from './target-blanc.svg';

const Icon = ({ className, glyph, width, height, ...rest }) => (
	<svg
		className={`Icon ${className}`}
		viewBox={glyph.viewBox}
		width={width}
		height={height}
		{...rest}>
		<use xlinkHref={`#${glyph.id}`} />
	</svg>
);

Icon.defaultProps = {
	className: '',
	width: 16,
	height: 16,
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
export const InstagramIcon = props => <Icon glyph={instagram} width={24} height={24} {...props} />;
export const VkIcon = props => <Icon glyph={vk} width={24} height={24} {...props} />;
export const CartIcon = props => <Icon glyph={cart} width={24} height={24} {...props} />;
export const HurtIcon = props => <Icon glyph={hurt} width={27} height={23} {...props} />;
export const GlassIcon = props => <Icon glyph={glass} width={13} height={13} {...props} />;
export const ShadowIcon = props => <Icon glyph={shadow} width={1420} height={328} {...props} />;
export const BasketIcon = props => <Icon glyph={basket} width={25} height={30} {...props} />;

// export const FbIcon = props => <Icon glyph={fbIcon} width={24} height={24} {...props} />;

// export const NotesIcon = props => <Icon glyph={notesLogo} width={24} height={24} {...props} />;

// export const TargetBlanc = props => <Icon glyph={targetBlanc} width={10} height={10} {...props} />;

export default Icon;
