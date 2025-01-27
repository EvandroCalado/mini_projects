import { Meta, StoryObj } from '@storybook/react';
import { BurnBarrel } from './burn-barrel';

const meta: Meta = {
  title: 'Components/BurnBarrel',
  component: BurnBarrel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BurnBarrel>;

export const Default: Story = {};
