import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FileUpload } from './file-upload';

const meta: Meta<typeof FileUpload> = {
  title: 'Primitives/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    disabled: false,
    onFileSelect: (file) => console.log('Selected file:', file.name),
  },
};
