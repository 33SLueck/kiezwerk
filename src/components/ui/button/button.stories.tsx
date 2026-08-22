import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Button } from './button';
import { Mail, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The sizing variant of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Displays a loading spinner and disables interaction',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expands the button to take up the full width of its container',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
    },
    leadingIcon: {
      control: false,
      description: 'Icon content to display before the text label',
    },
    trailingIcon: {
      control: false,
      description: 'Icon content to display after the text label',
    },
    children: {
      control: 'text',
      description: 'The text or components to render inside the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    fullWidth: false,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Sizes: Story = {
  args: {
    ...Default.args,
  },
  render: (args: React.ComponentProps<typeof Button>) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small (sm)
      </Button>
      <Button {...args} size="md">
        Medium (md)
      </Button>
      <Button {...args} size="lg">
        Large (lg)
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    children: 'Saving changes',
    isLoading: true,
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
  },
  render: (args: React.ComponentProps<typeof Button>) => (
    <div className="flex items-center gap-4">
      <Button {...args} leadingIcon={<Mail className="h-4 w-4" />}>
        Email Icon
      </Button>
      <Button {...args} trailingIcon={<ArrowRight className="h-4 w-4" />}>
        Next Step
      </Button>
    </div>
  ),
};
