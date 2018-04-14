import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { omit } from 'lodash';
import { BasketIcon } from 'components/Icon';
import Button from 'components/Button';
import RecoveryForm from 'components/RecoveryForm';
import OrderProducts from 'components/OrderProducts';
import ProductCard from 'components/ProductCard';
import * as cartAtions from 'actions/cart';
import * as authActions from 'actions/user';
import { HeartSold, AdressIcon, CardIcon, KeyIcon, LockIcon, PresentIcon } from 'components/Icon'
import styles from './style.styl';

class Agreement extends Component {
	componentDidMount() {
		const accessToken = localStorage.getItem("accessToken");
		const { profileIsLoaded, profileIsLoading, ordersIsLoaded, ordersIsLoading, getProfile, getOrders } = this.props
		if (!accessToken) {
			this.props.history.replace('/')
		} else {
			!profileIsLoaded && !profileIsLoading && getProfile();
			!ordersIsLoaded && !ordersIsLoading && getOrders();
		}
	}
	render() {
		const { products, addToCart, removeFromCart, profile, favorites, orders } = this.props;
		
		return (
			<div className="page__inner">
				<div className={styles.Agreement}>
					<h1>Политика обработки персональных данных</h1>
					<h2>1. Общие положения</h2>
					<p>1.1 Ооо "NEWSTEP" (далее по тексту – Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.</p>
					<p>1.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта newstep.store. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.</p>
					<p></p>
					<h2>2. Основные понятия, используемые в Политике:</h2>
					<p>2.1 Веб-сайт - совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу newstep.store;</p>
					<p>2.2 Пользователь – любой посетитель веб-сайта newstep.store;</p>
					<p>2.3 Персональные данные – любая информация, относящаяся к Пользователю веб-сайта newstep.store;</p>
					<p>2.4 Обработка персональных данных - любое действие с персональными данными, совершаемые с использованием ЭВМ, равно как и без их использования;</p>
					<p>2.5 Обезличивание персональных данных – действия, результатом которых является невозможность без использования дополнительной информации определить принадлежность персональных данных конкретному Пользователю или лицу;</p>
					<p>2.6 Распространение персональных данных – любые действия, результатом которых является раскрытие персональных данных неопределенному кругу лиц;</p>
					<p>2.7 Предоставление персональных данных – любые действия, результатом которых является раскрытие персональных данных определенному кругу лиц;</p>
					<p>2.8 Уничтожение персональных данных – любые действия, результатом которых является безвозвратное уничтожение персональных на ЭВМ или любых других носителях.</p>
					<p></p>
					<h2>3. Оператор может обрабатывать следующие персональные данные Пользователя:</h2>
					<p>3.1 Список персональных данных, которые обрабатывает оператор: фамилия, имя, отчество, номер телефона, адрес электронной почты, почтовый адрес.</p>
					<p>3.2. Кроме того, на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика, Гугл Аналитика и других).</p>
					<p></p>
					<h2>4. Цели обработки персональных данных</h2>
					<p>4.1 Персональные данные пользователя - фамилия, имя, отчество, номер телефона, адрес электронной почты, почтовый адрес - обрабатываются со следующей целью: "Уточнение деталей и отправка заказа клиенту. Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес mail@mail.ru</p>
					<p>4.2 Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.</p>
					<p></p>
					<h2>5. Правовые основания обработки персональных данных</h2>
					<p>5.1 Оператор обрабатывает персональные данные Пользователя только в случае их отправки Пользователем через формы, расположенные на веб-сайте newstep.store. Отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.</p>
					<p>5.2 Оператор обрабатывает обезличенные данные о Пользователе в случае, если Пользователь разрешил это в настройках браузера (включено сохранение файлов «cookie» и использование технологии JavaScript).</p>
					<p></p>
					<h2>6. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h2>
					<p>6.1 Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
					<p>6.2 Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.</p>
					<p>6.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их, направив Оператору уведомление с помощью электронной почты на электронный адрес Оператора mail@mail.ru, либо на почтовый адрес Оператора Ростов-на-дону, ул. Пушкинская 225, с пометкой «Актуализация персональных данных».</p>
					<p>6.3 Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление с помощью электронной почты на электронный адрес Оператора mail@mail.ru, либо на почтовый адрес Оператора Ростов-на-дону, ул. Пушкинская 225, с пометкой «Отзыв согласия на обработку персональных данных».</p>
					<p></p>
					<h2>7. Заключительные положения</h2>
					<p>7.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты mail@mail.ru, либо на почтовый адрес Оператора Ростов-на-дону, ул. Пушкинская 225.</p>
					<p>7.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. В случае существенных изменений Пользователю может быть выслана информация на указанный им электронный адрес.</p>
				</div>
			</div>
		);
	}
}


Agreement.propTypes = {
	isFetched: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	addToCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	const { isFetched, isFetching, added } = state.cart;
	const favorites = state.favorites;
	const { profile, accessToken, profileIsLoaded, profileIsLoading, orders, ordersIsLoaded, ordersIsLoading} = state.user;
	
	const products = added;
	return { isFetched, isFetching, products, profile, profileIsLoaded, profileIsLoading, accessToken, favorites, orders, ordersIsLoaded, ordersIsLoading };
};

const mapDispatchToProps = dispatch => ({
	// getCart: () => dispatch(cartAction.getCart()),
	addToCart: (product, remove) => dispatch(cartAtions.addToCart(product, remove)),
	removeFromCart: product => dispatch(cartAtions.removeFromCart(product)),
	getProfile: (favorites) => dispatch(authActions.getProfile(favorites)),
	changePassword: (data) => dispatch(authActions.changePassword(data)),
	getOrders: (favorites) => dispatch(authActions.getOrders(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(Agreement);
