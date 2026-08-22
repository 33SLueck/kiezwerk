'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import type { CtaSectionProps } from './cta-section.types';
import {
  getCtaSectionActionsClasses,
  getCtaSectionCardClasses,
  getCtaSectionClasses,
  getCtaSectionContentGridClasses,
  getCtaSectionDescriptionClasses,
  getCtaSectionEyebrowClasses,
  getCtaSectionInnerClasses,
  getCtaSectionNoteClasses,
  getCtaSectionTitleClasses,
  getCtaSectionVisualWrapClasses,
} from './cta-section.styles';

export const CtaSection = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  note,
  visual,
  tone = 'default',
  className,
}: CtaSectionProps) => {
  const hasVisual = Boolean(visual);

  return (
    <section className={getCtaSectionClasses(tone, className)}>
      <div className={getCtaSectionInnerClasses()}>
        <div className={getCtaSectionCardClasses()}>
          <div className={getCtaSectionContentGridClasses()}>
            <div className="flex flex-col gap-6">
              {eyebrow ? <p className={getCtaSectionEyebrowClasses()}>{eyebrow}</p> : null}

              <h2 className={getCtaSectionTitleClasses()}>{title}</h2>

              {description ? (
                <p className={getCtaSectionDescriptionClasses()}>{description}</p>
              ) : null}

              <div className={getCtaSectionActionsClasses()}>
                <Button asChild>
                  <Link
                    href={primaryAction.href}
                    target={primaryAction.external ? '_blank' : undefined}
                    rel={primaryAction.external ? 'noreferrer' : undefined}
                  >
                    {primaryAction.label}
                  </Link>
                </Button>

                {secondaryAction ? (
                  <Button variant="ghost" asChild>
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  </Button>
                ) : null}
              </div>

              {note ? <p className={getCtaSectionNoteClasses()}>{note}</p> : null}
            </div>

            {hasVisual ? <div className={getCtaSectionVisualWrapClasses()}>{visual}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
};
