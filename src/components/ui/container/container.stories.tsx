import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Container } from './container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'The maximum width size variant of the container',
    },
    border: {
      control: 'select',
      options: ['none', 'neutral', 'subtle'],
      description: 'The border style variant around the container',
    },
    asChild: {
      control: 'boolean',
      description:
        'Whether to merge props into the child element instead of rendering a wrapper div',
    },
    children: {
      control: false,
      description: 'Content inside the container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    size: 'md',
    border: 'none',
    children: (
      <div className="bg-muted p-6 rounded-lg text-center">
        <h4 className="font-bold mb-2">Container (Medium - md)</h4>
        <p className="text-sm text-muted-foreground">
          This is a centered layout container. It keeps its content constrained to a specific
          maximum width depending on the size option.
        </p>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    children: (
      <div className="bg-muted p-6 rounded-lg text-center">
        <h4 className="font-bold mb-2">Container (Small - sm)</h4>
        <p className="text-sm text-muted-foreground">
          Constrains content to a narrower width (max-w-screen-md), ideal for reading blogs,
          settings pages, or small forms.
        </p>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    children: (
      <div className="bg-muted p-6 rounded-lg text-center">
        <h4 className="font-bold mb-2">Container (Large - lg)</h4>
        <p className="text-sm text-muted-foreground">
          Expands the maximum width (max-w-screen-xl) to allow more horizontal content, like grids
          or complex dashboard pages.
        </p>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    size: 'full',
    children: (
      <div className="bg-muted p-6 rounded-lg text-center">
        <h4 className="font-bold mb-2">Container (Full Width)</h4>
        <p className="text-sm text-muted-foreground">
          Fills the entire available width of the screen. Ideal for hero areas or footer sections.
        </p>
      </div>
    ),
  },
};

export const WithBorder: Story = {
  args: {
    ...Default.args,
    border: 'neutral',
    children: (
      <div className="p-6 text-center">
        <h4 className="font-bold mb-2">Container with Neutral Border</h4>
        <p className="text-sm text-muted-foreground">
          Visual borders help delineate layout grids and design containers.
        </p>
      </div>
    ),
  },
};
