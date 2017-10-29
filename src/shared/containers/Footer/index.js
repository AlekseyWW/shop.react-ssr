import React from 'react';
import Input from 'components/Input';
import { LogoIcon, VkIcon, InstagramIcon, WhatsupIcon } from 'components/Icon';

import style from './styles.styl';

const Footer = () => (
	<div className={style.Footer}>
		<div className={style.Footer__container}>
			<div className={style.Footer__column}>
				<div className={style.Footer__phone}>
					<div>телефон</div>
					<div>+7 (918) 524-47-54</div>
				</div>
				<div className={style.Footer__logo}>
					<LogoIcon width={160} height={60} className={style.Footer__logo__img} />
				</div>
				<div className={style.Footer__address}>
					344022, Ростов-на-Дону, ул.Пушкинская,  225 Режим работы с 10.00-20.00 ежедневно
				</div>
			</div>
			<div className={style.Footer__column}>
				<div className={style.Footer__social}>
					<div className={style.Footer__social__title}>
						социальный сети
					</div>
					<div className={style.Footer__social__icons}>
						<div className={style.Footer__social__icon}>
							<InstagramIcon />
						</div>
						<div className={style.Footer__social__icon}>
							<VkIcon/>
						</div>
						<div className={style.Footer__social__icon}>
							<WhatsupIcon />
						</div>
					</div>
				</div>
				<div className={style.Footer__buyer}>
					<div className={style.Footer__buyer__title}>
						Покупателю
					</div>
					<div className={style.Footer__links}>
						<div className={style.Footer__links__column}>
							<div className={style.Footer__link}>
							Магазин
							</div>
							<div className={style.Footer__link}>
							Новости
							</div>
							<div className={style.Footer__link}>
							Контакты
							</div>
							<div className={style.Footer__link}>
							Оплата и доставка
							</div>
							<div className={style.Footer__link}>
							Обмен и возврат
							</div>
						</div>
						<div className={style.Footer__links__column}>
							<div className={style.Footer__link}>
							Программа лояльности
							</div>
							<div className={style.Footer__link}>
							Конфиденциальность
							</div>
							<div className={style.Footer__link}>
							Вакансии
							</div>
							<div className={style.Footer__link}>
							Сотрудничество
							</div>
						</div>
					</div>
					
				</div>
			</div>
			<div className={style.Footer__column}>
				<div className={style.Footer__feedback}>
					<div className={style.Footer__feedback__title}>
					рассылка
					</div>
					<div className={style.Footer__feedback__input}>
						<Input className={style.Footer__feedback__field} placeholder="Твой e-mail" />
						<button className={style.Footer__feedback__button}>ок</button>
					</div>
					<div className={style.Footer__feedback__text}>
					Подписываясь на рассылку, вы соглашаетесь с&nbsp;условиями оферты и&nbsp;политики конфиденциальности
					</div>
					<div className={style.Footer__feedback__note}>
					магазин женских и&nbsp;мужских кроссовок  2017
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Footer;

