import type { FeatureOverviewProps } from './feature-overview.types';
import {
  getFeatureOverviewClasses,
  getFeatureOverviewInnerClasses,
  getFeatureOverviewHeaderClasses,
  getFeatureOverviewEyebrowClasses,
  getFeatureOverviewTitleClasses,
  getFeatureOverviewDescriptionClasses,
  getFeatureOverviewGridClasses,
  getFeatureOverviewCardClasses,
  getFeatureOverviewIconWrapClasses,
  getFeatureOverviewCardTitleClasses,
  getFeatureOverviewCardDescriptionClasses,
} from './feature-overview.styles';

export const FeatureOverview = ({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  className,
}: FeatureOverviewProps) => {
  return (
    <section className={getFeatureOverviewClasses(className)}>
      <div className={getFeatureOverviewInnerClasses()}>
        <div className={getFeatureOverviewHeaderClasses()}>
          {eyebrow ? <p className={getFeatureOverviewEyebrowClasses()}>{eyebrow}</p> : null}
          <h2 className={getFeatureOverviewTitleClasses()}>{title}</h2>
          {description ? (
            <p className={getFeatureOverviewDescriptionClasses()}>{description}</p>
          ) : null}
        </div>

        <div className={getFeatureOverviewGridClasses(columns)}>
          {items.map((item) => (
            <article key={item.title} className={getFeatureOverviewCardClasses()}>
              {item.icon ? (
                <div className={getFeatureOverviewIconWrapClasses()}>{item.icon}</div>
              ) : null}
              <h3 className={getFeatureOverviewCardTitleClasses()}>{item.title}</h3>
              <p className={getFeatureOverviewCardDescriptionClasses()}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
