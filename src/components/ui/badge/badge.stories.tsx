import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'destructive'],
      description: 'The visual variant styling of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the badge',
    },
    children: {
      control: 'text',
      description: 'The content label inside the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Active',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    children: 'Draft',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    variant: 'success',
    children: 'Completed',
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    variant: 'warning',
    children: 'Pending',
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive',
    children: 'Failed',
  },
};

export const Sizes: Story = {
  args: {
    ...Default.args,
    children: 'New Badge',
  },
  render: (args: React.ComponentProps<typeof Badge>) => (
    <div className="flex items-center gap-4">
      <Badge {...args} size="sm">
        Small (sm)
      </Badge>
      <Badge {...args} size="md">
        Medium (md)
      </Badge>
    </div>
  ),
};
