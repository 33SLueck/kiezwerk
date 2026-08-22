import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TimelineSection } from './timeline-section';

const meta: Meta<typeof TimelineSection> = {
  title: 'Patterns/TimelineSection',
  component: TimelineSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimelineSection>;

export const Default: Story = {
  args: {
    subtitle: 'Process',
    title: 'How we build and deploy packages',
    steps: [
      {
        date: 'Phase 1',
        title: 'Design & Prototype',
        description:
          'Collaborate on design specs, UI/UX structure, and user journeys using interactive mockups.',
      },
      {
        date: 'Phase 2',
        title: 'Component Engineering',
        description:
          'Write unit tests, structure clean TypeScript code, and configure Storybook stories.',
      },
      {
        date: 'Phase 3',
        title: 'Continuous Integration',
        description:
          'Automated test suite executes on github push to prevent visual and logic regressions.',
      },
      {
        date: 'Phase 4',
        title: 'Global Deployment',
        description:
          'Deploy code packages via NPM and build staging previews for user acceptance testing.',
      },
    ],
  },
};
