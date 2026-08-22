import * as React from 'react';
import type { GallerySectionProps } from './gallery-section.types';
import {
  getGallerySectionClasses,
  getGallerySectionInnerClasses,
  getGalleryGridClasses,
  imageWrapperVariants,
} from './gallery-section.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export const GallerySection = ({ title, subtitle, images, className }: GallerySectionProps) => {
  return (
    <section className={getGallerySectionClasses(className)}>
      <div className={getGallerySectionInnerClasses()}>
        {title || subtitle ? (
          <div className="mx-auto max-w-2xl text-center mb-16">
            {subtitle ? (
              <Text
                as="p"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2"
              >
                {subtitle}
              </Text>
            ) : null}
            {title ? (
              <Heading level={2} size="xl">
                {title}
              </Heading>
            ) : null}
          </div>
        ) : null}

        <div className={getGalleryGridClasses()}>
          {images.map((image, index) => (
            <div key={index} className={imageWrapperVariants({ aspectRatio: image.aspectRatio })}>
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.caption ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm font-medium text-white">{image.caption}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
