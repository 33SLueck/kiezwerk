'use client';

import * as React from 'react';
import type { ModalProps } from './modal.types';
import {
  getModalContainerClasses,
  getModalHeaderClasses,
  getModalTitleClasses,
  getModalCloseButtonClasses,
  getModalContentClasses,
  getModalFooterClasses,
} from './modal.styles';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, footer, className }: ModalProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNativeClose = () => {
    // Avoid double triggering onClose if dialog is closed natively (like ESC key)
    if (isOpen) {
      onClose();
    }
  };

  // Fallback click outside to close (light dismiss)
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const clickListener = (event: MouseEvent) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        onClose();
      }
    };

    dialog.addEventListener('click', clickListener);
    return () => dialog.removeEventListener('click', clickListener);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={handleNativeClose}
      closedby="any"
      className={getModalContainerClasses(isOpen, className)}
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div className={getModalHeaderClasses()}>
        {title ? (
          <h2 id="modal-title" className={getModalTitleClasses()}>
            {title}
          </h2>
        ) : (
          <div />
        )}
        <button
          type="button"
          className={getModalCloseButtonClasses()}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className={getModalContentClasses()}>{children}</div>
      {footer ? <div className={getModalFooterClasses()}>{footer}</div> : null}
    </dialog>
  );
};
