import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article'],
      description: 'The HTML element to render the card as',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'outline'],
      description: 'The visual variant style of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding inside the card',
    },
    children: {
      control: false,
      description: 'The content rendered inside the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    as: 'div',
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Default Card</h3>
        <p className="text-sm text-muted-foreground">
          This is a default card layout using the card background color with subtle borders.
        </p>
      </div>
    ),
  },
};

export const Muted: Story = {
  args: {
    ...Default.args,
    variant: 'muted',
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Muted Card</h3>
        <p className="text-sm text-muted-foreground">
          This variant uses a muted background color to differentiate it from standard content
          cards.
        </p>
      </div>
    ),
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Outline Card</h3>
        <p className="text-sm text-muted-foreground">
          This card has a transparent background and relies only on its border.
        </p>
      </div>
    ),
  },
};

export const Paddings: Story = {
  args: {
    ...Default.args,
  },
  render: (args: React.ComponentProps<typeof Card>) => (
    <div className="flex flex-col gap-6">
      <Card {...args} padding="none" className="border-red-500">
        <div className="bg-red-500/10 p-4">Padding None - Content manages its own padding</div>
      </Card>
      <Card {...args} padding="sm">
        Padding Small (sm)
      </Card>
      <Card {...args} padding="md">
        Padding Medium (md)
      </Card>
      <Card {...args} padding="lg">
        Padding Large (lg)
      </Card>
    </div>
  ),
};
