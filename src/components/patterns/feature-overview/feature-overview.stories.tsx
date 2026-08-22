import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sparkles, ShieldCheck, Zap, LayoutGrid, Palette, Rocket } from 'lucide-react';
import { FeatureOverview } from './feature-overview';

const meta = {
  title: 'Patterns/FeatureOverview',
  component: FeatureOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeatureOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Features',
    title: 'Everything you need to build faster',
    description: 'A compact feature overview that explains the value of the system at a glance.',
    columns: 3,
    items: [
      {
        title: 'Reusable primitives',
        description: 'Build with a consistent base of UI components across every project.',
        icon: <LayoutGrid className="h-5 w-5" />,
      },
      {
        title: 'Fast setup',
        description: 'Ship pages quicker with predictable building blocks and patterns.',
        icon: <Zap className="h-5 w-5" />,
      },
      {
        title: 'Design consistency',
        description: 'Keep spacing, typography and interaction patterns aligned.',
        icon: <Palette className="h-5 w-5" />,
      },
      {
        title: 'Secure defaults',
        description: 'Use sensible structural defaults that are safe to extend.',
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: 'Easy to scale',
        description: 'Add new sections and components without changing the foundation.',
        icon: <Rocket className="h-5 w-5" />,
      },
      {
        title: 'Polished details',
        description: 'Subtle interactions and spacing make the system feel complete.',
        icon: <Sparkles className="h-5 w-5" />,
      },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    eyebrow: 'Why it works',
    title: 'A clean overview for complex products',
    description: 'Two columns are useful when each feature needs more visual weight.',
    columns: 2,
    items: [
      {
        title: 'Simple API',
        description: 'Easy to drop into landing pages and internal showcase pages.',
        icon: <LayoutGrid className="h-5 w-5" />,
      },
      {
        title: 'Flexible layout',
        description: 'Switch between 2, 3 or 4 columns depending on content density.',
        icon: <Zap className="h-5 w-5" />,
      },
    ],
  },
};
