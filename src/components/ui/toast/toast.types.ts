export interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  className?: string;
}
