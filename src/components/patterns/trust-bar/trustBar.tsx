import type { TrustBarProps } from './trustBar.types';
import {
  getTrustBarClasses,
  getTrustBarInnerClasses,
  getTrustBarItemClasses,
  getTrustBarListClasses,
  getTrustBarTitleClasses,
} from './trustBar.styles';

export const TrustBar = ({
  title = 'Trusted by teams building with BaseWebRepo',
  items,
  variant = 'logos',
  className,
}: TrustBarProps) => {
  return (
    <section className={getTrustBarClasses(variant, className)}>
      <div className={getTrustBarInnerClasses()}>
        <div className="flex flex-col gap-4">
          {title ? <p className={getTrustBarTitleClasses()}>{title}</p> : null}

          <div className={getTrustBarListClasses(variant)}>
            {items.map((item) => (
              <div key={item.label} className={getTrustBarItemClasses(variant)}>
                {item.icon ? <span className="mr-2 inline-flex">{item.icon}</span> : null}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
