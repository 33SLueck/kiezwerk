import type { HeroAlignment, HeroSize, HeroTone } from './hero.types';

const baseHeroClasses = 'w-full';

const toneClasses: Record<HeroTone, string> = {
  default: 'bg-background text-foreground',
  muted: 'bg-muted/40 text-foreground',
};

const sizeClasses: Record<HeroSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
};

const alignmentClasses: Record<HeroAlignment, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
};

const innerClasses: Record<HeroAlignment, string> = {
  left: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
  center: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
};

const contentGridClasses: Record<HeroAlignment, string> = {
  left: 'grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:gap-12',
  center: 'grid gap-10 md:grid-cols-1 md:gap-12',
};

const textClasses: Record<HeroAlignment, string> = {
  left: 'flex max-w-3xl flex-col gap-6',
  center: 'mx-auto flex max-w-3xl flex-col items-center gap-6',
};

type HeroStyleOptions = {
  alignment?: HeroAlignment;
  tone?: HeroTone;
  size?: HeroSize;
  className?: string;
};

export const getHeroClasses = ({
  alignment = 'left',
  tone = 'default',
  size = 'lg',
  className,
}: HeroStyleOptions = {}) => {
  return [
    baseHeroClasses,
    toneClasses[tone],
    sizeClasses[size],
    alignmentClasses[alignment],
    className,
  ]
    .filter(Boolean)
    .join(' ');
};

export const getHeroInnerClasses = (_alignment: HeroAlignment = 'left') => {
  return [innerClasses.left].filter(Boolean).join(' ');
};

export const getHeroContentClasses = (alignment: HeroAlignment = 'left') => {
  return [contentGridClasses[alignment]].filter(Boolean).join(' ');
};

export const getHeroTextClasses = (alignment: HeroAlignment = 'left') => {
  return [textClasses[alignment]].filter(Boolean).join(' ');
};
