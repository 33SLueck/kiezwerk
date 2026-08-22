import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './hero';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Hero> = {
  title: 'Patterns/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    subtitle: 'BaseWebRepo',
    title: 'Launch a production-ready UI system faster',
    description:
      'Build landing pages and product interfaces with a consistent foundation of primitives and reusable pattern sections.',
    primaryAction: {
      label: 'Get started',
      href: '#',
    },
    secondaryAction: {
      label: 'View components',
      href: '#',
    },
    visual: (
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <Badge>Template-ready</Badge>
          <div className="h-40 rounded-xl bg-linear-to-br from-primary/20 to-muted" />
        </div>
      </Card>
    ),
  },
};

export const Centered: Story = {
  args: {
    subtitle: 'New template',
    title: 'A clean foundation for every new project',
    description:
      'Storybook documents the system, while the pattern components power your actual pages.',
    primaryAction: {
      label: 'Explore Storybook',
      href: '#',
    },
    alignment: 'center',
    tone: 'muted',
    visual: (
      <div className="mx-auto max-w-3xl rounded-2xl border bg-background p-6 shadow-sm">
        <div className="h-56 rounded-xl bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(168,85,247,0.18))]" />
      </div>
    ),
  },
};
