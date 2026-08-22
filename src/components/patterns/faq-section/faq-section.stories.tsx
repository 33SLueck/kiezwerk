import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FaqSection } from './faq-section';

const meta = {
  title: 'Patterns/FaqSection',
  component: FaqSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FaqSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    description: 'Answer common objections before they become blockers.',
    items: [
      {
        question: 'Can I customize the sections?',
        answer:
          'Yes, every section is built to be flexible and easy to adapt to different projects.',
      },
      {
        question: 'Do the components work in Storybook?',
        answer: 'Yes, all patterns are documented and showcased in Storybook for quick review.',
      },
      {
        question: 'Is this built on the Base Components?',
        answer: 'Yes, the pattern sections are composed from the existing BaseWebRepo primitives.',
      },
    ],
  },
};
