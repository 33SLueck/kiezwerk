import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FeatureListSection } from './feature-list-section';
import { Zap, Shield, Sparkles } from 'lucide-react';

const meta: Meta<typeof FeatureListSection> = {
  title: 'Patterns/FeatureListSection',
  component: FeatureListSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureListSection>;

export const Default: Story = {
  args: {
    subtitle: 'Features',
    title: 'A better way to build web applications',
    items: [
      {
        title: 'Lightning Fast',
        description:
          'Optimized build size and server-side rendering guarantees sub-second page loads.',
        icon: <Zap className="h-5 w-5" />,
      },
      {
        title: 'Secure by Default',
        description:
          'Automatic HTTPS, content security policies, and safe authentication methods built-in.',
        icon: <Shield className="h-5 w-5" />,
      },
      {
        title: 'Premium Aesthetics',
        description:
          'Hand-crafted components using harmonious color combinations and smooth transitions.',
        icon: <Sparkles className="h-5 w-5" />,
      },
    ],
  },
};
