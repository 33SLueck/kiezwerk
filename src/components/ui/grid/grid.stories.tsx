import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grid } from './grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 'auto'],
      description: 'The number of grid columns',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      description: 'The gap spacing size between grid cells',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignment along the cross axis',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
      description: 'Justification (stretch/align) along the main axis',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'main', 'ul', 'ol', 'article'],
      description: 'The HTML element to render the grid as',
    },
    responsiveColumns: {
      control: 'object',
      description: 'Breakpoint-specific column configurations',
    },
    children: {
      control: false,
      description: 'Grid items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ label, className = '' }: { label: string; className?: string }) => (
  <div
    className={`bg-secondary border border-border text-foreground font-semibold p-6 rounded-lg flex items-center justify-center min-h-[80px] shadow-sm ${className}`}
  >
    {label}
  </div>
);

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    children: (
      <>
        <Cell label="Card 1" />
        <Cell label="Card 2" />
        <Cell label="Card 3" />
        <Cell label="Card 4" />
        <Cell label="Card 5" />
        <Cell label="Card 6" />
      </>
    ),
  },
};

export const AutoColumns: Story = {
  args: {
    columns: 'auto',
    gap: 'md',
    children: (
      <>
        <Cell label="Auto Col 1" />
        <Cell label="Auto Col 2" />
        <Cell label="Auto Col 3" />
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    responsiveColumns: {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
    gap: 'md',
    children: (
      <>
        <Cell label="Responsive 1" />
        <Cell label="Responsive 2" />
        <Cell label="Responsive 3" />
        <Cell label="Responsive 4" />
      </>
    ),
  },
};

export const Gaps: Story = {
  args: {
    columns: 3,
  },
  render: (args: React.ComponentProps<typeof Grid>) => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold mb-2">Gap: None (none)</p>
        <Grid {...args} gap="none">
          <Cell label="1" />
          <Cell label="2" />
          <Cell label="3" />
        </Grid>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Gap: Small (sm)</p>
        <Grid {...args} gap="sm">
          <Cell label="1" />
          <Cell label="2" />
          <Cell label="3" />
        </Grid>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Gap: Large (lg)</p>
        <Grid {...args} gap="lg">
          <Cell label="1" />
          <Cell label="2" />
          <Cell label="3" />
        </Grid>
      </div>
    </div>
  ),
};
