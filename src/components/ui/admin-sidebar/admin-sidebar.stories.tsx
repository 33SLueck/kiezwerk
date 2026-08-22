import type { Meta, StoryObj } from '@storybook/react';
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, Settings } from 'lucide-react';
import { AdminSidebar } from './admin-sidebar';

const meta: Meta<typeof AdminSidebar> = {
  title: 'UI/AdminSidebar',
  component: AdminSidebar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminSidebar>;

export const Default: Story = {
  args: {
    brandName: 'Nexus Admin',
    activeHref: '/',
    user: {
      name: 'Admin User',
      email: 'admin@nexus.dev',
    },
    navItems: [
      { label: 'Overview', href: '/', icon: <LayoutDashboard /> },
      { label: 'Products', href: '/products', icon: <Package />, badge: 4 },
      { label: 'Orders', href: '/orders', icon: <ShoppingCart />, badge: 12 },
      { label: 'Inquiries', href: '/messages', icon: <MessageSquare />, badge: 3 },
      { label: 'Settings', href: '/settings', icon: <Settings /> },
    ],
  },
};
