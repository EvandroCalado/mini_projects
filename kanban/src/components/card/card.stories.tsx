import { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta: Meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
