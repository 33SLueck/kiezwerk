import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormField } from './form-field';
import { Textarea } from '../textarea';

const meta: Meta<typeof FormField> = {
  title: 'Primitives/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField label="Bio" helperText="Brief description for your profile." required>
      <Textarea placeholder="I am a designer..." />
    </FormField>
  ),
};
