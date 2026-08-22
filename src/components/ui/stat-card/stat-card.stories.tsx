import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';
import { StatCard } from './stat-card';

const meta: Meta<typeof StatCard> = {
  title: 'UI/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'accent'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$48,290.00',
    change: '+14.5%',
    trend: 'up',
    description: 'Compared to last month ($42,100)',
    icon: <DollarSign className="h-5 w-5" />,
  },
};

export const Orders: Story = {
  args: {
    title: 'Active Orders',
    value: '142',
    change: '+8.2%',
    trend: 'up',
    description: '34 pending fulfillment',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
};

export const Customers: Story = {
  args: {
    title: 'Total Customers',
    value: '1,894',
    change: '-2.1%',
    trend: 'down',
    description: 'New user registrations down by 2%',
    icon: <Users className="h-5 w-5" />,
  },
};
