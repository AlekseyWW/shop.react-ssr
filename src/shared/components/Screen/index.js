import React from 'react';
import ClassNames from 'classnames';
import style from './styles.styl';

const Screen = (props) => {
	const screenStyle = ClassNames({
		[`${style.Screen}`]: true,
		[`${style.Screen_fullscreen}`]: props.fullScreen
	});
	return (
		<section className={screenStyle}>
			<div className={style.Screen__content}>
				{props.children}
			</div>
		</section>
	)
}

export default Screen;