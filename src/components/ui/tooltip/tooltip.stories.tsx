import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tooltip } from './tooltip';
import { Button } from '../button';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => (
    <div className="p-10 flex justify-center">
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};
