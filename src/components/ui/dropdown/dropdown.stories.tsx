import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Dropdown } from './dropdown';
import { Button } from '../button';

const meta: Meta<typeof Dropdown> = {
  title: 'Primitives/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Options</Button>,
    items: [
      { label: 'Edit profile', onClick: () => console.log('Edit profile clicked') },
      { label: 'Account settings', onClick: () => console.log('Account settings clicked') },
      { label: 'License', onClick: () => console.log('License clicked') },
      { label: 'Sign out', onClick: () => console.log('Sign out clicked') },
    ],
  },
};
