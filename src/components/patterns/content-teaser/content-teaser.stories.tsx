import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ContentTeaser } from './content-teaser';

const meta: Meta<typeof ContentTeaser> = {
  title: 'Patterns/ContentTeaser',
  component: ContentTeaser,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentTeaser>;

export const Default: Story = {
  args: {
    subtitle: 'Resources',
    title: 'From our engineering blog',
    items: [
      {
        title: 'Optimizing LCP for Next.js Applications',
        description:
          'How we achieved sub-second Largest Contentful Paint metric by applying modern images loaders and fetching priority.',
        category: 'Engineering',
        date: 'July 15, 2026',
        imageUrl:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        href: '#blog-lcp',
      },
      {
        title: 'Building Accessible Tab Interfaces',
        description:
          'Deep dive into keyboard navigation, aria-selected states, and focus styling for complex tab list layouts.',
        category: 'Accessibility',
        date: 'June 28, 2026',
        imageUrl:
          'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop',
        href: '#blog-tab-a11y',
      },
      {
        title: 'Color Palettes in Tailwind CSS',
        description:
          'How to customize tailwind config to define consistent design tokens matching brand guidelines.',
        category: 'Design Systems',
        date: 'May 12, 2026',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
        href: '#blog-design-system',
      },
    ],
  },
};
