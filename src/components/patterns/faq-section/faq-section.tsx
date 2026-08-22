'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqSectionProps } from './faq-section.types';
import {
  getFaqSectionAnswerClasses,
  getFaqSectionButtonClasses,
  getFaqSectionClasses,
  getFaqSectionDescriptionClasses,
  getFaqSectionEyebrowClasses,
  getFaqSectionHeaderClasses,
  getFaqSectionIconClasses,
  getFaqSectionIconWrapClasses,
  getFaqSectionInnerClasses,
  getFaqSectionItemClasses,
  getFaqSectionListClasses,
  getFaqSectionQuestionClasses,
  getFaqSectionTitleClasses,
} from './faq-section.styles';

export const FaqSection = ({
  eyebrow,
  title,
  description,
  items,
  defaultOpenIndex = null,
  className,
}: FaqSectionProps) => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className={getFaqSectionClasses(className)}>
      <div className={getFaqSectionInnerClasses()}>
        {(eyebrow || title || description) && (
          <div className={getFaqSectionHeaderClasses()}>
            {eyebrow ? <p className={getFaqSectionEyebrowClasses()}>{eyebrow}</p> : null}
            {title ? <h2 className={getFaqSectionTitleClasses()}>{title}</h2> : null}
            {description ? (
              <p className={getFaqSectionDescriptionClasses()}>{description}</p>
            ) : null}
          </div>
        )}

        <div className={getFaqSectionListClasses()} role="list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={`${index}-${item.question}`} className={getFaqSectionItemClasses()} role="listitem">
                <button
                  id={buttonId}
                  type="button"
                  className={getFaqSectionButtonClasses()}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={getFaqSectionQuestionClasses()}>{item.question}</span>
                  <span className={`${getFaqSectionIconWrapClasses()} pointer-events-none`} aria-hidden>
                    <ChevronDown
                      className={getFaqSectionIconClasses()}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? getFaqSectionAnswerClasses() : undefined}
                >
                  {isOpen ? item.answer : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
