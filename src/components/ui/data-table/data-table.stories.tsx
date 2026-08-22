import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { DataTable } from './data-table';

const meta: Meta<typeof DataTable> = {
  title: 'UI/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface SampleRow {
  id: string;
  name: string;
  email: string;
  status: string;
  amount: string;
}

const sampleData: SampleRow[] = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    status: 'Completed',
    amount: '$120.00',
  },
  { id: '2', name: 'Bob Jones', email: 'bob@example.com', status: 'Pending', amount: '$49.00' },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    status: 'Shipped',
    amount: '$299.00',
  },
];

export const Primary: Story = {
  args: {
    title: 'Recent Orders',
    description: 'Overview of recently processed client orders',
    data: sampleData,
    columns: [
      { key: 'id', header: 'Order ID' },
      { key: 'name', header: 'Customer' },
      { key: 'email', header: 'Email' },
      {
        key: 'status',
        header: 'Status',
        render: (row) => (
          <Badge variant={row.status === 'Completed' ? 'default' : 'secondary'}>{row.status}</Badge>
        ),
      },
      { key: 'amount', header: 'Total Amount' },
    ],
  },
};
