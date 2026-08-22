export interface TimelineStep {
  title: string;
  description: string;
  date?: string;
}

export interface TimelineSectionProps {
  title?: string;
  subtitle?: string;
  steps: TimelineStep[];
  className?: string;
}
