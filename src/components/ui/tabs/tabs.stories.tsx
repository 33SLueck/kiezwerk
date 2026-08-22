import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    items: [
      { id: 'tab1', label: 'Overview', content: <div>This is the Overview tab content.</div> },
      { id: 'tab2', label: 'Settings', content: <div>Manage your settings here.</div> },
      { id: 'tab3', label: 'Security', content: <div>Configure security options.</div> },
    ],
  },
};
