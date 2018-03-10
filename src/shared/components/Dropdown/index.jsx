import React, { Component } from 'react';
import classNames from 'classnames';
import { DownArrow } from 'components/Icon';
import enhanceWithClickOutside from 'react-click-outside';
import Button from 'components/Button';
import style from './styles.styl';


class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.toogleBrands = this.toogleBrands.bind(this)
	}
	state = {
		isBrandOpen: false
	}
	toogleBrands() {
		if(this.state.isBrandOpen) this.props.onClose()
		this.setState({
			isBrandOpen: !this.state.isBrandOpen
		})
	}
	handleClickOutside() {
		if(this.state.isBrandOpen) this.props.onClose()
		this.setState({
			isBrandOpen: false
		})
	}
	render () {
		const { title, inner, count, button, buttons} = this.props;
		const dropdownCLass = classNames({
			[`${style.Dropdown__list}`]: true,
			[`${style.Dropdown__list_active}`]: this.state.isBrandOpen
		})
		const toogleStyle = classNames({
			[`${style.Dropdown__title}`]: true,
			[`${style.Dropdown__title_active}`]: this.state.isBrandOpen,
		})
		return (
			<div className={style.Dropdown}>
				<div className={style.Dropdown__label} >
					<div className={toogleStyle} onClick={this.toogleBrands}>{title} {count && `(${count})`} <DownArrow /></div>
				</div>
				<div className={dropdownCLass}>
					{inner}
					{button && (
						<div className={style.Dropdown__action}>
							<Button onClick={button.onClick} sm>{button.text}</Button>
						</div>
					)}
					{buttons && 
						<div className={style.Dropdown__action}>
						{
							buttons.map((button, id) => {
								const key = `button-${id}`;
								return <Button key={key} onClick={button.onClick} sm>{button.text}</Button>
							})
						}
						</div>
					}
				</div>

			</div>
		)
	}
}

export default enhanceWithClickOutside(Dropdown);