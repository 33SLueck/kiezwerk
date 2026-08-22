import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CtaSection } from './cta-section';

const meta = {
  title: 'Patterns/CtaSection',
  component: CtaSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CtaSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Ready to ship?',
    title: 'Start using the BaseWebRepo pattern system today',
    description:
      'Use the pattern sections to build landing pages faster and keep every page aligned with the same design language.',
    primaryAction: {
      label: 'Get started',
      href: '#',
    },
    secondaryAction: {
      label: 'View components',
      href: '#',
    },
    note: 'No setup friction. No extra styling layer.',
    visual: (
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <span>Clear CTA with supporting content</span>
          </div>
          <div className="h-44 rounded-2xl bg-liner-to-br from-background via-muted to-primary/20" />
        </div>
      </Card>
    ),
  },
};

export const Muted: Story = {
  args: {
    eyebrow: 'Take the next step',
    title: 'A softer CTA for content-heavy pages',
    description: 'Use muted tone when you want the CTA to feel integrated into the page flow.',
    tone: 'muted',
    primaryAction: {
      label: 'Contact us',
      href: '#',
    },
    note: 'You can place this after testimonials or pricing.',
    visual: (
      <div className="flex h-full min-h-55 items-center justify-center rounded-2xl border border-dashed border-border bg-background p-6">
        <ArrowRight className="h-8 w-8 text-primary" />
      </div>
    ),
  },
};
