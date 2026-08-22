'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import type { FooterTeaserSectionProps } from './footer-teaser-section.types';
import {
  getFooterTeaserSectionActionsClasses,
  getFooterTeaserSectionCardClasses,
  getFooterTeaserSectionClasses,
  getFooterTeaserSectionContentClasses,
  getFooterTeaserSectionDescriptionClasses,
  getFooterTeaserSectionEyebrowClasses,
  getFooterTeaserSectionFooterClasses,
  getFooterTeaserSectionInnerClasses,
  getFooterTeaserSectionNoteClasses,
  getFooterTeaserSectionTitleClasses,
} from './footer-teaser-section.styles';

export const FooterTeaserSection = ({
  eyebrow,
  title,
  description,
  primaryActionLabel,
  primaryActionHref,
  secondaryActionLabel,
  secondaryActionHref,
  note,
  footer,
  className,
}: FooterTeaserSectionProps) => {
  return (
    <section className={getFooterTeaserSectionClasses(className)}>
      <div className={getFooterTeaserSectionInnerClasses()}>
        <div className={getFooterTeaserSectionCardClasses()}>
          <div className={getFooterTeaserSectionContentClasses()}>
            {eyebrow ? <p className={getFooterTeaserSectionEyebrowClasses()}>{eyebrow}</p> : null}
            <h2 className={getFooterTeaserSectionTitleClasses()}>{title}</h2>
            {description ? (
              <p className={getFooterTeaserSectionDescriptionClasses()}>{description}</p>
            ) : null}

            <div className={getFooterTeaserSectionActionsClasses()}>
              <Button asChild>
                <Link href={primaryActionHref}>{primaryActionLabel}</Link>
              </Button>

              {secondaryActionLabel && secondaryActionHref ? (
                <Button variant="ghost" asChild>
                  <Link href={secondaryActionHref}>{secondaryActionLabel}</Link>
                </Button>
              ) : null}
            </div>

            {note ? <p className={getFooterTeaserSectionNoteClasses()}>{note}</p> : null}
            {footer ? <div className={getFooterTeaserSectionFooterClasses()}>{footer}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
};
