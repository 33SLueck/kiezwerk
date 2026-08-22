import type { SectionSpacing, SectionTone } from './section.types';

const baseSectionClasses = 'w-full';

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-12',
};

const toneClasses: Record<SectionTone, string> = {
  default: '',
  muted: 'bg-muted',
};

export const getSectionClasses = (
  spacing: SectionSpacing = 'md',
  tone: SectionTone = 'default'
) => {
  const spacingClass = spacingClasses[spacing];
  const toneClass = toneClasses[tone];

  return [baseSectionClasses, spacingClass, toneClass].filter(Boolean).join(' ');
};
