import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
  },
};
