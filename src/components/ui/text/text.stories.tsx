import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Typography & Media/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span'],
      description: 'The semantic HTML element to render the text as',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'The typography size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'highlight'],
      description: 'The color or weight style variant',
    },
    children: {
      control: 'text',
      description: 'The text content to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    as: 'p',
    size: 'md',
    variant: 'default',
    children: 'Design is not just what it looks like and feels like. Design is how it works.',
  },
};

export const Muted: Story = {
  args: {
    ...Default.args,
    variant: 'muted',
  },
};

export const Highlight: Story = {
  args: {
    ...Default.args,
    variant: 'highlight',
  },
};

export const Sizes: Story = {
  args: {
    as: 'p',
    variant: 'default',
  },
  render: (args: React.ComponentProps<typeof Text>) => (
    <div className="flex flex-col gap-4">
      <Text {...args} size="sm">
        Small text (sm)
      </Text>
      <Text {...args} size="md">
        Medium text (md)
      </Text>
      <Text {...args} size="lg">
        Large text (lg)
      </Text>
      <Text {...args} size="xl">
        Extra Large text (xl)
      </Text>
      <Text {...args} size="2xl">
        Double Extra Large (2xl)
      </Text>
      <Text {...args} size="3xl">
        Triple Extra Large (3xl)
      </Text>
    </div>
  ),
};
