'use client';

import * as React from 'react';
import type { ToastProps } from './toast.types';
import { toastVariants } from './toast.styles';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />,
  error: <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />,
  info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
};

export const Toast = ({
  message,
  variant = 'info',
  isOpen,
  onClose,
  duration = 3000,
  className,
}: ToastProps) => {
  React.useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <div className={toastVariants({ variant, isOpen, className })} role="status">
      <div className="flex items-center gap-2">
        {icons[variant]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        type="button"
        className="opacity-70 hover:opacity-100 focus:outline-none transition-opacity text-foreground"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
