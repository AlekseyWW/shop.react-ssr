import React, { Component } from 'react';
import Button from 'components/Button';
import './styles.css';

class ModalExample extends Component {
    render() {
        const { title, text, subTitle, buttons } = this.props.modalProps;
        return (
            <div className="ModalExample">
                {(title || subTitle) && (
                    <div className="ModalExample__header">
                        {title && (
                            <h1>
                                {title}
                            </h1>
                        )}
                        {subTitle && (
                            <h2 className="ModalExample__subTitle" level={4}>
                                {subTitle}
                            </h2>
                        )}
                    </div>
                )}
                {text && (
                    <div className="ModalExample__body">
                        <div className="ModalExample__text">{text}</div>
                    </div>
                )}
                {buttons && (
                    <div className="ModalExample__buttons">
                        {buttons.map((buttonProps, i) => {
                            return <Button {...buttonProps} key={`ModalButton${i}`} />;
                        })}
                    </div>
                )}
            </div>
        );
    }
}

export default ModalExample;
