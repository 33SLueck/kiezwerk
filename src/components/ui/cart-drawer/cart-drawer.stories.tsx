import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { CartDrawer } from './cart-drawer';
import { CartProvider } from '@/components/providers/cart-provider';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';

const DemoWrapper = () => {
  const [isOpen, setIsOpen] = React.useState(true);
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

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Cart Drawer</Button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const meta: Meta<typeof CartDrawer> = {
  title: 'Primitives/CartDrawer',
  component: CartDrawer,
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
type Story = StoryObj<typeof CartDrawer>;

export const Default: Story = {
  render: () => <DemoWrapper />,
};
