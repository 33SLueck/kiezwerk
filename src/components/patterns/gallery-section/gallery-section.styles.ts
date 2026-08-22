import { cva } from 'class-variance-authority';

export const getGallerySectionClasses = (className?: string) => {
  return ['w-full bg-background py-20 sm:py-24', className].filter(Boolean).join(' ');
};

export const getGallerySectionInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
};

export const getGalleryGridClasses = () => {
  return 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12';
};

export const imageWrapperVariants = cva(
  'overflow-hidden rounded-lg border border-border bg-muted relative group',
  {
    variants: {
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
      },
    },
    defaultVariants: {
      aspectRatio: 'square',
    },
  }
);
