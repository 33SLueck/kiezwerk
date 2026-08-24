'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/button';
import type { CtaSectionAction, CtaSectionProps } from './cta-section.types';
import {
  getCtaPrimaryButtonClasses,
  getCtaSecondaryButtonClasses,
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

type CtaActionLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  action: CtaSectionAction;
};

const CtaActionLink = React.forwardRef<HTMLAnchorElement, CtaActionLinkProps>(
  ({ action, children, ...rest }, ref) => {
    if (action.external) {
      return (
        <a href={action.href} target="_blank" rel="noreferrer" ref={ref} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <NextLink href={action.href} ref={ref} {...rest}>
        {children}
      </NextLink>
    );
  }
);

CtaActionLink.displayName = 'CtaActionLink';

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
        <div className={getCtaSectionCardClasses(tone)}>
          <div className={getCtaSectionContentGridClasses(hasVisual)}>
            <div className="flex min-w-0 flex-col gap-6">
              {eyebrow ? <p className={getCtaSectionEyebrowClasses(tone)}>{eyebrow}</p> : null}

              <h2 className={getCtaSectionTitleClasses()}>{title}</h2>

              {description ? (
                <p className={getCtaSectionDescriptionClasses(tone)}>{description}</p>
              ) : null}

              <div className={getCtaSectionActionsClasses()}>
                <Button asChild className={getCtaPrimaryButtonClasses(tone)}>
                  <CtaActionLink action={primaryAction}>{primaryAction.label}</CtaActionLink>
                </Button>

                {secondaryAction ? (
                  <Button
                    variant="ghost"
                    asChild
                    className={getCtaSecondaryButtonClasses(tone)}
                  >
                    <CtaActionLink action={secondaryAction}>
                      {secondaryAction.label}
                    </CtaActionLink>
                  </Button>
                ) : null}
              </div>

              {note ? <p className={getCtaSectionNoteClasses(tone)}>{note}</p> : null}
            </div>

            {hasVisual ? <div className={getCtaSectionVisualWrapClasses()}>{visual}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
};
