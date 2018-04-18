import React from 'react';
import styles from './style.styl';import SideNavContent from 'components/SideNavContent';
import ContactBlock from 'components/ContactBlock';

const Info = () => (
	<div className={styles.Info}>
		<SideNavContent />
		<div className={styles.Info__inner}>
			<h2>СПОСОБ ОПЛАТЫ</h2>
			<ul className={styles.Info__paylist}>
				<li>
					<i>
						<img src="/cash.png" alt=""/>
					</i>
					<span>Оплатить заказ наличными можно на кассе магазина или при получении у курьера при доставке по городу Ростов-на-Дону</span>
				</li>
				<li>
					<i>
						<img src="/logo-robokassa.png" alt=""/>
					</i>
					<span>Оплата производится через защищённое соединение на сайте www.robokassa.ru.</span>
				</li>
			</ul>
			<h2>ДОСТАВКА ПО РОССИИ</h2>
			<p>Мы работаем по 100% предоплате плюс оплата за доставку.</p>
			<p> При заказе от 1500₽  доставка почтой РФ БЕСПЛАТНАЯ! При заказе от 8000₽ - скидка на доставку транспортной компанией СДЭК 500₽!* В среднем доставка занимает 7-15 дней почтой россии и 2-8 рабочих дней транспортной компанией СДЕК, не считая дня отправки.</p>
			<div className={styles.Info__deliverylist}>
				<p>Доставку осуществляют:</p>
				<ul>
					<li>EMS, Почта России</li>
					<li>Служба доставки Сдек</li>
				</ul>
				<div className={styles.Info__deliverylist__images}>
					<img src="/ems.png" alt=""/>
					<img src="/sdek.png" alt=""/>
				</div>
			</div>
			<img className={styles.Info__cureer} src="/cureer.png" alt=""/>
			<h2>КУРЬЕРОМ ПО РОСТОВУ-НА-ДОНУ</h2>
			<ul>
				<li>Оперативная доставка по Ростову-на-Дону (обычно в день оформления заказа или на следующий).</li>
				<li>Курьер предварительно свяжется с вами по телефону, чтобы уточнить удобное для вас время доставки.</li>
				<li>Стоимость доставки по Ростову-на-Дону – 290 руб.</li>
				<li>Обратите, пожалуйста, внимание, что в период распродаж сроки доставки заказов могут увеличиваться.</li>
			</ul>
			<h2>ЗАБРАТЬ САМОСТОЯТЕЛЬНО ИЗ МАГАЗИНА</h2>
			<p>Мы откладываем товар после предварительной оплаты.</p>
			<p>Услуга бесплатная.</p>
			<p>
				<img className={styles.Info__attention} src="/attention.png" alt=""/>
				Если вы не нашли удобный для вас способ доставки звоните нам.
			</p>
		</div>
		<ContactBlock />
	</div>
);


export default Info;
