export interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  className?: string;
  isSubmitting?: boolean;
  error?: string;
  successMessage?: string;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
}
