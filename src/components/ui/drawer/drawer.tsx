'use client';

import * as React from 'react';
import type { DrawerProps } from './drawer.types';
import { drawerVariants } from './drawer.styles';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className,
}: DrawerProps) => {
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
      className={drawerVariants({ side, isOpen, className })}
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      <div className="flex items-center justify-between pb-4 border-b border-border">
        {title ? (
          <h2 id="drawer-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
        ) : (
          <div />
        )}
        <button
          type="button"
          className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none transition-opacity text-foreground"
          onClick={onClose}
          aria-label="Close drawer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="py-6 text-sm text-muted-foreground h-full overflow-y-auto">{children}</div>
    </dialog>
  );
};
