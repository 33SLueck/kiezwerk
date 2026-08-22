import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { OtpInput } from './otp-input';

const meta: Meta<typeof OtpInput> = {
  title: 'Primitives/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div className="flex flex-col gap-4 items-center">
        <OtpInput length={6} value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Entered Code: {value}</p>
      </div>
    );
  },
};
