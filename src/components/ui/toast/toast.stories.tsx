import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Toast } from './toast';
import { Button } from '../button';

const meta: Meta<typeof Toast> = {
  title: 'Primitives/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Trigger Toast</Button>
        <Toast
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message="Your changes have been successfully saved!"
          variant="success"
        />
      </div>
    );
  },
};
