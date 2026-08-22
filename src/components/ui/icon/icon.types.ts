import type { LucideIcon } from 'lucide-react';
import type React from 'react';

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
  strokeWidth?: number;
  decorative?: boolean;
  title?: string;
} & Omit<React.SVGAttributes<SVGSVGElement>, 'children'>;
