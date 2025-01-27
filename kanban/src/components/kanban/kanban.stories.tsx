import { Meta, StoryObj } from '@storybook/react';
import { Kanban } from './kanban';

const meta: Meta = {
  title: 'Components/Kanban',
  component: Kanban,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Kanban>;

export const Default: Story = {};
