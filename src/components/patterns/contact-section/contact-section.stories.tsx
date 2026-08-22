import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ContactSection } from './contact-section';

const meta: Meta<typeof ContactSection> = {
  title: 'Patterns/ContactSection',
  component: ContactSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Contact form submitted:', data),
  },
};
