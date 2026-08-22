import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The direction of the divider',
    },
    tone: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'The tone/color shade of the divider line',
    },
    decorative: {
      control: 'boolean',
      description:
        'If true, marked as presentation-only. If false, acts as an accessible separator',
    },
    as: {
      control: 'select',
      options: ['hr', 'div'],
      description: 'The HTML element used to render the divider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    tone: 'default',
    decorative: true,
    as: 'hr',
  },
  render: (args: React.ComponentProps<typeof Divider>) => (
    <div className="w-full max-w-md p-4 bg-card rounded-lg border border-border">
      <h4 className="font-semibold text-sm mb-2">Item Above</h4>
      <Divider {...args} />
      <h4 className="font-semibold text-sm mt-2">Item Below</h4>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    ...Horizontal.args,
    tone: 'muted',
  },
  render: Horizontal.render,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    tone: 'default',
    decorative: true,
    as: 'div',
  },
  render: (args: React.ComponentProps<typeof Divider>) => (
    <div className="flex h-8 items-center gap-4 bg-card px-4 py-2 rounded-lg border border-border w-fit">
      <span className="text-sm font-medium">Home</span>
      <Divider {...args} />
      <span className="text-sm font-medium">Pricing</span>
      <Divider {...args} />
      <span className="text-sm font-medium">About</span>
    </div>
  ),
};
