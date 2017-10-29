import React from 'react';
import styles from './styles.styl';

export const BrandNote = () => {
	return (
		<div className={styles.BrandNote}>
			<span className={styles.BrandNote__title}>Студия Олега Чулакова</span>
			<span className={styles.BrandNote__text}>
				Создаем <nobr>digital&ndash;сервисы</nobr> для&nbsp;крупного бизнеса
			</span>
		</div>
	);
};

export default BrandNote;
