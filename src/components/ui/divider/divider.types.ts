export type DividerElement = 'hr' | 'div';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerTone = 'default' | 'muted';

export interface DividerProps {
  className?: string;
  as?: DividerElement;
  orientation?: DividerOrientation;
  tone?: DividerTone;
  decorative?: boolean;
}
