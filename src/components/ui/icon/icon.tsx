import type React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
  strokeWidth?: number;
  decorative?: boolean;
  title?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, 'children'>;

export const Icon = ({
  icon: LucideIconComponent,
  size = 20,
  className,
  strokeWidth = 2,
  decorative = true,
  title,
  ...props
}: IconProps) => {
  return (
    <LucideIconComponent
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
      className={cn('shrink-0', className)}
      {...props}
    />
  );
};
