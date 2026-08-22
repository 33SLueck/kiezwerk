import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Write your thoughts here...',
    disabled: false,
    error: false,
  },
};
