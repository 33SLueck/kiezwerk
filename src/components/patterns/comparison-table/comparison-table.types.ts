export interface ComparisonFeature {
  name: string;
  values: { [tierName: string]: string | boolean };
}

export interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  tiers: string[];
  features: ComparisonFeature[];
  className?: string;
}
