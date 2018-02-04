import React, { Component } from 'react';
import Button from 'components/Button';
import htmlParser from 'react-html-parser';
import deliver from './deliver.jpg';
import order from './order.jpg';
import './styles.css';

const images = {
    deliver,
    order
}
class ModalExample extends Component {
    render() {
        const { title, text, subTitle, buttons, status, className } = this.props.modalProps;

        return (
            <div className={`ModalExample ${className}`}>
                {status && <div className="ModalExample__photo">
                    <img src={images[status]} className="ModalExample__image"/>
                </div>}
                <div className="ModalExample__inner">
                    {(title || subTitle) && (
                        <div className="ModalExample__header">
                            {title && (
                                <h1>
                                    {htmlParser(title)}
                                </h1>
                            )}
                            {subTitle && (
                                <h2 className="ModalExample__subTitle" level={4}>
                                    {htmlParser(subTitle)}
                                </h2>
                            )}
                        </div>
                    )}
                    <div className="ModalExample__photo-mob">
                        <img src={images[status]} className="ModalExample__image" />
                    </div>
                    {text && (
                        <div className="ModalExample__body">
                            <div className="ModalExample__text">{text}</div>
                            {buttons && (
                                <div className="ModalExample__buttons">
                                    {buttons.map((buttonProps, i) => {
                                        return <Button {...buttonProps} key={`ModalButton${i}`} />;
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ModalExample;
