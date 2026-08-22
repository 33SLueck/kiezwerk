import * as React from 'react';
import type { ComparisonTableProps } from './comparison-table.types';
import {
  getComparisonTableClasses,
  getComparisonTableInnerClasses,
  getTableWrapperClasses,
  getTableClasses,
  getThClasses,
} from './comparison-table.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Check, X } from 'lucide-react';

export const ComparisonTable = ({
  title,
  subtitle,
  tiers,
  features,
  className,
}: ComparisonTableProps) => {
  const renderValue = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check className="h-5 w-5 text-green-500 mx-auto sm:mx-0" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto sm:mx-0" />
      );
    }
    return <span className="text-muted-foreground">{val}</span>;
  };

  return (
    <section className={getComparisonTableClasses(className)}>
      <div className={getComparisonTableInnerClasses()}>
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

        <div className={getTableWrapperClasses()}>
          <table className={getTableClasses()}>
            <thead>
              <tr>
                <th className={getThClasses()}>Features</th>
                {tiers.map((tier) => (
                  <th key={tier} className={getThClasses()}>
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{feature.name}</td>
                  {tiers.map((tier) => (
                    <td
                      key={tier}
                      className="px-6 py-4 text-center sm:text-left border-t border-border"
                    >
                      {renderValue(feature.values[tier])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
