import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { TrustBar } from './trustBar';
import { Layers, Globe, Cpu, Zap, Cloud, Activity, CheckCircle, Award, Star } from 'lucide-react';

const meta: Meta<typeof TrustBar> = {
  title: 'Patterns/TrustBar',
  component: TrustBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof TrustBar>;

export const Text: Story = {
  args: {
    title: 'Trusted by teams using modern UI systems',
    variant: 'logos',
    items: [
      { label: 'Studio One' },
      { label: 'Northstar' },
      { label: 'Orbital' },
      { label: 'Bright Labs' },
      { label: 'Acme Collective' },
    ],
  },
};

export const Logos: Story = {
  args: {
    title: 'Trusted by teams using modern UI systems',
    variant: 'logos',
    items: [
      { label: 'Studio One', icon: <Layers className="h-5 w-5 text-muted-foreground/70" /> },
      { label: 'Northstar', icon: <Globe className="h-5 w-5 text-muted-foreground/70" /> },
      { label: 'Orbital', icon: <Cpu className="h-5 w-5 text-muted-foreground/70" /> },
      { label: 'Bright Labs', icon: <Zap className="h-5 w-5 text-muted-foreground/70" /> },
      { label: 'Acme Collective', icon: <Cloud className="h-5 w-5 text-muted-foreground/70" /> },
    ],
  },
};

export const IconsOnly: Story = {
  args: {
    title: 'Trusted by teams using modern UI systems',
    variant: 'logos',
    items: [
      {
        label: '',
        icon: (
          <Layers className="h-6 w-6 text-muted-foreground/70 hover:text-foreground transition-colors" />
        ),
      },
      {
        label: '',
        icon: (
          <Globe className="h-6 w-6 text-muted-foreground/70 hover:text-foreground transition-colors" />
        ),
      },
      {
        label: '',
        icon: (
          <Cpu className="h-6 w-6 text-muted-foreground/70 hover:text-foreground transition-colors" />
        ),
      },
      {
        label: '',
        icon: (
          <Zap className="h-6 w-6 text-muted-foreground/70 hover:text-foreground transition-colors" />
        ),
      },
      {
        label: '',
        icon: (
          <Cloud className="h-6 w-6 text-muted-foreground/70 hover:text-foreground transition-colors" />
        ),
      },
    ],
  },
};

export const Stats: Story = {
  args: {
    title: 'Proof that matters',
    variant: 'stats',
    items: [
      { label: '50+ projects shipped', icon: <CheckCircle className="h-5 w-5 text-emerald-500" /> },
      { label: '16 core primitives', icon: <Award className="h-5 w-5 text-blue-500" /> },
      { label: '100% co-located stories', icon: <Activity className="h-5 w-5 text-amber-500" /> },
      { label: 'Storybook-first workflow', icon: <Star className="h-5 w-5 text-purple-500" /> },
    ],
  },
};
