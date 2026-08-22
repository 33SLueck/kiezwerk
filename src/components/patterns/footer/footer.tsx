import * as React from 'react';
import type { FooterProps } from './footer.types';
import {
  getFooterClasses,
  getFooterInnerClasses,
  getFooterColumnTitleClasses,
  getFooterLinkClasses,
} from './footer.styles';
import { Link } from '@/components/ui/link';

export const Footer = ({ logo, columns, className }: FooterProps) => {
  return (
    <footer className={getFooterClasses(className)}>
      <div className={getFooterInnerClasses()}>
        <div className="flex flex-col gap-4">
          {logo ?? (
            <Link href="/" className="text-xl font-bold text-foreground">
              Brand
            </Link>
          )}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Brand, Inc. All rights reserved.
          </p>
        </div>
        {columns.map((column, colIdx) => (
          <div key={colIdx}>
            <h3 className={getFooterColumnTitleClasses()}>{column.title}</h3>
            <ul className="space-y-1">
              {column.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link href={link.href} className={getFooterLinkClasses()}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
