import * as React from 'react';
import type { StatsSectionProps } from './stats-section.types';
import {
  getStatsSectionClasses,
  getStatsSectionInnerClasses,
  getStatsSectionGridClasses,
} from './stats-section.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export const StatsSection = ({ title, subtitle, items, className }: StatsSectionProps) => {
  return (
    <section className={getStatsSectionClasses(className)}>
      <div className={getStatsSectionInnerClasses()}>
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
        <div className={getStatsSectionGridClasses()}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 text-center sm:text-left border-l-2 border-border pl-6"
            >
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                {item.value}
              </span>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
              {item.description ? (
                <span className="text-xs text-muted-foreground/80 mt-1">{item.description}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
