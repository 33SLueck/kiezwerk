import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { AlertProps } from './alert.types';
import { getAlertClasses } from './alert.styles';

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = 'default',
  title,
  description,
  icon,
  children,
}) => {
  return (
    <div role="alert" className={cn(getAlertClasses(variant), className)}>
      {icon ? <div className="mt-0.5 shrink-0">{icon}</div> : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? <div className="font-medium">{title}</div> : null}
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
        {children}
      </div>
    </div>
  );
};
