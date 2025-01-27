export type ColumnSchema = 'todo' | 'doing' | 'done';

export type CardSchema = {
  id: string;
  title: string;
  column: string;
};

export const DEFAULT_CARDS: CardSchema[] = [
  {
    id: '1',
    title: 'Task 1',
    column: 'todo',
  },
  {
    id: '2',
    title: 'Task 2',
    column: 'todo',
  },
  {
    id: '3',
    title: 'Task 3',
    column: 'todo',
  },
  {
    id: '4',
    title: 'Task 4',
    column: 'doing',
  },
  {
    id: '5',
    title: 'Task 5',
    column: 'doing',
  },
  {
    id: '6',
    title: 'Task 6',
    column: 'done',
  },
  {
    id: '7',
    title: 'Task 7',
    column: 'done',
  },
];
