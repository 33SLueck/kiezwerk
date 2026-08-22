import { Star } from 'lucide-react';
import type { TestimonialsSectionProps } from './testimonials-section.types';
import {
  getTestimonialsSectionAvatarClasses,
  getTestimonialsSectionCardClasses,
  getTestimonialsSectionClasses,
  getTestimonialsSectionDescriptionClasses,
  getTestimonialsSectionEyebrowClasses,
  getTestimonialsSectionFooterClasses,
  getTestimonialsSectionGridClasses,
  getTestimonialsSectionHeaderClasses,
  getTestimonialsSectionInnerClasses,
  getTestimonialsSectionMetaClasses,
  getTestimonialsSectionNameClasses,
  getTestimonialsSectionRatingClasses,
  getTestimonialsSectionRoleClasses,
  getTestimonialsSectionQuoteClasses,
  getTestimonialsSectionTitleClasses,
} from './testimonials-section.styles';

export const TestimonialsSection = ({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  className,
}: TestimonialsSectionProps) => {
  return (
    <section className={getTestimonialsSectionClasses(className)}>
      <div className={getTestimonialsSectionInnerClasses()}>
        <div className={getTestimonialsSectionHeaderClasses()}>
          {eyebrow ? <p className={getTestimonialsSectionEyebrowClasses()}>{eyebrow}</p> : null}
          <h2 className={getTestimonialsSectionTitleClasses()}>{title}</h2>
          {description ? (
            <p className={getTestimonialsSectionDescriptionClasses()}>{description}</p>
          ) : null}
        </div>

        <div className={getTestimonialsSectionGridClasses(columns)}>
          {items.map((item) => (
            <article key={item.name} className={getTestimonialsSectionCardClasses()}>
              {typeof item.rating === 'number' ? (
                <div className={getTestimonialsSectionRatingClasses()}>
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              ) : null}

              <p className={getTestimonialsSectionQuoteClasses()}>&ldquo;{item.quote}&rdquo;</p>

              <div className={getTestimonialsSectionFooterClasses()}>
                <div className={getTestimonialsSectionAvatarClasses()}>
                  {item.avatar ? item.avatar : item.name.slice(0, 1)}
                </div>

                <div className={getTestimonialsSectionMetaClasses()}>
                  <span className={getTestimonialsSectionNameClasses()}>{item.name}</span>
                  <span className={getTestimonialsSectionRoleClasses()}>
                    {item.role}
                    {item.role && item.company ? ' · ' : ''}
                    {item.company}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
