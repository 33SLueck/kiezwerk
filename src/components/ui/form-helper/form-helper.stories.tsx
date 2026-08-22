import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormHelper } from './form-helper';

const meta: Meta<typeof FormHelper> = {
  title: 'Primitives/FormHelper',
  component: FormHelper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormHelper>;

export const Default: Story = {
  args: {
    children: 'This is a helpful hint.',
    error: false,
  },
};

export const ErrorState: Story = {
  args: {
    children: 'This is an error message!',
    error: true,
  },
};
