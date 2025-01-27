import { Meta, StoryObj } from '@storybook/react';
import { AddBoard } from './add-board';

const meta: Meta = {
  title: 'Components/AddBoard',
  component: AddBoard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddBoard>;

export const Default: Story = {};
