import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import type { PricingSectionProps } from './pricing-section.types';
import {
  getPricingSectionActionWrapClasses,
  getPricingSectionBadgeClasses,
  getPricingSectionCardClasses,
  getPricingSectionClasses,
  getPricingSectionDescriptionClasses,
  getPricingSectionEyebrowClasses,
  getPricingSectionExcludedClasses,
  getPricingSectionFeatureIconBaseClasses,
  getPricingSectionFeatureItemClasses,
  getPricingSectionFeatureListClasses,
  getPricingSectionFooterNoteClasses,
  getPricingSectionHeaderClasses,
  getPricingSectionIncludedClasses,
  getPricingSectionInnerClasses,
  getPricingSectionNameClasses,
  getPricingSectionNoteClasses,
  getPricingSectionPeriodClasses,
  getPricingSectionPlanDescriptionClasses,
  getPricingSectionPriceClasses,
  getPricingSectionPriceWrapClasses,
  getPricingSectionGridClasses,
  getPricingSectionTitleClasses,
} from './pricing-section.styles';

export const PricingSection = ({
  eyebrow,
  title,
  description,
  plans,
  className,
  footerNote,
}: PricingSectionProps) => {
  return (
    <section className={getPricingSectionClasses(className)}>
      <div className={getPricingSectionInnerClasses()}>
        <div className={getPricingSectionHeaderClasses()}>
          {eyebrow ? <p className={getPricingSectionEyebrowClasses()}>{eyebrow}</p> : null}
          <h2 className={getPricingSectionTitleClasses()}>{title}</h2>
          {description ? (
            <p className={getPricingSectionDescriptionClasses()}>{description}</p>
          ) : null}
        </div>

        <div className={getPricingSectionGridClasses()}>
          {plans.map((plan) => (
            <article key={plan.name} className={getPricingSectionCardClasses(plan.featured)}>
              <div>
                {plan.badge ? (
                  <span className={getPricingSectionBadgeClasses()}>{plan.badge}</span>
                ) : null}
                <h3 className={getPricingSectionNameClasses()}>{plan.name}</h3>
                <div className={getPricingSectionPriceWrapClasses()}>
                  <span className={getPricingSectionPriceClasses()}>{plan.price}</span>
                  {plan.period ? (
                    <span className={getPricingSectionPeriodClasses()}>{plan.period}</span>
                  ) : null}
                </div>
                {plan.description ? (
                  <p className={getPricingSectionPlanDescriptionClasses()}>{plan.description}</p>
                ) : null}
              </div>

              <ul className={getPricingSectionFeatureListClasses()}>
                {plan.features.map((feature) => (
                  <li key={feature.label} className={getPricingSectionFeatureItemClasses()}>
                    {feature.included !== false ? (
                      <Check
                        className={`${getPricingSectionFeatureIconBaseClasses()} ${getPricingSectionIncludedClasses()}`}
                      />
                    ) : (
                      <X
                        className={`${getPricingSectionFeatureIconBaseClasses()} ${getPricingSectionExcludedClasses()}`}
                      />
                    )}
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              <div className={getPricingSectionActionWrapClasses()}>
                <Button asChild className="w-full">
                  <Link href={plan.actionHref}>{plan.actionLabel}</Link>
                </Button>
                {plan.note ? <p className={getPricingSectionNoteClasses()}>{plan.note}</p> : null}
              </div>
            </article>
          ))}
        </div>

        {footerNote ? (
          <div className={getPricingSectionFooterNoteClasses()}>{footerNote}</div>
        ) : null}
      </div>
    </section>
  );
};
