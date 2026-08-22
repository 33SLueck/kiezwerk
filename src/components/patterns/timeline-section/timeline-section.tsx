import * as React from 'react';
import type { TimelineSectionProps } from './timeline-section.types';
import {
  getTimelineSectionClasses,
  getTimelineSectionInnerClasses,
} from './timeline-section.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export const TimelineSection = ({ title, subtitle, steps, className }: TimelineSectionProps) => {
  return (
    <section className={getTimelineSectionClasses(className)}>
      <div className={getTimelineSectionInnerClasses()}>
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
        <div className="relative border-l border-border ml-4 md:ml-32 space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <span className="absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border text-xs font-semibold text-foreground">
                {index + 1}
              </span>
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                {step.date ? (
                  <span className="text-sm font-semibold text-muted-foreground md:w-28 md:text-right shrink-0">
                    {step.date}
                  </span>
                ) : null}
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-2xl">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
