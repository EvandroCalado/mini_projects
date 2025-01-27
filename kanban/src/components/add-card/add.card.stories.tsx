import { Meta, StoryObj } from '@storybook/react';
import { AddCard } from './add-card';

const meta: Meta = {
  title: 'Components/AddCard',
  component: AddCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddCard>;

export const Default: Story = {};
