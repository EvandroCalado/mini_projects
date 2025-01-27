import { Meta, StoryObj } from '@storybook/react';
import { DropIndicator } from './drop-indicator';

const meta: Meta = {
  title: 'Components/DropIndicator',
  component: DropIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropIndicator>;

export const Default: Story = {};
