import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'item1',
        title: 'What is this design system?',
        content: 'This is a premium, beautifully crafted React component library.',
      },
      {
        id: 'item2',
        title: 'How do I install it?',
        content:
          'You can install the library package and import components directly into your project.',
      },
      {
        id: 'item3',
        title: 'Is it responsive?',
        content: 'Yes, all components are built using responsive Tailwind CSS utility classes.',
      },
    ],
  },
};
