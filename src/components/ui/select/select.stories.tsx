import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Select } from './select';

const mockOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the select field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text or error message displayed below the field',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder/default empty option text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select input',
    },
    error: {
      control: 'boolean',
      description: 'Indicates whether the select has validation errors',
    },
    variant: {
      control: 'select',
      options: ['default'],
      description: 'The visual variant styling',
    },
    options: {
      control: 'object',
      description: 'Array of option items with value and label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Favorite Framework',
    helperText: 'Select your primary web framework.',
    placeholder: 'Select a framework...',
    disabled: false,
    error: false,
    variant: 'default',
    options: mockOptions,
  },
  render: (args: React.ComponentProps<typeof Select>) => {
    const [value, setValue] = React.useState('');
    return (
      <Select
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange?.(e);
        }}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Database Provider',
    helperText: 'Please select a database provider.',
    error: true,
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Deployment Target',
    helperText: 'Automatic target selection is disabled.',
    disabled: true,
  },
  render: Default.render,
};
