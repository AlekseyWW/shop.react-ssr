import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import Navigation from 'components/Navigation';

import style from './styles.styl';

const Menu = ({ categories }) => (
	<div className={style.Menu}>
		<div className={style.Menu__container}>
			<Navigation categories={categories} />
			<div className={style.Menu__search}>
				<Input placeholder="поиск" />
			</div>
		</div>
	</div>
);

Menu.propTypes = {
	categories: PropTypes.array.isRequired
};

export default Menu;
