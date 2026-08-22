import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { CheckoutSection } from './checkout-section';
import { CartProvider } from '@/components/providers/cart-provider';
import { useCart } from '@/hooks/use-cart';

const DemoWrapper = () => {
  const { addItem } = useCart();

  React.useEffect(() => {
    addItem(
      {
        id: 'p1',
        name: 'Next.js E-Commerce SaaS Template',
        slug: 'nextjs-template',
        description: 'Template description',
        price: 49,
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        category: 'Templates',
        inStock: true,
      },
      1
    );
  }, [addItem]);

  return <CheckoutSection onSubmit={(data) => alert(JSON.stringify(data, null, 2))} />;
};

const meta: Meta<typeof CheckoutSection> = {
  title: 'Patterns/CheckoutSection',
  component: CheckoutSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CartProvider>
        <Story />
      </CartProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CheckoutSection>;

export const Default: Story = {
  render: () => <DemoWrapper />,
};
