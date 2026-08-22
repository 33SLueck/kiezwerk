export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

export interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  className?: string;
}
