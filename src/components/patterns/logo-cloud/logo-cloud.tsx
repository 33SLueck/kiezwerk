import * as React from 'react';
import type { LogoCloudProps } from './logo-cloud.types';
import {
  getLogoCloudClasses,
  getLogoCloudInnerClasses,
  getLogoCloudTitleClasses,
  getLogoCloudGridClasses,
  getLogoImageClasses,
} from './logo-cloud.styles';

export const LogoCloud = ({ title, logos, className }: LogoCloudProps) => {
  return (
    <section className={getLogoCloudClasses(className)}>
      <div className={getLogoCloudInnerClasses()}>
        {title ? <h2 className={getLogoCloudTitleClasses()}>{title}</h2> : null}
        <div className={getLogoCloudGridClasses()}>
          {logos.map((logo, index) => (
            <img
              key={index}
              className={getLogoImageClasses()}
              src={logo.src}
              alt={logo.name}
              width={158}
              height={48}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
