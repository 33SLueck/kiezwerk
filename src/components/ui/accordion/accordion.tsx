'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { AccordionProps } from './accordion.types';
import {
  accordionContainerVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from './accordion.styles';
import { ChevronDown } from 'lucide-react';

export const Accordion = ({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className,
}: AccordionProps) => {
  const [expandedIds, setExpandedIds] = React.useState<string[]>(defaultExpandedIds);
  const accordionId = React.useId();

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn(accordionContainerVariants(), className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        const triggerId = `${accordionId}-trigger-${item.id}`;
        const panelId = `${accordionId}-panel-${item.id}`;

        return (
          <div key={item.id} className={accordionItemVariants()}>
            <button
              id={triggerId}
              type="button"
              className={accordionTriggerVariants({ isExpanded })}
              onClick={() => toggleItem(item.id)}
              disabled={item.disabled}
              aria-expanded={isExpanded}
              aria-controls={panelId}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform duration-200',
                  isExpanded && 'rotate-180'
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={accordionContentVariants({ isExpanded })}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-sm text-muted-foreground">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
