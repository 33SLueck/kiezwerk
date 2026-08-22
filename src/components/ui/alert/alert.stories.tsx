import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Alert } from './alert';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, Terminal } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive', 'info'],
      description: 'The semantic style variant of the alert',
    },
    title: {
      control: 'text',
      description: 'The title text of the alert',
    },
    description: {
      control: 'text',
      description: 'The main descriptive content of the alert',
    },
    icon: {
      control: false,
      description: 'Icon element displayed at the start of the alert',
    },
    children: {
      control: false,
      description: 'Additional custom children to render inside the alert body',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Heads up!',
    description: 'You can add components to your app using the cli.',
    icon: <Terminal className="h-4 w-4" />,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Your payment was processed successfully. A receipt has been sent to your email.',
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  },
};

export const InfoAlert: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description:
      'A new software update is available. Please update your client as soon as possible.',
    icon: <Info className="h-4 w-4 text-blue-500" />,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description:
      'Your subscription is expiring in 3 days. Please renew to avoid service interruption.',
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    description: 'There was a problem with your request. Please try again or contact support.',
    icon: <AlertCircle className="h-4 w-4 text-destructive" />,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'default',
    title: 'Simple Alert',
    description:
      'This is a simple alert without any icon, suitable for subtle inline notifications.',
  },
};
