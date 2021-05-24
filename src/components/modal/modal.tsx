import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { createPortal } from 'react-dom';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import './modal.scss';

export interface ModalProps {
  children: React.ReactNode,
  onModalClose: () => void
}

export default class Modal extends React.Component<ModalProps, Record<string, never>> {

  handleCloseClick = (): void => {
    this.props.onModalClose();
  }

  public render(): React.ReactNode {
    // eslint-disable-next-line no-extra-parens
    return (
      <div className="modal-container">
        <div className="modal-header">
          <Logo />
        </div>
        <div className="modal">
          <button className="button-dark modal__close_btn" onClick={this.handleCloseClick}>
            <CloseIcon fontSize="large" />
          </button>
          <div className="modal__children_container">
            {this.props.children}
          </div>
        </div>
        <div className="spacer" />
        <Footer />
      </div>
    );
  }
}
