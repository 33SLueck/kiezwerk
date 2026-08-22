import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
  title: 'Typography & Media/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'The semantic HTML heading level (h1 - h6)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'The visual size class of the heading',
    },
    children: {
      control: 'text',
      description: 'The text content of the heading',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 2,
    size: 'lg',
    children: 'Quick brown fox jumps over the lazy dog',
  },
};

export const Levels: Story = {
  args: {
    size: 'md',
  },
  render: (args: React.ComponentProps<typeof Heading>) => (
    <div className="flex flex-col gap-4">
      <Heading {...args} level={1}>
        Heading 1 (h1)
      </Heading>
      <Heading {...args} level={2}>
        Heading 2 (h2)
      </Heading>
      <Heading {...args} level={3}>
        Heading 3 (h3)
      </Heading>
      <Heading {...args} level={4}>
        Heading 4 (h4)
      </Heading>
      <Heading {...args} level={5}>
        Heading 5 (h5)
      </Heading>
      <Heading {...args} level={6}>
        Heading 6 (h6)
      </Heading>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    level: 2,
  },
  render: (args: React.ComponentProps<typeof Heading>) => (
    <div className="flex flex-col gap-4">
      <Heading {...args} size="sm">
        Small size (sm)
      </Heading>
      <Heading {...args} size="md">
        Medium size (md)
      </Heading>
      <Heading {...args} size="lg">
        Large size (lg)
      </Heading>
      <Heading {...args} size="xl">
        Extra Large size (xl)
      </Heading>
      <Heading {...args} size="2xl">
        Double Extra Large (2xl)
      </Heading>
      <Heading {...args} size="3xl">
        Triple Extra Large (3xl)
      </Heading>
    </div>
  ),
};
