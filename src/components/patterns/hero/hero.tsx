'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import {
  getHeroClasses,
  getHeroContentClasses,
  getHeroInnerClasses,
  getHeroTextClasses,
} from './hero.styles';
import type { HeroProps } from './hero.types';

export const Hero = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  visual,
  alignment = 'left',
  tone = 'default',
  size = 'lg',
  className,
}: HeroProps) => {
  const hasVisual = Boolean(visual);

  return (
    <section className={getHeroClasses({ alignment, tone, size, className })}>
      <div className={getHeroInnerClasses(alignment)}>
        <div className={getHeroContentClasses(alignment)}>
          <div className={getHeroTextClasses(alignment)}>
            {subtitle ? (
              <Text
                as="p"
                className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
              >
                {subtitle}
              </Text>
            ) : null}

            <Heading level={1} size="3xl" className="max-w-3xl">
              {title}
            </Heading>

            {description ? (
              <Text size="lg" className="max-w-2xl text-muted-foreground">
                {description}
              </Text>
            ) : null}

            {primaryAction || secondaryAction ? (
              <div
                className={`flex flex-wrap gap-3 ${alignment === 'center' ? 'justify-center' : ''}`}
              >
                {primaryAction ? (
                  <Button
                    onClick={() => {
                      window.location.href = primaryAction.href;
                    }}
                  >
                    {primaryAction.label}
                  </Button>
                ) : null}

                {secondaryAction ? (
                  <Button
                    variant="ghost"
                    onClick={() => window.location.assign(secondaryAction.href)}
                  >
                    {secondaryAction.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          {hasVisual ? (
            <div className={alignment === 'center' ? 'mx-auto w-full max-w-4xl' : 'w-full'}>
              {visual}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
