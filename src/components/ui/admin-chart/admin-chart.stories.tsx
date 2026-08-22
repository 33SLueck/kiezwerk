import type { Meta, StoryObj } from '@storybook/react';
import { AdminChart } from './admin-chart';

const meta: Meta<typeof AdminChart> = {
  title: 'UI/AdminChart',
  component: AdminChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminChart>;

export const MonthlyRevenue: Story = {
  args: {
    title: 'Monthly Revenue Stream',
    subtitle: 'Revenue metrics over the past 6 months',
    valuePrefix: '$',
    data: [
      { label: 'Jan', value: 12400 },
      { label: 'Feb', value: 18900 },
      { label: 'Mar', value: 24500 },
      { label: 'Apr', value: 21200 },
      { label: 'May', value: 32800 },
      { label: 'Jun', value: 48290 },
    ],
  },
};
