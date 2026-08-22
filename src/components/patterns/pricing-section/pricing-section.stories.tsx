import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PricingSection } from './pricing-section';

const meta = {
  title: 'Patterns/PricingSection',
  component: PricingSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PricingSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Pricing',
    title: 'Choose the plan that fits your team',
    description:
      'Keep the offer simple: a few plans, one clear recommended option, and a short list of features.',
    plans: [
      {
        name: 'Starter',
        price: '€19',
        period: '/mo',
        description: 'For small projects and quick launches.',
        features: [
          { label: 'Up to 3 pages' },
          { label: 'Basic support' },
          { label: 'Custom branding', included: false },
        ],
        actionLabel: 'Start now',
        actionHref: '#',
      },
      {
        name: 'Pro',
        price: '€49',
        period: '/mo',
        badge: 'Most popular',
        featured: true,
        description: 'Best for teams shipping regularly.',
        features: [
          { label: 'Unlimited pages' },
          { label: 'Priority support' },
          { label: 'Advanced customization' },
        ],
        actionLabel: 'Get Pro',
        actionHref: '#',
        note: 'Best value for growing teams.',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For larger organizations with special requirements.',
        features: [
          { label: 'Dedicated onboarding' },
          { label: 'SLA support' },
          { label: 'Custom integrations' },
        ],
        actionLabel: 'Contact sales',
        actionHref: '#',
      },
    ],
  },
};
