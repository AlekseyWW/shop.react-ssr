import React from 'react';
import { VkIcon } from 'components/Icon';
import Icon from 'components/Icon';
import style from './styles.styl';
import data from './data.json';
import SvgPicture from './icons/icon-school.svg';

import notes from './icons/icon-ch-notes.svg';
import book from './icons/icon-manager-book.svg';
import school from './icons/icon-school.svg';
const Icons = {
	notes,
	book,
	school,
};
const LabBlock = () => (
	<div className={style.LabBlock}>
		<div className={style.LabBlock__container}>
			{data.map(item => (
				<div key={item.id} className={style.LabBlock__item}>
					<a href={item.url} className={style.LabBlock__top}>
						<div key={item.id} className={style.LabBlock__icon}>
							<Icon glyph={Icons[item.icon]} fill="#000000" width={40} height={40} />
						</div>
						<span
							className={style.LabBlock__title}
							dangerouslySetInnerHTML={{ __html: item.title }}
						/>
					</a>
					<div
						className={style.LabBlock__text}
						dangerouslySetInnerHTML={{ __html: item.text }}
					/>
				</div>
			))}
		</div>
	</div>
);

export default LabBlock;
