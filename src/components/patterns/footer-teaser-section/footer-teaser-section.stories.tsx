import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FooterTeaserSection } from './footer-teaser-section';

const meta = {
  title: 'Patterns/FooterTeaserSection',
  component: FooterTeaserSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FooterTeaserSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Ready to start?',
    title: 'Build your next page with less friction',
    description:
      'Use the BaseWeb sections as a consistent final step that turns attention into action.',
    primaryActionLabel: 'Get started',
    primaryActionHref: '#',
    secondaryActionLabel: 'View docs',
    secondaryActionHref: '#',
    note: 'Everything stays aligned with the same design language.',
  },
};
