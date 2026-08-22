import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TeamSection } from './team-section';

const meta: Meta<typeof TeamSection> = {
  title: 'Patterns/TeamSection',
  component: TeamSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamSection>;

export const Default: Story = {
  args: {
    subtitle: 'Our Team',
    title: 'Meet the engineers and designers behind the project',
    members: [
      {
        name: 'Mara Klein',
        role: 'Founder & CEO',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
        fallbackInitials: 'MK',
        bio: 'Mara has over 12 years of experience leading product design at startups and Fortune 500 companies.',
      },
      {
        name: 'Jonas Weber',
        role: 'Engineering Director',
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
        fallbackInitials: 'JW',
        bio: 'Jonas oversees component development, browser automation scripts, and continuous integration workflows.',
      },
      {
        name: 'Lea Brandt',
        role: 'Design System Architect',
        imageUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop',
        fallbackInitials: 'LB',
        bio: 'Lea specializes in accessible web design patterns, visual design tokens, and Storybook structure.',
      },
    ],
  },
};
