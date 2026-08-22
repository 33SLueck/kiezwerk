import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label next to the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Secondary helper text or error message',
    },
    checked: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
    },
    error: {
      control: 'boolean',
      description: 'Indicates an error state',
    },
    variant: {
      control: 'select',
      options: ['default'],
      description: 'The visual style variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept Terms and Conditions',
    helperText: 'You must agree to the terms before signing up.',
    checked: false,
    disabled: false,
    error: false,
    variant: 'default',
  },
  render: (args: React.ComponentProps<typeof Checkbox>) => {
    const [checked, setChecked] = React.useState(args.checked);
    React.useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    label: 'Receive newsletter',
    helperText: 'We will send you updates once a week.',
    checked: true,
  },
  render: Default.render,
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Subscribe to marketing emails',
    helperText: 'You must agree to our privacy policy.',
    error: true,
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Beta Features access',
    helperText: 'Beta registrations are currently closed.',
    disabled: true,
  },
  render: Default.render,
};
