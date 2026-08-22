import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { GallerySection } from './gallery-section';

const meta: Meta<typeof GallerySection> = {
  title: 'Patterns/GallerySection',
  component: GallerySection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GallerySection>;

export const Default: Story = {
  args: {
    subtitle: 'Gallery',
    title: 'Explore our latest workspaces & events',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop',
        alt: 'Office main lobby',
        caption: 'Collab space lobby',
        aspectRatio: 'square',
      },
      {
        src: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=400&fit=crop',
        alt: 'Team brainstorming session',
        caption: 'Brainstorming rooms',
        aspectRatio: 'video',
      },
      {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop',
        alt: 'Developer coding station',
        caption: 'Focused desk setup',
        aspectRatio: 'portrait',
      },
      {
        src: 'https://images.unsplash.com/photo-1542744173-8e0ee26d222f?w=600&h=600&fit=crop',
        alt: 'Conference room meeting',
        caption: 'Board rooms',
        aspectRatio: 'square',
      },
      {
        src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
        alt: 'Server rack installations',
        caption: 'Our cloud servers',
        aspectRatio: 'video',
      },
      {
        src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop',
        alt: 'High rise corporate office',
        caption: 'Corporate HQ',
        aspectRatio: 'portrait',
      },
    ],
  },
};
