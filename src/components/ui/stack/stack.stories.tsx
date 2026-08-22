import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Stack } from './stack';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The layout direction of the stack items',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      description: 'The gap size between stack items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'The alignment of stack items along the cross axis',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
      description: 'The alignment of stack items along the main axis',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether to allow items to wrap onto multiple lines',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'header', 'footer'],
      description: 'The HTML tag to render the stack as',
    },
    children: {
      control: false,
      description: 'Content inside the stack',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ label, className = '' }: { label: string; className?: string }) => (
  <div
    className={`bg-primary text-primary-foreground font-semibold p-4 rounded-lg flex items-center justify-center min-w-[80px] min-h-[50px] shadow-sm ${className}`}
  >
    {label}
  </div>
);

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    children: (
      <>
        <Box label="Item 1" />
        <Box label="Item 2" />
        <Box label="Item 3" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    ...Vertical.args,
    direction: 'horizontal',
    align: 'center',
    children: (
      <>
        <Box label="Item 1" />
        <Box label="Item 2" />
        <Box label="Item 3" />
      </>
    ),
  },
};

export const Gaps: Story = {
  args: {
    direction: 'horizontal',
    align: 'center',
  },
  render: (args: React.ComponentProps<typeof Stack>) => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold mb-2">Gap: None (none)</p>
        <Stack {...args} gap="none">
          <Box label="1" />
          <Box label="2" />
          <Box label="3" />
        </Stack>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Gap: Extra Small (xs)</p>
        <Stack {...args} gap="xs">
          <Box label="1" />
          <Box label="2" />
          <Box label="3" />
        </Stack>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Gap: Small (sm)</p>
        <Stack {...args} gap="sm">
          <Box label="1" />
          <Box label="2" />
          <Box label="3" />
        </Stack>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Gap: Medium (md)</p>
        <Stack {...args} gap="md">
          <Box label="1" />
          <Box label="2" />
          <Box label="3" />
        </Stack>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Gap: Large (lg)</p>
        <Stack {...args} gap="lg">
          <Box label="1" />
          <Box label="2" />
          <Box label="3" />
        </Stack>
      </div>
    </div>
  ),
};

export const Wrapping: Story = {
  args: {
    direction: 'horizontal',
    gap: 'md',
    wrap: true,
    align: 'center',
    children: Array.from({ length: 15 }).map((_, index) => (
      <Box key={index} label={`Box ${index + 1}`} />
    )),
  },
};
