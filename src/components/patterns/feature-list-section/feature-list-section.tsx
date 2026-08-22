import * as React from 'react';
import type { FeatureListSectionProps } from './feature-list-section.types';
import {
  getFeatureListSectionClasses,
  getFeatureListSectionInnerClasses,
  getFeatureListGridClasses,
} from './feature-list-section.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Check } from 'lucide-react';

export const FeatureListSection = ({
  title,
  subtitle,
  items,
  className,
}: FeatureListSectionProps) => {
  return (
    <section className={getFeatureListSectionClasses(className)}>
      <div className={getFeatureListSectionInnerClasses()}>
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
        <div className={getFeatureListGridClasses()}>
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                {item.icon ?? <Check className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
