import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { LogoCloud } from './logo-cloud';

const meta: Meta<typeof LogoCloud> = {
  title: 'Patterns/LogoCloud',
  component: LogoCloud,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoCloud>;

export const Default: Story = {
  args: {
    title: 'Trusted by the world’s most innovative teams',
    logos: [
      {
        name: 'Transistor',
        src: 'https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg',
      },
      {
        name: 'Reform',
        src: 'https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg',
      },
      {
        name: 'Tuple',
        src: 'https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg',
      },
      {
        name: 'SavvyCal',
        src: 'https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg',
      },
      {
        name: 'Statamic',
        src: 'https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg',
      },
    ],
  },
};
