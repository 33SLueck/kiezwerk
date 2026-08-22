import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['section', 'header', 'footer', 'aside', 'main', 'div'],
      description: 'The HTML element to render the section as',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Vertical padding spacing of the section',
    },
    tone: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'The visual tone and background style of the section',
    },
    children: {
      control: false,
      description: 'Content inside the section',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    as: 'section',
    spacing: 'md',
    tone: 'default',
    children: (
      <div className="border border-dashed border-border p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Section Layout Component</h3>
        <p className="text-sm text-muted-foreground">
          This is a default section wrapping content with standard vertical spacing (py-8).
        </p>
      </div>
    ),
  },
};

export const Muted: Story = {
  args: {
    ...Default.args,
    tone: 'muted',
    children: (
      <div className="border border-dashed border-border p-6 rounded-lg text-center bg-card shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Muted Section</h3>
        <p className="text-sm text-muted-foreground">
          This section uses a muted background style to distinguish structural areas.
        </p>
      </div>
    ),
  },
};

export const Spacings: Story = {
  args: {
    ...Default.args,
  },
  render: (args: React.ComponentProps<typeof Section>) => (
    <div className="flex flex-col gap-6">
      <Section {...args} spacing="none" className="bg-red-500/10">
        <div className="p-4 text-center">Spacing: None (0 padding)</div>
      </Section>
      <Section {...args} spacing="sm" className="bg-amber-500/10">
        <div className="p-4 text-center">Spacing: Small (sm - py-4)</div>
      </Section>
      <Section {...args} spacing="md" className="bg-emerald-500/10">
        <div className="p-4 text-center">Spacing: Medium (md - py-8)</div>
      </Section>
      <Section {...args} spacing="lg" className="bg-blue-500/10">
        <div className="p-4 text-center">Spacing: Large (lg - py-12)</div>
      </Section>
    </div>
  ),
};
