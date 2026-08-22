export interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}
