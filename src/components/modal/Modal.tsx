import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { createPortal } from 'react-dom';
import Footer from '../footer/Footer';
import Logo from '../logo/Logo';
import './modal.scss';

export interface ModalProps {
  children: React.ReactNode,
  onModalClose: () => void
}

const MODAL_ROOT = document.getElementById('modal');

export default class Modal extends React.Component<ModalProps, Record<string, never>> {
  element: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);
    this.element = document.createElement('div');
    this.element.classList.add('modal-container');
    this.handleCloseClick.bind(this);
  }

  componentDidMount(): void {
    MODAL_ROOT.appendChild(this.element);
  }

  componentWillUnmount(): void {
    MODAL_ROOT.removeChild(this.element);
  }

  handleCloseClick(): void {
    this.props.onModalClose();
  }

  public render(): React.ReactPortal {
    const modalElement = (
      <>
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
      </>
    );
    return createPortal(modalElement, this.element);
  }
}
