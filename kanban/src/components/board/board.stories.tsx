import { Meta, StoryObj } from '@storybook/react';
import { Board } from './board';

const meta: Meta = {
  title: 'Components/Board',
  component: Board,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Board>;

export const Default: Story = {};
