'use client';

import * as React from 'react';
import type { FileUploadProps } from './file-upload.types';
import { getFileUploadContainerClasses } from './file-upload.styles';
import { UploadCloud } from 'lucide-react';

export const FileUpload = ({
  onFileSelect,
  accept,
  multiple = false,
  disabled = false,
  className,
}: FileUploadProps) => {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (onFileSelect) onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (onFileSelect) onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={getFileUploadContainerClasses(isDragActive, disabled, className)}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
      />
      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-foreground">Click to upload or drag & drop</p>
      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
    </div>
  );
};
