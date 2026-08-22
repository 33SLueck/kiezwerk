import type { DividerOrientation, DividerTone } from './divider.types';

const baseDividerClasses = 'shrink-0 bg-border';

const orientationClasses: Record<DividerOrientation, string> = {
  horizontal: 'h-px w-full',
  vertical: 'h-full w-px',
};

const toneClasses: Record<DividerTone, string> = {
  default: 'bg-border',
  muted: 'bg-muted',
};

export const getDividerClasses = (
  orientation: DividerOrientation = 'horizontal',
  tone: DividerTone = 'default'
) => {
  return [baseDividerClasses, orientationClasses[orientation], toneClasses[tone]]
    .filter(Boolean)
    .join(' ');
};
