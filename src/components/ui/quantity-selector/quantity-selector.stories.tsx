import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { QuantitySelector } from './quantity-selector';

const meta: Meta<typeof QuantitySelector> = {
  title: 'Primitives/QuantitySelector',
  component: QuantitySelector,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the quantity selector',
    },
    quantity: {
      control: 'number',
      description: 'Current quantity value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the control is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

export const Default: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState(1);
    return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [qSm, setQSm] = React.useState(1);
    const [qMd, setQMd] = React.useState(2);
    const [qLg, setQLg] = React.useState(3);

    return (
      <div className="flex items-center gap-6">
        <QuantitySelector size="sm" quantity={qSm} onQuantityChange={setQSm} />
        <QuantitySelector size="md" quantity={qMd} onQuantityChange={setQMd} />
        <QuantitySelector size="lg" quantity={qLg} onQuantityChange={setQLg} />
      </div>
    );
  },
};
