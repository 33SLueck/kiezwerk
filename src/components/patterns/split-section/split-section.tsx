import type { SplitSectionProps } from './split-section.types';
import {
  getSplitSectionClasses,
  getSplitSectionContentWrapClasses,
  getSplitSectionDescriptionClasses,
  getSplitSectionEyebrowClasses,
  getSplitSectionGridClasses,
  getSplitSectionInnerClasses,
  getSplitSectionTextColClasses,
  getSplitSectionTitleClasses,
  getSplitSectionVisualColClasses,
} from './split-section.styles';

export const SplitSection = ({
  eyebrow,
  title,
  description,
  content,
  visual,
  direction = 'text-left',
  tone = 'default',
  className,
}: SplitSectionProps) => {
  const hasVisual = Boolean(visual);

  return (
    <section className={getSplitSectionClasses(tone, className)}>
      <div className={getSplitSectionInnerClasses()}>
        <div className={getSplitSectionGridClasses(direction)}>
          <div className={getSplitSectionTextColClasses()}>
            <div className={getSplitSectionContentWrapClasses()}>
              {eyebrow ? <p className={getSplitSectionEyebrowClasses()}>{eyebrow}</p> : null}
              <h2 className={getSplitSectionTitleClasses()}>{title}</h2>
              {description ? (
                <p className={getSplitSectionDescriptionClasses()}>{description}</p>
              ) : null}
            </div>

            <div>{content}</div>
          </div>

          {hasVisual ? <div className={getSplitSectionVisualColClasses()}>{visual}</div> : null}
        </div>
      </div>
    </section>
  );
};
