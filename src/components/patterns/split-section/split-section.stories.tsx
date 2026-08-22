import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SplitSection } from './split-section';

const meta = {
  title: 'Patterns/SplitSection',
  component: SplitSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SplitSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Split section',
    title: 'A flexible layout for product stories',
    description:
      'Use this section to pair copy with a screenshot, illustration, or secondary content block.',
    content: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Works well for feature explanation.</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Great for testimonials or product screenshots.</span>
        </div>
        <Button className="w-fit">
          Explore more
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    visual: (
      <Card className="p-6">
        <div className="h-72 rounded-2xl bg-linear-to-br from-primary/20 via-muted to-primary/10" />
      </Card>
    ),
  },
};

export const Reversed: Story = {
  args: {
    eyebrow: 'Right aligned',
    title: 'Swap the visual and text sides when needed',
    description:
      'This variation is useful when you want the visual to take the lead on larger screens.',
    direction: 'text-right',
    content: <p className="text-muted-foreground">Use this for more visual-heavy compositions.</p>,
    visual: (
      <Card className="p-6">
        <div className="h-72 rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(16,185,129,0.2))]" />
      </Card>
    ),
  },
};
