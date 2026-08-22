export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  items: StatItem[];
  className?: string;
}
