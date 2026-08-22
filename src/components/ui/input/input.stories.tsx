import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the input field',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text inside the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input field',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    required: {
      control: 'boolean',
      description: 'Marks the input field as required',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The HTML input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Must be unique and at least 3 characters',
    disabled: false,
    required: false,
    type: 'text',
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    label: 'Email address',
    placeholder: 'you@example.com',
    required: true,
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Password',
    placeholder: '••••••••',
    error: 'Password must be at least 8 characters long',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'API Key',
    placeholder: 'sk_test_51Nz...',
    helperText: 'Contact your administrator to enable editing.',
    disabled: true,
  },
};
