import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Drawer } from './drawer';
import { Button } from '../button';

const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings Panel"
          side="right"
        >
          <div className="space-y-4">
            <p>Customize your user experience here.</p>
            <Button onClick={() => setIsOpen(false)}>Save Settings</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};
