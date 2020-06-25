import React from 'react';
import './modal.css';

class Modal extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.visible ? (
                    <div className='d-flex justify-content-center align-items-center awesome-modal-wrapper'>
                        <div className='awesome-modal-background'>.</div>
                        <div className='d-flex justify-content-center align-items-center awesome-modal-inner-wrapper'>
                            {this.props.children}
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default Modal;