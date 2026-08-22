import * as React from 'react';
import type { ContentTeaserProps } from './content-teaser.types';
import {
  getTeaserSectionClasses,
  getTeaserInnerClasses,
  getTeaserGridClasses,
} from './content-teaser.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Link } from '@/components/ui/link';

export const ContentTeaser = ({ title, subtitle, items, className }: ContentTeaserProps) => {
  return (
    <section className={getTeaserSectionClasses(className)}>
      <div className={getTeaserInnerClasses()}>
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

        <div className={getTeaserGridClasses()}>
          {items.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow"
            >
              {item.imageUrl ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : null}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  {item.category ? (
                    <span className="font-semibold text-foreground uppercase tracking-wider">
                      {item.category}
                    </span>
                  ) : null}
                  {item.category && item.date ? <span>•</span> : null}
                  {item.date ? <span>{item.date}</span> : null}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 hover:text-muted-foreground">
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-foreground hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
