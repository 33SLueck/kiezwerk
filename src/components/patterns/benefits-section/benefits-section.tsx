import type { BenefitsSectionProps } from './benefits-section.types';
import {
  getBenefitsSectionClasses,
  getBenefitsSectionDescriptionClasses,
  getBenefitsSectionEyebrowClasses,
  getBenefitsSectionHeaderClasses,
  getBenefitsSectionIconWrapClasses,
  getBenefitsSectionInnerClasses,
  getBenefitsSectionItemClasses,
  getBenefitsSectionItemContentClasses,
  getBenefitsSectionItemDescriptionClasses,
  getBenefitsSectionItemTitleClasses,
  getBenefitsSectionListClasses,
  getBenefitsSectionTitleClasses,
} from './benefits-section.styles';

export const BenefitsSection = ({
  eyebrow,
  title,
  description,
  items,
  className,
}: BenefitsSectionProps) => {
  return (
    <section className={getBenefitsSectionClasses(className)}>
      <div className={getBenefitsSectionInnerClasses()}>
        <div className={getBenefitsSectionHeaderClasses()}>
          {eyebrow ? <p className={getBenefitsSectionEyebrowClasses()}>{eyebrow}</p> : null}
          <h2 className={getBenefitsSectionTitleClasses()}>{title}</h2>
          {description ? (
            <p className={getBenefitsSectionDescriptionClasses()}>{description}</p>
          ) : null}
        </div>

        <div className={getBenefitsSectionListClasses()}>
          {items.map((item) => (
            <article key={item.title} className={getBenefitsSectionItemClasses()}>
              {item.icon ? (
                <div className={getBenefitsSectionIconWrapClasses()}>{item.icon}</div>
              ) : null}

              <div className={getBenefitsSectionItemContentClasses()}>
                <h3 className={getBenefitsSectionItemTitleClasses()}>{item.title}</h3>
                <p className={getBenefitsSectionItemDescriptionClasses()}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
