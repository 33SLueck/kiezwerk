import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Icon } from './icon';
import { User, Settings, Mail, Heart, Star, Search } from 'lucide-react';

const iconsMap = {
  User,
  Settings,
  Mail,
  Heart,
  Star,
  Search,
};

const meta: Meta<typeof Icon> = {
  title: 'Typography & Media/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(iconsMap),
      mapping: iconsMap,
      description: 'The Lucide icon component to render',
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 4 },
      description: 'The height and width of the icon in pixels',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 3.5, step: 0.5 },
      description: 'The width of the lines drawing the icon',
    },
    decorative: {
      control: 'boolean',
      description:
        'If true, icon is hidden from screen readers. Otherwise, it uses the title parameter as label.',
    },
    title: {
      control: 'text',
      description: 'A label for screen readers if the icon is not decorative',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: User,
    size: 24,
    strokeWidth: 2,
    decorative: true,
  },
};

export const Sizes: Story = {
  args: {
    ...Default.args,
    icon: Heart,
  },
  render: (args: React.ComponentProps<typeof Icon>) => (
    <div className="flex items-end gap-6 text-red-500">
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} size={16} />
        <span className="text-xs text-muted-foreground">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} size={24} />
        <span className="text-xs text-muted-foreground">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} size={36} />
        <span className="text-xs text-muted-foreground">36px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} size={48} />
        <span className="text-xs text-muted-foreground">48px</span>
      </div>
    </div>
  ),
};

export const StrokeWidths: Story = {
  args: {
    ...Default.args,
    icon: Settings,
    size: 32,
  },
  render: (args: React.ComponentProps<typeof Icon>) => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} strokeWidth={1} />
        <span className="text-xs text-muted-foreground">1.0</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} strokeWidth={1.5} />
        <span className="text-xs text-muted-foreground">1.5</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} strokeWidth={2} />
        <span className="text-xs text-muted-foreground">2.0</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon {...args} strokeWidth={3} />
        <span className="text-xs text-muted-foreground">3.0</span>
      </div>
    </div>
  ),
};

export const Gallery: Story = {
  args: {
    ...Default.args,
    size: 24,
  },
  render: (args: React.ComponentProps<typeof Icon>) => (
    <div className="grid grid-cols-6 gap-6 max-w-sm">
      {Object.entries(iconsMap).map(([name, iconComponent]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-2 border border-border rounded-lg bg-card text-card-foreground"
        >
          <Icon {...args} icon={iconComponent} />
          <span className="text-[10px] text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};
