import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckCircle2, Lightbulb, Rocket, ShieldCheck } from 'lucide-react';
import { BenefitsSection } from './benefits-section';

const meta = {
  title: 'Patterns/BenefitsSection',
  component: BenefitsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BenefitsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Benefits',
    title: 'Why teams choose this base',
    description:
      'The benefits section explains the value in a way that is fast to scan and easy to understand.',
    items: [
      {
        title: 'Faster implementation',
        description: 'Use ready-made building blocks instead of rethinking each page from scratch.',
        icon: <Rocket className="h-5 w-5" />,
      },
      {
        title: 'Clearer decisions',
        description: 'Consistent patterns reduce friction when teams review or extend the system.',
        icon: <Lightbulb className="h-5 w-5" />,
      },
      {
        title: 'Safer defaults',
        description: 'Base components and layouts come with a predictable structure and behavior.',
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: 'Easy to trust',
        description:
          'The system feels polished because spacing, hierarchy and content rhythm are aligned.',
        icon: <CheckCircle2 className="h-5 w-5" />,
      },
    ],
  },
};
