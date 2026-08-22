import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Link } from './link';
import { ExternalLink } from 'lucide-react';

const meta: Meta<typeof Link> = {
  title: 'Typography & Media/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'The color variant of the link',
    },
    external: {
      control: 'boolean',
      description: 'If true, opens in a new tab with secure target/rel attributes',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to merge props into the child element instead of rendering an anchor',
    },
    href: {
      control: 'text',
      description: 'The URL or path the link points to',
    },
    children: {
      control: 'text',
      description: 'The label or components inside the link',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: 'https://storybook.js.org',
    variant: 'default',
    external: false,
    children: 'Visit Storybook Documentation',
  },
};

export const Muted: Story = {
  args: {
    ...Default.args,
    variant: 'muted',
    children: 'Back to previous page',
  },
};

export const External: Story = {
  args: {
    ...Default.args,
    href: 'https://github.com',
    external: true,
    children: (
      <>
        GitHub Repository <ExternalLink className="h-3.5 w-3.5" />
      </>
    ),
  },
};
