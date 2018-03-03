import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './styles.styl';

export class NavLink extends Component {
	state = {
		isActive: false
	}
	onMouseEnterHandler = () => { this.setState({ isActive: true }); }
	onMouseLeaveHandler = () => { this.setState({ isActive: false }); }
	render() {
		const { category } = this.props;
		const linkStyle = classNames({
			[`${style.Navigation__content}`]: true,
			[`${style.Navigation__content_visible}`]: this.state.isActive
		});
		const titleStyle = classNames({
			[`${style.Navigation__title}`]: true,
			[`${style.Navigation__title_main}`]: true,
			[`${style.Navigation__title_link}`]: true
		});
		const subtitleStyle = classNames({
			[`${style.Navigation__title}`]: true,
			[`${style.Navigation__title_main}`]: true,
		});
		const textStyle = classNames({
			[`${style.Navigation__title}`]: true,
			[`${style.Navigation__title_link}`]: true,
		});
		return (
			<div
				key={category.id}
				className={style.Navigation__item}
				onMouseEnter={this.onMouseEnterHandler}
				onMouseLeave={this.onMouseLeaveHandler}
			>
				<div className={style.Navigation__title}>
					{category.slug ? 
						<Link to={`/catalog/${category.slug}`} className={subtitleStyle}>
							{category.name}
						</Link> :
						<span className={textStyle}>
							{category.name}
						</span>
					}
				</div>
				{ category.items &&
					<div className={linkStyle}>
						{ category.items.map(item => (
						<Link key={item.id} to={`/catalog/${item.slug}`} className={textStyle} >
								{item.name}
							</Link> 
						))}
					</div>
				}
			</div>
		);
	}
}

NavLink.propTypes = {
	category: PropTypes.object.isRequired
};

const Navigation = ({ categories }) => (
	<div className={style.Navigation}>
		{categories.map(category => <NavLink key={category.id} category={category} />) }
	</div>
);

Navigation.propTypes = {
	categories: PropTypes.array.isRequired
};

export default Navigation;
