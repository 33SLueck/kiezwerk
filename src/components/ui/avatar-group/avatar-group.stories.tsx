import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { AvatarGroup } from './avatar-group';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Primitives/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop"
          alt="Mara Klein"
        />
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
          alt="Lea Brandt"
        />
        <AvatarFallback>LB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};
